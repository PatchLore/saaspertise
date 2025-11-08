#!/bin/bash

set -euo pipefail

# Usage:
#   bash scripts/run_pipeline.sh

echo "🚀 Starting SaaSpertise data pipeline..."

# Step 1 — Fetch
echo "🔹 Fetching SaaS + AI company data..."
if ! python3 scripts/fetch_companies.py; then
  echo "❌ Fetch failed"
  exit 1
fi

# Step 2 — Enrich
echo "🔹 Enriching data (AI or manual)..."
if ! python3 scripts/enrich_companies.py; then
  echo "⚠️  Enrichment skipped or failed — using raw CSV."
fi

# Step 3 — Upload
echo "🔹 Uploading to Supabase..."
if ! python3 scripts/upload_supabase.py; then
  echo "❌ Upload failed"
  exit 1
fi

echo "✅ Pipeline complete!"

