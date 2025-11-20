# SaaSpertise Import Pipeline — Pause Summary (2025-11-09)

## ✅ Current Production Status
- Production contains original ~30 curated companies.
- No bulk import has modified the live database.
- Live site stays clean and usable.

## ✅ Local Development Status
- Python pipeline successfully aggregates ~7142 companies *locally*.
- Domain enrichment currently resolves 0 rows (blocked by SSL / inconsistent Clearbit).
- Logo enrichment works, but many domains are invalid.
- Pipeline code has been heavily modified and requires consolidation later.

## ⚠️ Known Issues
- SSL certificate chain failure blocks several CSV sources.
- Clearbit autocomplete inconsistent for YC/old companies.
- DuckDuckGo fallback unreliable due to HTML changes.
- High volume of dead/parked domains among YC archives.
- Normalization order previously caused incorrect dedupe behavior.

## 📦 What’s Working
- Pipeline collects data from multiple sources.
- Markdown + JSON scraping works.
- Logo enrichment (fallback placeholder) works.
- Slug generation works.
- Deduplication logic improved and controlled.

## 🔒 Safety State
- Auto-import disabled in production.
- Writes to Supabase only allowed in development mode.
- Local CSV maintained but NOT propagated to production.

## 🧭 Recommended Next Steps (When Returning to This Project)
1. Replace Clearbit with a custom “domain verification + crawling” flow.
2. Use a headless browser for domain extraction (Playwright/Puppeteer).
3. Add AI-assisted description generation for companies missing summaries.
4. Add domain validation (DNS lookup, WHOIS status, HTTP status).
5. Create a dashboard to manually review missing/invalid entries.
6. Split companies into tiers: valid domains, invalid/missing, parked, dead.
7. Build an admin UI inside SaaSpertise to approve/reject imported companies.
8. Add filtering rules (exclude one-word filler companies, inactive startups).
9. Add caching for fetchers to speed repeated runs.
10. Integrate a paid API (SerpAPI/BrightData) for more reliable domain searches.

## 📁 Backup Location
Keep original curated dataset at:

`docs/backups/saaspertise-original-30.csv`

## 📌 Conclusion
SaaSpertise pipeline is paused intentionally.  
Production stays clean.  
Future work documented clearly.  
Focus can now shift to OnPointPrompt.

