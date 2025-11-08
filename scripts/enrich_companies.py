#!/usr/bin/env python3
#!/usr/bin/env python3
"""
enrich_companies.py

Usage:
    python3 scripts/enrich_companies.py

Purpose:
    Read data/companies_raw.csv, append SEO-friendly metadata columns,
    and write data/companies_enriched.csv. If OPENAI_API_KEY is set, the script
    will batch-enrich rows with GPT for higher-quality copy; otherwise it applies
    heuristic fallbacks and logs that AI was skipped.

Comments:
    - To run manually inside Cursor without AI, ensure OPENAI_API_KEY is unset and
      invoke `python3 scripts/enrich_companies.py`.
    - Extend for other LLM providers (Anthropic, Mistral, Gemini) by adding new
      client adapters in `generate_ai_batch`.
    - Do not check secrets into source control; rely on .env entries loaded via python-dotenv.
"""

from __future__ import annotations

import json
import logging
import os
import re
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, Iterable, List, Tuple

import pandas as pd
from dotenv import load_dotenv

# Optional import: only used when OPENAI_API_KEY is present.
try:
    from openai import OpenAI
except ImportError:  # pragma: no cover - dependency optional
    OpenAI = None  # type: ignore

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "data"
RAW_INPUT_PATH = DATA_DIR / "companies_raw.csv"
ENRICHED_OUTPUT_PATH = DATA_DIR / "companies_enriched.csv"

MAX_SHORT_DESC = 120
META_TITLE_RANGE = (55, 65)
META_DESC_RANGE = (130, 160)
AI_BATCH_SIZE = 15  # between 10 and 20 as requested
AI_MAX_RETRIES = 3
AI_BACKOFF_SECONDS = 5

SYSTEM_PROMPT = (
    "You are an SEO data assistant generating concise metadata for SaaS and AI companies. "
    "Respect supplied name, category, and description. Return valid JSON for each company."
)

# -----------------------------------------------------------------------------
# Data structures
# -----------------------------------------------------------------------------

@dataclass
class Enrichment:
    slug: str
    short_description: str
    meta_title: str
    meta_description: str
    tags: str


# -----------------------------------------------------------------------------
# Utilities
# -----------------------------------------------------------------------------

def load_environment() -> None:
    """Load environment variables from .env if available."""
    env_path = ROOT_DIR / ".env"
    if env_path.exists():
        load_dotenv(env_path)
    else:
        load_dotenv()


def slugify(value: str) -> str:
    """Generate a lowercase hyphenated slug from a company name."""
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower())
    value = re.sub(r"-{2,}", "-", value)
    return value.strip("-")


def truncate(text: str, limit: int) -> str:
    """Truncate text without breaking words awkwardly."""
    text = text.strip()
    if len(text) <= limit:
        return text
    truncated = text[: limit + 1].rsplit(" ", 1)[0]
    return truncated.strip()


def clamp_length(text: str, min_len: int, max_len: int) -> str:
    """Ensure meta title sits within target range."""
    text = text.strip()
    if len(text) < min_len:
        return text
    if len(text) > max_len:
        return truncate(text, max_len)
    return text


def heuristic_tags(name: str, category: str, description: str) -> str:
    """Generate simple keyword tags when AI is unavailable."""
    base_words = set()
    for source in (category, description):
        for keyword in ["saas", "ai", "automation", "marketing", "analytics", "productivity", "data", "consulting", "platform"]:
            if keyword in (source or "").lower():
                base_words.add(keyword)
    if category:
        base_words.add(category.strip().lower())
    name_token = name.split(" ")[0].lower() if name else ""
    if name_token:
        base_words.add(name_token)
    tags = sorted(list(base_words))[:6]
    return ", ".join(tags)


def base_enrichment(row: Dict[str, Any]) -> Enrichment:
    """Produce deterministic enrichment values used for fallback or AI defaults."""
    name = str(row.get("name", "")).strip()
    category = str(row.get("category", "")).strip()
    description = str(row.get("description", "") or "").strip()

    slug = slugify(name) if name else ""
    short_description = truncate(description or f"{name} {category}".strip(), MAX_SHORT_DESC)

    meta_title_raw = f"{name} – {category}" if name and category else name or category or "Company"
    meta_title = clamp_length(meta_title_raw, META_TITLE_RANGE[0], META_TITLE_RANGE[1])

    meta_desc_source = description or short_description or meta_title
    meta_description = truncate(meta_desc_source, META_DESC_RANGE[1])
    if len(meta_description) < META_DESC_RANGE[0]:
        meta_description = meta_description.ljust(META_DESC_RANGE[0], ".")

    tags = heuristic_tags(name, category, description)

    return Enrichment(
        slug=slug,
        short_description=short_description,
        meta_title=meta_title,
        meta_description=meta_description,
        tags=tags,
    )


# -----------------------------------------------------------------------------
# AI enrichment
# -----------------------------------------------------------------------------

def chunk_records(records: List[Dict[str, Any]], size: int) -> Iterable[List[Dict[str, Any]]]:
    for i in range(0, len(records), size):
        yield records[i : i + size]


def build_ai_prompt(batch: List[Dict[str, Any]]) -> str:
    """Create a JSON-instruction prompt for the batch."""
    payload = [
        {
            "name": item.get("name", ""),
            "category": item.get("category", ""),
            "description": item.get("description", ""),
        }
        for item in batch
    ]
    return json.dumps(payload, ensure_ascii=False)


def parse_ai_response(response_text: str) -> List[Dict[str, str]]:
    """Parse JSON output from the AI assistant."""
    try:
        data = json.loads(response_text)
        if isinstance(data, list):
            return data
        logging.warning("AI response was not a list; received: %s", type(data))
        return []
    except json.JSONDecodeError as exc:
        logging.warning("Failed to parse AI JSON response: %s", exc)
        return []


def generate_ai_batch(client: OpenAI, batch: List[Dict[str, Any]]) -> List[Dict[str, str]]:
    """Call OpenAI for a batch of rows and return metadata objects."""
    if client is None:
        return []

    prompt = build_ai_prompt(batch)
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": (
                "Return a JSON array where each element contains "
                "slug, short_description, meta_title, meta_description, tags for the corresponding company. "
                "Ensure slugs are lowercase-hyphenated. Respect char limits: short_description ≤120, "
                "meta_title 55–65 chars, meta_description 130–160 chars, tags = 4–6 lowercase words separated by commas. "
                "Do not include Markdown or explanations."
            ),
        },
        {"role": "user", "content": f"Companies JSON:\n{prompt}"},
    ]

    for attempt in range(1, AI_MAX_RETRIES + 1):
        try:
            response = client.chat.completions.create(
                model="gpt-4-turbo",
                messages=messages,
                max_tokens=1200,
                temperature=0.3,
            )
            text_output = response.choices[0].message.content or ""
            return parse_ai_response(text_output)
        except Exception as exc:  # noqa: BLE001
            wait_time = AI_BACKOFF_SECONDS * attempt
            logging.warning(
                "AI batch request failed (attempt %s/%s): %s. Retrying in %ss.",
                attempt,
                AI_MAX_RETRIES,
                exc,
                wait_time,
            )
            time.sleep(wait_time)

    logging.error("AI batch request failed after %s attempts.", AI_MAX_RETRIES)
    return []


def enrich_dataframe_with_ai(df: pd.DataFrame, client: OpenAI) -> Tuple[pd.DataFrame, int]:
    """Apply AI enrichment across the DataFrame, returning updated DF and AI hit count."""
    enriched_rows: List[Dict[str, Any]] = []
    ai_rows_enriched = 0

    records = df.to_dict(orient="records")
    for batch in chunk_records(records, AI_BATCH_SIZE):
        base_batch = [base_enrichment(row) for row in batch]
        ai_results = generate_ai_batch(client, batch) if client else []

        if ai_results and len(ai_results) == len(batch):
            ai_rows_enriched += len(batch)
        else:
            ai_results = [{}] * len(batch)  # fallback per row

        for row, base_meta, ai_meta in zip(batch, base_batch, ai_results):
            merged = Enrichment(
                slug=ai_meta.get("slug") or base_meta.slug,
                short_description=ai_meta.get("short_description") or base_meta.short_description,
                meta_title=ai_meta.get("meta_title") or base_meta.meta_title,
                meta_description=ai_meta.get("meta_description") or base_meta.meta_description,
                tags=ai_meta.get("tags") or base_meta.tags,
            )
            enriched_rows.append({**row, **merged.__dict__})

    return pd.DataFrame(enriched_rows), ai_rows_enriched


# -----------------------------------------------------------------------------
# Main workflow
# -----------------------------------------------------------------------------

def main() -> None:
    start_time = time.time()
    logging.info("Starting enrichment workflow.")
    load_environment()

    if not RAW_INPUT_PATH.exists():
        raise FileNotFoundError(f"Missing input CSV at {RAW_INPUT_PATH}. Run fetch_companies.py first.")

    df = pd.read_csv(RAW_INPUT_PATH)
    if df.empty:
        logging.warning("Input CSV is empty; copying to enriched output without changes.")
        df.to_csv(ENRICHED_OUTPUT_PATH, index=False)
        logging.info("✅ Enriched 0 companies → %s", ENRICHED_OUTPUT_PATH)
        return

    df = df.where(pd.notnull(df), None)

    openai_key = os.getenv("OPENAI_API_KEY")
    client: OpenAI | None = None
    if openai_key and OpenAI:
        try:
            client = OpenAI(api_key=openai_key)
            logging.info("OpenAI client initialised; AI enrichment enabled.")
        except Exception as exc:  # noqa: BLE001
            logging.warning("Failed to init OpenAI client (%s). Proceeding without AI.", exc)
            client = None
    else:
        logging.info("AI enrichment skipped (no key found or openai package missing).")

    if client:
        enriched_df, ai_count = enrich_dataframe_with_ai(df, client)
    else:
        enriched_df = pd.DataFrame(
            [{**row, **base_enrichment(row).__dict__} for row in df.to_dict(orient="records")]
        )
        ai_count = 0

    enriched_df.to_csv(ENRICHED_OUTPUT_PATH, index=False)

    elapsed = time.time() - start_time
    logging.info("Processed %s records in %.2fs (AI-enriched: %s).", len(enriched_df), elapsed, ai_count)
    logging.info("✅ Enriched %s companies → %s", len(enriched_df), ENRICHED_OUTPUT_PATH)


if __name__ == "__main__":
    main()

