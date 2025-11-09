#!/usr/bin/env python3
"""Gather SaaS & AI companies from open datasets and enrich with logos."""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass, replace
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from urllib.parse import urlparse

import pandas as pd
import requests


logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

OUTPUT_PATH = DATA_DIR / "companies_raw.csv"
DEFAULT_LOGO = "https://saaspertise.com/default-logo.png"
LOGO_TIMEOUT = 8


@dataclass(frozen=True)
class Company:
    """Structured representation of a SaaS/AI company."""

    name: str
    website: str
    category: str
    description: str
    logo_url: str = DEFAULT_LOGO

    def as_dict(self) -> Dict[str, str]:
        return {
            "name": self.name.strip(),
            "website": self.website.strip(),
            "category": self.category.strip(),
            "description": self.description.strip(),
            "logo_url": self.logo_url.strip(),
        }


def clean_text(value: Optional[str]) -> str:
    """Clean whitespace and strip HTML tags from text."""
    if not value:
        return ""
    value = re.sub(r"<[^>]+>", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def normalize_url(url: Optional[str]) -> str:
    """Ensure URLs are absolute HTTPS and without trailing slash clutter."""
    if not url:
        return ""
    url = url.strip()
    if url.startswith("//"):
        url = f"https:{url}"
    if not url.startswith("http"):
        url = f"https://{url}"
    return url.rstrip("/")


def fetch_public_apis() -> List[Company]:
    """Load public API listings from the open public-apis dataset."""
    url = "https://raw.githubusercontent.com/public-apis/public-apis/master/entries.json"
    logging.info("Fetching public APIs dataset.")
    try:
        response = requests.get(url, timeout=25)
        response.raise_for_status()
        payload = response.json()
    except Exception as exc:  # noqa: BLE001
        logging.warning("Failed to load public APIs dataset: %s", exc)
        return []

    entries = payload.get("entries", []) if isinstance(payload, dict) else []
    companies: List[Company] = []
    for item in entries:
        if not isinstance(item, dict):
            continue
        name = clean_text(item.get("API"))
        website = normalize_url(item.get("Link"))
        description = clean_text(item.get("Description"))
        category = clean_text(item.get("Category") or "API Tools")
        if name and website:
            companies.append(
                Company(
                    name=name,
                    website=website,
                    category=f"{category} API",
                    description=description or f"{name} public API for developers.",
                )
            )
    logging.info("Retrieved %s companies from public APIs dataset.", len(companies))
    return companies


def fetch_futuretools_catalog() -> List[Company]:
    """Fetch AI tools from the FutureTools public mirror."""
    url = "https://raw.githubusercontent.com/dipamthakkar/ai-tools-dataset/main/data/futuretools.json"
    logging.info("Fetching FutureTools dataset.")
    try:
        response = requests.get(url, timeout=25)
        response.raise_for_status()
        tools = response.json()
    except Exception as exc:  # noqa: BLE001
        logging.warning("Failed to load FutureTools dataset: %s", exc)
        return []

    companies: List[Company] = []
    for item in tools:
        if not isinstance(item, dict):
            continue
        name = clean_text(item.get("title") or item.get("name"))
        website = normalize_url(item.get("url") or item.get("website"))
        description = clean_text(item.get("description") or item.get("short_description"))
        category = clean_text(item.get("category") or "AI Tools")
        if name and website:
            companies.append(
                Company(
                    name=name,
                    website=website,
                    category=category or "AI Tools",
                    description=description or f"{name} AI tool listed on FutureTools.",
                )
            )
    logging.info("Retrieved %s companies from FutureTools dataset.", len(companies))
    return companies


def fetch_theres_ai_for_that() -> List[Company]:
    """Fetch AI tools data inspired by There's An AI For That."""
    url = "https://raw.githubusercontent.com/theresanaiforthat-com/ai-datasets/main/data/tools.json"
    logging.info("Fetching There's An AI For That dataset.")
    try:
        response = requests.get(url, timeout=25)
        response.raise_for_status()
        payload = response.json()
    except Exception as exc:  # noqa: BLE001
        logging.warning("Failed to load There's An AI For That dataset: %s", exc)
        return []

    tools = payload.get("tools", payload) if isinstance(payload, dict) else payload
    companies: List[Company] = []
    for item in tools:
        if not isinstance(item, dict):
            continue
        name = clean_text(item.get("name"))
        website = normalize_url(item.get("link") or item.get("website"))
        description = clean_text(item.get("description") or item.get("summary"))
        category = clean_text(item.get("category") or item.get("type") or "AI Tools")
        if name and website:
            companies.append(
                Company(
                    name=name,
                    website=website,
                    category=category or "AI Tools",
                    description=description or f"{name} AI solution listed on There's An AI For That.",
                )
            )
    logging.info("Retrieved %s companies from There's An AI For That dataset.", len(companies))
    return companies


def fetch_open_saas_directory() -> List[Company]:
    """Pull SaaS company listings from an open directory dataset."""
    url = "https://raw.githubusercontent.com/valerio-bocci/awesome-saas-companies/main/data/companies.json"
    logging.info("Fetching open SaaS directory dataset.")
    try:
        response = requests.get(url, timeout=25)
        response.raise_for_status()
        companies_data = response.json()
    except Exception as exc:  # noqa: BLE001
        logging.warning("Failed to load SaaS directory dataset: %s", exc)
        return []

    companies: List[Company] = []
    for item in companies_data:
        if not isinstance(item, dict):
            continue
        name = clean_text(item.get("name"))
        website = normalize_url(item.get("website") or item.get("url"))
        description = clean_text(item.get("description") or item.get("summary"))
        category = clean_text(item.get("category") or item.get("sector") or "SaaS")
        if name and website:
            companies.append(
                Company(
                    name=name,
                    website=website,
                    category=category or "SaaS",
                    description=description or f"{name} SaaS company listed in an open directory.",
                )
            )
    logging.info("Retrieved %s companies from SaaS directory dataset.", len(companies))
    return companies


def fetch_github_ai_companies() -> List[Company]:
    """Load AI companies from the dair-ai open dataset."""
    url = "https://raw.githubusercontent.com/dair-ai/ai-companies-dataset/main/data/ai_companies.json"
    logging.info("Fetching GitHub AI companies dataset.")
    try:
        response = requests.get(url, timeout=25)
        response.raise_for_status()
        payload = response.json()
    except Exception as exc:  # noqa: BLE001
        logging.warning("Failed to load AI companies dataset: %s", exc)
        return []

    companies_data = payload.get("companies", payload) if isinstance(payload, dict) else payload
    companies: List[Company] = []
    for item in companies_data:
        if not isinstance(item, dict):
            continue
        name = clean_text(item.get("name"))
        website = normalize_url(item.get("website") or item.get("url"))
        description = clean_text(item.get("description") or item.get("overview"))
        category = clean_text(item.get("focus") or item.get("category") or "AI Company")
        if name and website:
            companies.append(
                Company(
                    name=name,
                    website=website,
                    category=category or "AI Company",
                    description=description or f"{name} AI-focused company.",
                )
            )
    logging.info("Retrieved %s companies from GitHub AI companies dataset.", len(companies))
    return companies


SOURCE_FETCHERS: List[Callable[[], List[Company]]] = [
    fetch_public_apis,
    fetch_futuretools_catalog,
    fetch_theres_ai_for_that,
    fetch_open_saas_directory,
    fetch_github_ai_companies,
]


def deduplicate(companies: List[Company]) -> List[Company]:
    """Remove duplicates prioritising website uniqueness, then name."""
    seen_websites = set()
    seen_names = set()
    deduped: List[Company] = []

    for company in companies:
        website_key = company.website.lower()
        name_key = company.name.lower()

        if website_key and website_key not in seen_websites:
            seen_websites.add(website_key)
            seen_names.add(name_key)
            deduped.append(company)
            continue

        if name_key and name_key not in seen_names:
            seen_names.add(name_key)
            deduped.append(company)

    return deduped


def enrich_logos(companies: List[Company]) -> List[Company]:
    """Attach logo URLs to each company while counting successes."""
    successes = 0
    enriched: List[Company] = []

    for company in companies:
        logo_url = resolve_logo_url(company.website)
        if logo_url != DEFAULT_LOGO:
            successes += 1
        enriched.append(replace(company, logo_url=logo_url))

    logging.info("Found %s logos via Clearbit (fallback used for %s).", successes, len(companies) - successes)
    return enriched


def save_to_csv(companies: List[Company]) -> None:
    """Persist company data to CSV using pandas."""
    if not companies:
        logging.warning("No companies collected; skipping CSV write.")
        return

    df = pd.DataFrame([company.as_dict() for company in companies], columns=["name", "website", "category", "description", "logo_url"])
    df.to_csv(OUTPUT_PATH, index=False)
    logging.info("Saved %s companies to %s", len(df), OUTPUT_PATH)


def main() -> None:
    logging.info("Starting SaaS & AI company aggregation workflow.")
    collected: List[Company] = []

    for fetcher in SOURCE_FETCHERS:
        try:
            results = fetcher()
            collected.extend(results)
        except Exception as exc:  # noqa: BLE001
            logging.warning("Fetcher %s failed unexpectedly: %s", fetcher.__name__, exc)

    logging.info("Collected %s raw company records before deduplication.", len(collected))
    unique_companies = deduplicate(collected)
    logging.info("Retained %s unique company records after deduplication.", len(unique_companies))

    companies_with_logos = enrich_logos(unique_companies)
    save_to_csv(companies_with_logos)
    logging.info("Workflow completed successfully.")
    logging.info("✅ Saved %s companies to %s", len(companies_with_logos), OUTPUT_PATH)


if __name__ == "__main__":
    main()

