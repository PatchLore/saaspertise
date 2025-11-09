#!/usr/bin/env python3
"""Domain enrichment helpers for company rows."""

from __future__ import annotations

import json
import logging
import re
from pathlib import Path
from typing import Dict, List

import requests

CACHE_PATH = Path("data/clearbit_cache.json")
YC_PATTERN = "https://www.ycombinator.com/companies/"
MISSING_PLACEHOLDER = "missing-domain://"
SESSION = requests.Session()
CACHE: Dict[str, Dict[str, str]] = {}


def _slugify(value: str) -> str:
    return "-".join(part for part in re.sub(r"[^a-z0-9]+", " ", value.lower()).split())


def _load_cache() -> Dict[str, Dict[str, str]]:
    global CACHE
    if CACHE:
        return CACHE
    if CACHE_PATH.exists():
        try:
            with CACHE_PATH.open("r", encoding="utf-8") as fh:
                CACHE = json.load(fh)
        except Exception:
            logging.warning("Unable to read clearbit cache; starting fresh.")
            CACHE = {}
    else:
        CACHE = {}
    return CACHE


def _save_cache(cache: Dict[str, Dict[str, str]]) -> None:
    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with CACHE_PATH.open("w", encoding="utf-8") as fh:
        json.dump(cache, fh, indent=2, ensure_ascii=False)


def _query_clearbit(name: str) -> Dict[str, str] | None:
    cache = _load_cache()
    key = name.lower().strip()
    if key in cache:
        return cache[key]

    try:
        url = f"https://autocomplete.clearbit.com/v1/companies/suggest?query={name}"
        response = SESSION.get(url, timeout=6)
        response.raise_for_status()
        data = response.json()
        if data and isinstance(data, list):
            cache[key] = data[0]
        else:
            cache[key] = {}
        _save_cache(cache)
        return cache[key]
    except Exception as exc:  # noqa: BLE001
        logging.debug("Clearbit lookup failed for %s: %s", name, exc)
        cache[key] = {}
        return None


def _has_placeholder_domain(website: str) -> bool:
    if not website:
        return True
    lowered = website.lower()
    return lowered.startswith(MISSING_PLACEHOLDER) or lowered.startswith(YC_PATTERN)


def enrich_domains(rows: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """Replace YC placeholder domains with real domains when confidently detected."""
    updated = 0
    for row in rows:
        website = row.get("website") or ""
        if not _has_placeholder_domain(website):
            continue

        name = row.get("name") or ""
        if not name:
            continue

        suggestion = _query_clearbit(name)
        if not suggestion:
            continue

        domain = suggestion.get("domain")
        suggested_name = suggestion.get("name", "")
        if not domain:
            continue

        original_slug = _slugify(name)
        suggestion_slug = _slugify(suggested_name)
        domain_slug = _slugify(domain.split(".")[0])

        if original_slug and (original_slug == suggestion_slug or original_slug == domain_slug):
            row["website"] = f"https://{domain}".rstrip('/')
            updated += 1
        elif not website or website.startswith(YC_PATTERN):
            slug_part = website.rstrip('/').split('/')[-1] if website else _slugify(name)
            if slug_part and _slugify(slug_part) == domain_slug:
                row["website"] = f"https://{domain}".rstrip('/')
                updated += 1

    logging.info("Domain enrichment updated %d rows", updated)
    return rows
