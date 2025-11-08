#!/usr/bin/env python3
#!/usr/bin/env python3
"""
upload_supabase.py

Command:
    python3 scripts/upload_supabase.py

Purpose:
    Load company records from data/companies_enriched.csv (or data/companies_raw.csv)
    and upsert them into the Supabase `companies` table using the official supabase-py client.

Configuration (.env):
    SUPABASE_URL=https://your-project-ref.supabase.co
    SUPABASE_SERVICE_KEY=service_role_token
    # Optional fallback (if SERVICE_KEY is not set):
    SUPABASE_SERVICE_ROLE_KEY=service_role_token

Verification (after running):
    1. Log into Supabase dashboard.
    2. Choose your project → Table Editor → public.companies.
    3. Confirm new/updated rows, inspect columns such as name, website, logo_url.

Extending the script later:
    - Add more enrichment columns (e.g. slug, meta_title) simply by including them
      in the CSV; they will be upserted automatically.
    - For automation, wrap this script in a cron job or GitHub Actions workflow.
    - To handle large datasets, consider pagination or rate limiting on the Supabase side.
"""

from __future__ import annotations

import logging
import os
from pathlib import Path
from typing import Iterable, List

import pandas as pd
from dotenv import load_dotenv
from supabase import Client, create_client

# -----------------------------------------------------------------------------
# Logging / paths
# -----------------------------------------------------------------------------

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "data"
ENRICHED_PATH = DATA_DIR / "companies_enriched.csv"
RAW_PATH = DATA_DIR / "companies_raw.csv"

BATCH_SIZE = 100

# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------

def load_environment() -> Client:
    """Load environment variables and return an authenticated Supabase client."""
    env_path = ROOT_DIR / ".env"
    if env_path.exists():
        load_dotenv(env_path)
    else:
        load_dotenv()  # fallback to current working directory / shell vars

    supabase_url = os.getenv("SUPABASE_URL")
    service_key = os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url or not service_key:
        raise EnvironmentError(
            "Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_KEY (or SUPABASE_SERVICE_ROLE_KEY) in .env."
        )

    logging.info("Supabase URL detected: %s", supabase_url)
    return create_client(supabase_url, service_key)


def choose_input_file() -> Path:
    """Select the best CSV file available for upload."""
    if ENRICHED_PATH.exists():
        logging.info("Using enriched dataset: %s", ENRICHED_PATH)
        return ENRICHED_PATH
    if RAW_PATH.exists():
        logging.info("Enriched dataset missing; falling back to raw data: %s", RAW_PATH)
        return RAW_PATH
    raise FileNotFoundError(
        f"Could not find {ENRICHED_PATH} or {RAW_PATH}. Run fetch/enrich scripts first."
    )


def dataframe_to_batches(df: pd.DataFrame, batch_size: int) -> Iterable[pd.DataFrame]:
    """Yield the DataFrame in chunked batches."""
    total_rows = len(df)
    for start in range(0, total_rows, batch_size):
        yield df.iloc[start : start + batch_size]


def upsert_batch(client: Client, batch_rows: List[dict]) -> None:
    """Upsert a batch of rows into Supabase, handling any API errors."""
    try:
        client.table("companies").upsert(batch_rows, on_conflict="website").execute()
    except Exception as exc:  # noqa: BLE001
        logging.warning("Batch upsert failed (%s records): %s", len(batch_rows), exc)


# -----------------------------------------------------------------------------
# Main workflow
# -----------------------------------------------------------------------------

def main() -> None:
    logging.info("Starting Supabase upload workflow.")
    client = load_environment()
    csv_path = choose_input_file()

    df = pd.read_csv(csv_path)
    if df.empty:
        logging.warning("CSV %s is empty; nothing to upload.", csv_path)
        return

    # Replace NaN with None for safe JSON serialization.
    df = df.where(pd.notnull(df), None)

    # Deduplicate by website within the CSV before upload and track duplicates skipped.
    initial_count = len(df)
    df = df.drop_duplicates(subset=["website"], keep="first")
    deduped_count = len(df)
    skipped_duplicates = initial_count - deduped_count

    logging.info("Uploading %s unique companies (skipped %s duplicates in CSV).", deduped_count, skipped_duplicates)

    uploaded_records = 0
    for index, batch_df in enumerate(dataframe_to_batches(df, BATCH_SIZE), start=1):
        batch_records = batch_df.to_dict(orient="records")
        if not batch_records:
            continue

        upsert_batch(client, batch_records)
        uploaded_records += len(batch_records)
        logging.info("Uploaded batch %s (%s records).", index, len(batch_records))

    logging.info(
        "✅ Uploaded %s companies to Supabase (%s skipped as duplicates)",
        uploaded_records,
        skipped_duplicates,
    )


if __name__ == "__main__":
    main()

