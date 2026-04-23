---
name: Redirects register
description: Every old URL → new URL mapping. Updated whenever a page moves or is retired.
type: operational
---

# Redirects register

The canonical list of every URL that has moved or been retired on cubewise.com. Updated *in the same commit* as the page change itself — never after.

**Why this matters.** Every external backlink, LLM citation, bookmarked URL, and search-engine index pointing at an old URL becomes a dead end the moment the page moves. A redirect list is cheap insurance. Without one, SEO authority built over years evaporates.

---

## Rules

- **301, not 302.** Permanent redirects pass SEO authority. Use 302 only when the move is genuinely temporary and you expect to reverse it. No 302s in this file without a reason noted.
- **No redirect chains.** A → B → C loses authority at each hop. When B moves to C, update A to point directly at C. Verify with a crawl before shipping.
- **One canonical URL per page.** Don't redirect `/arc` and `/arc/` separately — pick one (trailing slash) and make the other redirect to it, globally.
- **Locale-aware.** A page move at `/arc/features/` needs equivalent redirects at `/fr/arc/features/`, `/de/arc/features/`, `/zh-hans/arc/features/`. Don't forget the language variants.
- **External URLs too.** If a case study, partner page, or doc link changes at an external domain, flag it here so navigation referencing it can be updated in the same pass.

---

## How to add an entry

For every move or retirement, add a row to the table below:

| Old URL | New URL | Type | Reason | Date |
|---------|---------|------|--------|------|

- **Type:** `301` (permanent), `302` (temporary — must include reason), `410` (gone — page retired with no replacement).
- **Reason:** brief note on why. Useful when auditing a year later.
- **Date:** when the redirect was put in place (YYYY-MM-DD).

---

## Current redirects

*As of 2026-04-23, no redirects are yet registered. Add rows below as pages move or are retired.*

| Old URL | New URL | Type | Reason | Date |
|---------|---------|------|--------|------|
| *(none yet)* | | | | |

---

## Examples (for reference — not live)

These show the expected format. Delete before populating with real entries.

```
| /platform/finance/                         | /platform/power-users/                   | 301 | Renamed persona hub — "finance" too narrow               | 2026-04-23 |
| /fr/platform/finance/                      | /fr/platform/power-users/                | 301 | Locale mirror of above                                    | 2026-04-23 |
| /de/platform/finance/                      | /de/platform/power-users/                | 301 | Locale mirror of above                                    | 2026-04-23 |
| /zh-hans/platform/finance/                 | /zh-hans/platform/power-users/           | 301 | Locale mirror of above                                    | 2026-04-23 |
| /products/rest-api-tool/                   | /products/rest-api-studio/               | 301 | Product renamed — see commit 60e02e3                      | 2026-04-22 |
| /old-blog/case-studies/                    | /blog/                                   | 301 | Case studies merged into main blog                        | 2026-03-15 |
| /arc-plus-beta/                            | /arc-plus/                               | 301 | Beta ended — redirected to production page                | 2026-02-01 |
| /events/pa-day-2025/                       |                                          | 410 | Event retired, no replacement page                        | 2026-01-20 |
```

---

## Rebuild checklist

Before any major rebuild or URL-structure change:

1. **Export all live URLs.** Crawl the production site and save the full URL list.
2. **Diff against the planned new structure.** Mark every URL that will change or disappear.
3. **Write the redirects first.** Add every row to this file *before* the rebuild ships.
4. **Ship redirects in the same deploy.** Not in a follow-up.
5. **Crawl post-deploy.** Confirm every old URL 301s to a 200 response at the new URL.
6. **Flag missed redirects within 24 hours.** A 404 spike in analytics after a publish = a missed redirect. Add the row. Redeploy.
7. **Resubmit to search consoles.** Google Search Console, Bing Webmaster — submit the updated sitemap so crawlers rediscover the new URLs fast.
8. **LLM citation check.** Ask Claude / GPT about Cubewise products a week after publish. If they still cite old URLs, submit updated URLs to their index where possible (most major LLMs re-crawl on a lag).

---

## Maintenance cadence

- **Every commit that moves or retires a page:** update this file in the same commit.
- **Monthly audit:** check the redirect table for chains (A → B → C). Collapse any chain by updating A to point directly at C. Mark the old chain entries as resolved or remove them.
- **Quarterly cleanup:** a redirect more than ~3 years old with zero traffic can be retired. But when in doubt, leave it — the cost of keeping it is near zero; the cost of a broken backlink is real.

---

## Related files

- `strategy/sitemap.md` — the authoritative list of current URLs. A move shows up in both this file and `sitemap.md`.
- `testing.md` §4 — URL, redirect and link-integrity checklist run before every publish.
