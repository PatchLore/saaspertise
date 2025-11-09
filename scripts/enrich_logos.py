#!/usr/bin/env python3
"""Logo enrichment helpers for company rows."""

from __future__ import annotations

import logging
from typing import Dict, List

import requests
import tldextract

DEFAULT_LOGO = "https://saaspertise.com/default-logo.png"
YC_PATTERN = "ycombinator.com"
SESSION = requests.Session()


def _extract_domain(url: str) -> str:
    parsed = tldextract.extract(url)
    return ".".join(part for part in [parsed.domain, parsed.suffix] if part)


def _url_ok(url: str) -> bool:
    try:
        response = SESSION.head(url, timeout=5, allow_redirects=True)
        return response.status_code == 200 and "image" in response.headers.get("Content-Type", "")
    except Exception:  # noqa: BLE001
        return False


def _clearbit_logo(domain: str) -> str | None:
    url = f"https://logo.clearbit.com/{domain}"
    return url if _url_ok(url) else None


def _duckduckgo_logo(domain: str) -> str | None:
    url = f"https://icons.duckduckgo.com/ip3/{domain}.ico"
    try:
        response = SESSION.head(url, timeout=5, allow_redirects=True)
        if response.status_code == 200:
            return url
    except Exception:  # noqa: BLE001
        return None
    return None


def _google_logo(website: str) -> str | None:
    if not website:
        return None
    return f"https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&url={website}&size=128"


def _needs_logo(logo_url: str | None) -> bool:
    if not logo_url:
        return True
    lowered = logo_url.lower()
    return any(pattern in lowered for pattern in ("default-logo", YC_PATTERN))


def enrich_logos(rows: List[Dict[str, str]]) -> List[Dict[str, str]]:
    updated = 0
    for row in rows:
        logo_url = row.get("logo_url")
        website = row.get("website") or ""

        if not _needs_logo(logo_url):
            continue

        domain = _extract_domain(website)
        if not domain or YC_PATTERN in domain:
            row["logo_url"] = DEFAULT_LOGO
            updated += 1
            continue

        replacement = (
            _clearbit_logo(domain)
            or _duckduckgo_logo(domain)
            or _google_logo(website)
            or DEFAULT_LOGO
        )

        if replacement != logo_url:
            row["logo_url"] = replacement
            updated += 1

    logging.info("Logo enrichment updated %d rows", updated)
    return rows
