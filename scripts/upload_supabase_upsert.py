#!/usr/bin/env python3
"""Safe upsert uploader for company data into Supabase."""

from __future__ import annotations

import logging
import os
import sys
import time
from pathlib import Path
from typing import Dict, List

import pandas as pd
import requests
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

BATCH_SIZE = 500
CSV_PATH = Path(os.getenv("COMPANY_CSV_PATH", "data/companies_enriched.csv"))
REQUIRED_COLUMNS = ["name", "website", "category", "description", "logo_url", "slug"]


def load_environment() -> Dict[str, str]:
    load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")
    supabase_url = os.getenv("SUPABASE_URL")
    service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_key:
        raise EnvironmentError("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing from environment")
    return {"url": supabase_url.rstrip('/'), "key": service_key}


def get_clearbit_logo(website: str | None) -> str | None:
    """Generate Clearbit logo URL from website domain."""
    if not website:
        return None
    try:
        from urllib.parse import urlparse
        parsed = urlparse(website)
        domain = parsed.netloc or parsed.path.split('/')[0]
        if domain:
            return f"https://logo.clearbit.com/{domain}"
    except Exception:
        pass
    return None


def read_csv(csv_path: Path) -> pd.DataFrame:
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV file not found: {csv_path}")
    df = pd.read_csv(csv_path)
    missing = [column for column in REQUIRED_COLUMNS if column not in df.columns]
    if missing:
        raise ValueError(f"CSV missing required columns: {', '.join(missing)}")
    df = df.where(pd.notnull(df), None)
    
    # Add Clearbit logo fallback for rows without logo_url
    for idx, row in df.iterrows():
        if not row.get("logo_url") and row.get("website"):
            clearbit_logo = get_clearbit_logo(row["website"])
            if clearbit_logo:
                df.at[idx, "logo_url"] = clearbit_logo
    
    return df


def chunk(records: List[Dict[str, str]], size: int) -> List[List[Dict[str, str]]]:
    return [records[i : i + size] for i in range(0, len(records), size)]


def upload_batch(env: Dict[str, str], batch: List[Dict[str, str]], index: int, total: int) -> None:
    url = f"{env['url']}/rest/v1/companies?on_conflict=website"
    headers = {
        "apikey": env["key"],
        "Authorization": f"Bearer {env['key']}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
    }

    for attempt in range(1, 4):
        try:
            response = requests.post(url, headers=headers, json=batch, timeout=40)
            if response.status_code in (200, 201, 204):
                logging.info("Batch %d/%d uploaded (%d records)", index, total, len(batch))
                return
            logging.warning("Batch %d returned %s %s", index, response.status_code, response.text)
        except requests.RequestException as exc:
            logging.warning("Batch %d upload error: %s", index, exc)

        if attempt < 3:
            wait_seconds = attempt * 2
            logging.info("Retrying batch %d in %ds", index, wait_seconds)
            time.sleep(wait_seconds)
        else:
            raise RuntimeError(f"Failed to upload batch {index} after 3 attempts")


def main() -> None:
    node_env = os.getenv("NODE_ENV", "development")
    if node_env != "production":
        env = load_environment()
        df = read_csv(CSV_PATH)
        records = df[REQUIRED_COLUMNS].to_dict(orient="records")

        if not records:
            logging.info("No records to upload. Exiting.")
            return

        batches = chunk(records, BATCH_SIZE)
        logging.info(
            "Uploading %d records to Supabase in %d batches (size=%d).",
            len(records),
            len(batches),
            BATCH_SIZE,
        )

        for idx, batch in enumerate(batches, start=1):
            upload_batch(env, batch, idx, len(batches))
            time.sleep(1)

        logging.info("✅ Upload complete (%d records processed)", len(records))
    else:
        logging.warning("⚠️ Import disabled — pipeline is paused. Enable only in development mode.")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:  # noqa: BLE001
        logging.error("Upload failed: %s", exc)
        sys.exit(1)
