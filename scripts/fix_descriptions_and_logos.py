#!/usr/bin/env python3
"""Continuously fix placeholder descriptions and logos in Supabase company records."""

from __future__ import annotations

import logging
import os
import time
from typing import Dict, List, Optional

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise EnvironmentError("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.")

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal",
}

DEFAULT_DESCRIPTION_TEMPLATE = "{name} is a SaaS or AI company offering innovative technology solutions."
DEFAULT_LOGO = "https://saaspertise.com/default-logo.png"
FAVICON_FALLBACK = "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&url={website}&size=128"
FETCH_LIMIT = 1000
BATCH_SLEEP_SECONDS = 5
MAX_RETRIES = 3

SESSION = requests.Session()

PLACEHOLDER_FILTER = (
    "&or=("
    "description.ilike.%25YC%20OSS%20JSON%25,"
    "description.ilike.%25startup%25YC%25,"
    "description.ilike.%25entry%25YC%25,"
    "logo_url.ilike.%25ycombinator.com%25,"
    "logo_url.ilike.%25default-logo%25"
    ")"
)


def fetch_metadata(website: str) -> Dict[str, str]:
    metadata: Dict[str, str] = {}
    try:
        response = SESSION.get(website, timeout=8, headers={"User-Agent": "Mozilla/5.0"})
        response.raise_for_status()
    except Exception:
        return metadata

    soup = BeautifulSoup(response.text, "html.parser")
    title_tag = soup.find("meta", attrs={"property": "og:title"}) or soup.find("title")
    desc_tag = soup.find("meta", attrs={"name": "description"}) or soup.find("meta", attrs={"property": "og:description"})

    if title_tag:
        metadata["title"] = (title_tag.get("content") or title_tag.text or "").strip()
    if desc_tag:
        metadata["description"] = (desc_tag.get("content") or "").strip()

    return metadata


def fetch_domain_and_logo(name: str, website: str) -> Dict[str, str]:
    domain = None
    logo_url = None

    try:
        auto_url = f"https://autocomplete.clearbit.com/v1/companies/suggest?query={name}"
        response = SESSION.get(auto_url, timeout=6)
        response.raise_for_status()
        data = response.json()
        if data and isinstance(data, list):
            domain = data[0].get("domain")
    except Exception:
        pass

    if domain:
        candidate = f"https://logo.clearbit.com/{domain}"
        try:
            head = SESSION.head(candidate, timeout=5)
            if head.status_code == 200 and "image" in head.headers.get("Content-Type", ""):
                logo_url = candidate
        except Exception:
            pass

    if not logo_url:
        logo_url = FAVICON_FALLBACK.format(website=website) if website else DEFAULT_LOGO

    return {"domain": domain, "logo": logo_url}


def choose_description(name: str, website: str) -> str:
    metadata = fetch_metadata(website)
    description = metadata.get("description")

    if description and len(description) > 10:
        return description

    title = metadata.get("title")
    if title and len(title) > 10:
        return f"{name} — {title}"

    return DEFAULT_DESCRIPTION_TEMPLATE.format(name=name)


def fetch_target_companies(limit: int = FETCH_LIMIT) -> List[Dict[str, str]]:
    query = (
        f"{SUPABASE_URL}/rest/v1/companies"
        "?select=id,name,website,description,logo_url"
        f"{PLACEHOLDER_FILTER}"
        f"&limit={limit}"
    )

    try:
        response = SESSION.get(query, headers=HEADERS, timeout=30)
        response.raise_for_status()
        data = response.json()
        if data:
            logging.info("✅ Supabase returned %d target rows", len(data))
            return data
        logging.info("Supabase returned 0 rows for placeholder query.")
        return []
    except Exception as exc:
        logging.warning("Supabase placeholder query failed (%s).", exc)

    fallback = f"{SUPABASE_URL}/rest/v1/companies?select=id,name,website,description,logo_url&limit=10000"
    response = SESSION.get(fallback, headers=HEADERS, timeout=60)
    response.raise_for_status()
    all_data = response.json()
    filtered = [
        c
        for c in all_data
        if ("YC" in (c.get("description") or ""))
        or ("ycombinator.com" in (c.get("logo_url") or ""))
        or ("default-logo" in (c.get("logo_url") or ""))
    ]
    logging.info("Fallback filtered %d target rows from %d total", len(filtered), len(all_data))
    return filtered


def enrich_company(company: Dict[str, str]) -> Optional[Dict[str, str]]:
    company_id = company.get("id")
    name = company.get("name")
    website = company.get("website") or ""
    description = company.get("description") or ""
    logo_url = company.get("logo_url") or ""

    if not company_id or not name or not website.startswith("http"):
        return None

    needs_description = any(token in description for token in ["YC OSS JSON", "startup", "YC directory"])
    needs_logo = any(token in logo_url for token in ["ycombinator.com", "default-logo"])

    if not needs_description and not needs_logo:
        return None

    updates: Dict[str, str] = {"id": company_id}

    if needs_description:
        updates["description"] = choose_description(name, website)

    if needs_logo:
        info = fetch_domain_and_logo(name, website)
        updates["logo_url"] = info["logo"]

    if len(updates) == 1:  # no changes added
        return None

    return updates


def patch_batch(records: List[Dict[str, str]], batch_index: int, total_batches: int, total_fixed: int) -> int:
    if not records:
        return total_fixed

    ids = [str(item.get("id")) for item in records if item.get("id")]
    if not ids:
        logging.warning("No valid IDs in batch %d, skipping...", batch_index)
        return total_fixed

    payload = [
        {
            "description": item.get("description"),
            "logo_url": item.get("logo_url"),
        }
        for item in records
    ]

    query = f"{SUPABASE_URL}/rest/v1/companies?id=in.({','.join(ids)})"

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = requests.patch(query, headers=HEADERS, json=payload, timeout=30)
            if response.status_code in (200, 204):
                logging.info(
                    "Batch %d/%d → Updated %d rows (total fixed: %d)",
                    batch_index,
                    total_batches,
                    len(records),
                    total_fixed + len(records),
                )
                return total_fixed + len(records)
            logging.warning(
                "Patch attempt %d failed (%s %s)",
                attempt,
                response.status_code,
                response.text,
            )
        except Exception as exc:
            logging.warning("Patch attempt %d failed: %s", attempt, exc)

        if attempt < MAX_RETRIES:
            time.sleep(3 * attempt)

    logging.error("Patch failed after %d attempts for batch %d/%d", MAX_RETRIES, batch_index, total_batches)
    return total_fixed


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
    logging.info("🚀 fix_descriptions_and_logos.py started...")

    total_fixed = 0
    cycle = 0

    while True:
        companies = fetch_target_companies(FETCH_LIMIT)
        if not companies:
            logging.info("✅ All placeholder rows fixed and enriched.")
            break

        updates: List[Dict[str, str]] = []
        for company in companies:
            enriched = enrich_company(company)
            if enriched:
                updates.append(enriched)

        if not updates:
            logging.info("No enrichable records in this batch; waiting before retry…")
            time.sleep(BATCH_SLEEP_SECONDS)
            continue

        batches = [updates[i : i + 100] for i in range(0, len(updates), 100)]
        for idx, batch in enumerate(batches, start=1):
            total_fixed = patch_batch(batch, idx, len(batches), total_fixed)
            time.sleep(1)

        cycle += 1
        logging.info(
            "Cycle %d complete → %d records enriched this cycle (total fixed: %d)",
            cycle,
            len(updates),
            total_fixed,
        )
        time.sleep(BATCH_SLEEP_SECONDS)


if __name__ == "__main__":
    main()
