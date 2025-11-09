#!/usr/bin/env python3
"""Fix missing-domain placeholders in Supabase company records."""

import os
import time

import requests
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
DEFAULT_LOGO = "https://saaspertise.com/default-logo.png"

if not SUPABASE_URL or not SUPABASE_KEY:
    raise EnvironmentError("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing from environment")

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
}


def find_domain(company_name):
    """Try Clearbit autocomplete API first"""
    try:
        url = f"https://autocomplete.clearbit.com/v1/companies/suggest?query={company_name}"
        response = requests.get(url, timeout=6)
        if response.status_code == 200:
            data = response.json()
            if data and isinstance(data, list):
                domain = data[0].get("domain")
                if domain:
                    return domain
    except Exception:
        pass
    return None


def clearbit_logo(domain):
    """Check if Clearbit logo exists for domain"""
    if not domain:
        return DEFAULT_LOGO
    test_url = f"https://logo.clearbit.com/{domain}"
    try:
        response = requests.head(test_url, timeout=5)
        if response.status_code == 200 and "image" in response.headers.get("Content-Type", ""):
            return test_url
    except Exception:
        pass
    return DEFAULT_LOGO


def patch_company(company_id, domain, logo_url):
    """Update company row in Supabase"""
    requests.patch(
        f"{SUPABASE_URL}/rest/v1/companies?id=eq.{company_id}",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
        json={
            "website": f"https://{domain}",
            "logo_url": logo_url,
        },
        timeout=30,
    )


def main():
    print("🔍 Checking for missing-domain placeholders...")
    response = requests.get(
        f"{SUPABASE_URL}/rest/v1/companies?select=id,name,website&website=like.missing-domain://%",
        headers=HEADERS,
        timeout=30,
    )
    response.raise_for_status()
    companies = response.json()
    print(f"Found {len(companies)} placeholders")

    for idx, company in enumerate(companies, 1):
        name = company["name"]
        company_id = company["id"]
        domain = find_domain(name)
        if not domain:
            print(f"⚠️  No domain found for {name}")
            continue
        logo = clearbit_logo(domain)
        patch_company(company_id, domain, logo)
        print(f"✅ {idx}/{len(companies)} updated → {domain}")
        if idx % 20 == 0:
            time.sleep(2)

    print("✨ Domain + logo enrichment complete.")


if __name__ == "__main__":
    main()
