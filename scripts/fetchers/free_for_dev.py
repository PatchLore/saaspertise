#!/usr/bin/env python3
"""Fetcher for the free-for.dev Markdown list."""

from __future__ import annotations

import logging
import re
from typing import Dict, List

import requests

FREE_FOR_DEV_URL = "https://raw.githubusercontent.com/ripienaar/free-for-dev/master/README.md"
BULLET_PATTERN = re.compile(r"^\*\s*\[(?P<name>[^\]]+)\]\((?P<url>[^)]+)\)\s*(?:—|-|\u2014|\u2013)?\s*(?P<desc>.*)$")


def _normalise_url(url: str) -> str:
    if not url:
        return ""
    url = url.strip()
    if url.startswith("//"):
        url = f"https:{url}"
    if not url.startswith(("http://", "https://")):
        url = f"https://{url}"
    return url.rstrip('/')


def fetch_free_for_dev(session: requests.Session | None = None) -> List[Dict[str, str]]:
    """Fetch and parse the free-for.dev markdown list."""
    session = session or requests.Session()
    logging.info("Fetching Free-for-Dev markdown…")
    response = session.get(FREE_FOR_DEV_URL, timeout=30)
    response.raise_for_status()

    category = "Free Developer Resource"
    rows: Dict[str, Dict[str, str]] = {}

    for raw_line in response.text.splitlines():
        line = raw_line.strip()
        if not line:
            continue

        if line.startswith("## "):
            category = line[3:].strip() or category
            continue

        match = BULLET_PATTERN.match(line)
        if not match:
            continue

        name = match.group("name").strip()
        website = _normalise_url(match.group("url"))
        description = match.group("desc").strip()

        if not website or "github.com/ripienaar/free-for-dev" in website:
            continue

        key = website.lower()
        if key not in rows:
            rows[key] = {
                "name": name,
                "website": website,
                "category": category,
                "description": description or f"{name} is a resource listed on free-for.dev.",
            }

    logging.info("Free-for-Dev: collected %d unique services", len(rows))
    return list(rows.values())
