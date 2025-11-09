#!/usr/bin/env python3
"""Clean YC placeholder entries in the local CSV dataset."""

import os
import re

import pandas as pd
import requests
import tldextract

CSV_PATH = "data/companies_raw.csv"
OUTPUT_PATH = "data/companies_enriched.csv"
DEFAULT_LOGO = "https://saaspertise.com/default-logo.png"


def guess_domain_from_name(name: str) -> str:
    """Guess website domain from company name."""
    if not name:
        return ""
    cleaned = re.sub(r"[^a-zA-Z0-9]", "", name).lower()
    return f"https://{cleaned}.com"


def get_logo(domain: str) -> str:
    """Try Clearbit for logo."""
    try:
        parsed = tldextract.extract(domain)
        dom = f"{parsed.domain}.{parsed.suffix}" if parsed.domain else ""
        if dom:
            logo_url = f"https://logo.clearbit.com/{dom}"
            response = requests.head(logo_url, timeout=5)
            if response.status_code == 200:
                return logo_url
    except Exception:
        pass
    return DEFAULT_LOGO


def clean_yc_rows(df: pd.DataFrame) -> pd.DataFrame:
    yc_pattern = r"https://www\.ycombinator\.com/companies/"
    fixed_rows = 0

    for i, row in df.iterrows():
        url = row.get("website", "")
        name = row.get("name", "")

        if isinstance(url, str) and re.match(yc_pattern, url):
            slug = url.rstrip('/').split('/')[-1]
            new_url = f"https://{slug}.com" if slug else guess_domain_from_name(name)
            df.at[i, "website"] = new_url
            df.at[i, "description"] = f"{name} is a startup listed in the YC directory."
            df.at[i, "logo_url"] = get_logo(new_url)
            fixed_rows += 1

    print(f"🧹 Cleaned {fixed_rows} YC OSS entries.")
    return df


def main() -> None:
    if not os.path.exists(CSV_PATH):
        print("❌ CSV not found.")
        return

    df = pd.read_csv(CSV_PATH)
    df = clean_yc_rows(df)
    df.to_csv(OUTPUT_PATH, index=False)
    print(f"✅ Enriched CSV saved → {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
