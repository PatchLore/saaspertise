#!/usr/bin/env python3
"""Validate company dataset for required fields and placeholders."""

from __future__ import annotations

import logging
import os
from pathlib import Path

import pandas as pd  # type: ignore[reportMissingImports]

CSV_PATH = Path("data/companies_raw.csv")


def validate(df: pd.DataFrame) -> pd.DataFrame:
    failures = []

    for idx, row in df.iterrows():
        issues = []
        name = row.get("name")
        website = (row.get("website") or "").strip()
        logo_url = (row.get("logo_url") or "").strip()
        slug = (row.get("slug") or "").strip()

        if not name or not isinstance(name, str):
            issues.append("missing name")
        if not website.startswith("http"):
            issues.append("invalid website")
        if "ycombinator.com/companies" in website:
            issues.append("YC placeholder website")
        if "ycombinator.com" in logo_url:
            issues.append("YC logo")
        if "default-logo" in logo_url:
            issues.append("default logo")
        if not slug:
            issues.append("missing slug")

        if issues:
            failures.append(
                {
                    "index": idx,
                    "name": name,
                    "website": website,
                    "issues": ", ".join(issues),
                }
            )

    return pd.DataFrame(failures)


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

    if not CSV_PATH.exists():
        logging.error("CSV file not found: %s", CSV_PATH)
        return

    df = pd.read_csv(CSV_PATH)
    failures = validate(df)

    if failures.empty:
        logging.info("✅ All rows passed validation (%d checked).", len(df))
    else:
        logging.warning("⚠️ Detected %d issues across %d rows.", len(failures), len(df))
        print(failures.head(25).to_string(index=False))


if __name__ == "__main__":
    main()
