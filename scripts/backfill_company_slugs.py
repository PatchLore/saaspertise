#!/usr/bin/env python3
"""Backfill slug column for companies table in Supabase."""

import os
import re
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise EnvironmentError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")


def to_slug(name: str) -> str:
    """Generate URL-safe slug from company name."""
    if not name:
        return ""
    slug = name.lower().strip()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = re.sub(r"(^-|-$)+", "", slug)
    return slug


def main():
    node_env = os.getenv("NODE_ENV", "development")
    if node_env == "production":
        print("⚠️ Import disabled — pipeline is paused. Enable only in development mode.")
        return

    client: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    # Fetch all companies
    print("Fetching companies...")
    response = client.table("companies").select("id, name, slug").execute()
    companies = response.data if response.data else []

    print(f"Found {len(companies)} companies")

    # Generate updates
    updates = []
    for company in companies:
        name = company.get("name", "")
        current_slug = company.get("slug") or ""
        new_slug = to_slug(name)

        if new_slug and new_slug != current_slug:
            updates.append({"id": company["id"], "slug": new_slug})

    if not updates:
        print("✅ All companies already have correct slugs")
        return

    print(f"Updating {len(updates)} companies with slugs...")

    # Update in batches
    batch_size = 100
    for i in range(0, len(updates), batch_size):
        batch = updates[i : i + batch_size]
        try:
            client.table("companies").upsert(batch, on_conflict="id").execute()
            print(f"✅ Updated batch {i // batch_size + 1} ({len(batch)} companies)")
        except Exception as e:
            print(f"❌ Error updating batch {i // batch_size + 1}: {e}")

    print(f"✅ Slug backfill complete. Updated {len(updates)} companies.")


if __name__ == "__main__":
    main()

