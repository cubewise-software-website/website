---
name: Atmosphere module
description: Atmosphere FAB matrix, positioning, personas, hooks — self-service data integration for TM1
type: module
---

# Atmosphere

Layer 3 — Modules. Single source of truth for Atmosphere. Quote benefits from this file; don't re-describe Atmosphere ad hoc.

---

## One-line positioning

**Self-service data integration for Finance teams — into and out of IBM Planning Analytics / TM1.**

Atmosphere connects TM1 to the systems Finance teams actually work with — Dynamics 365, NetSuite, SAP, Snowflake, Databricks, Salesforce, and dozens more — through pre-built, Finance-owned pipelines that don't require IT tickets, code, or the data warehouse team.

---

## Tagline options (by context)

- Homepage card tagline: *"Self-service data integration for Finance teams."*
- Hero (Atmosphere page): *"Get all your cloud data for IBM Planning Analytics."*
- Sub-hero body: *"Secure, two-way pipelines that automate data movement from any source to keep your forecasts always current."*
- Persona (Power Users): *"Get your data into IBM Planning Analytics without IT."*
- Trust banner: *"Owned by Finance. Trusted by IT."*

---

## Primary persona — Power User / Finance team

FP&A leads, Finance Systems managers, planning analysts. People who need data from an ERP / CRM / cloud system to land in a TM1 cube — quickly, repeatedly, and without an IT project.

See `strategy/personas.md` → Power User.

**Secondary persona — Administrator / IT.** Atmosphere's security and no-data-stored posture is specifically designed to make IT comfortable without slowing Finance. Any Atmosphere page must reassure both audiences.

---

## Top hooks — priority order

1. **"Owned by Finance. Trusted by IT."** — The headline tension that Atmosphere resolves. This is the brand-pillar-4 hook.
2. **"34+ pre-built connectors."** — Specific, credible. Dynamics 365, NetSuite, SAP, Snowflake, Databricks, Salesforce all named.
3. **"Finance-owned schedules. No IT ticket."** — The workflow hook — who runs the pipeline.
4. **"Two-way. Out to Power BI, back to the data warehouse, forward to the plan."** — Atmosphere is not just an importer.

---

## Features → Advantages → Benefits (FAB)

### Get data in

| Feature | Advantage | Benefit (copy-ready) |
|---------|-----------|----------------------|
| 34+ pre-built connectors (D365, NetSuite, SAP, Snowflake, Databricks, Salesforce, and more) | No custom integration work for the common systems | "Connect to the systems your Finance team already uses — no code." |
| Pipelines that understand your GL and ERP structures | Ready-to-use hierarchies for Accounts, Departments, etc. | "Pipelines that speak Finance — not just raw tables." |
| Filters, deltas, and selective loads | Refresh only what's changed — fast at any size | "Refresh only what's changed. Stay fast at any scale." |
| One-click operational / financial / master data load | Finance can bring data across without scripts | "Bring operational, financial, and master data across with one click." |
| Mapping, cleaning, and hierarchy shaping | Data lands planning-ready, not raw | "Map fields, clean data, shape it into hierarchies — ready for planning and month-end." |
| Encrypted in-transit, no data stored | The IT comfort story | "Encrypted in-transit. No data stored by Atmosphere." |

### Get data out (the underrated half)

| Feature | Advantage | Benefit (copy-ready) |
|---------|-----------|----------------------|
| Two-way pipelines to BI, data warehouse, data lake | Downstream systems stay aligned with the plan automatically | "Push plan data and business structures back to downstream systems — automatically." |
| Continuous updates during busy cycles | Month-end doesn't break the pipeline | "Optimised for month-end. Keeps updating during the busy periods that break everything else." |
| Fast-ingestion formats for large datasets | Performant at enterprise scale | "Optimised for large datasets and fast ingestion formats." |

### Enrich

| Feature | Advantage | Benefit (copy-ready) |
|---------|-----------|----------------------|
| Combine internal + external data (FX rates, macroeconomic, etc.) | Forecasts informed by the real world | "Combine internal and external data — FX rates, macroeconomic indicators, and more." |
| Machine learning & predictive forecasting | Advanced analytics inside the plan | "Add machine learning and predictive forecasting to strengthen planning." |
| Outlier detection, reconciliation, financial calculations | Accuracy improvements built in | "Improve accuracy with outlier detection, financial calculations, and reconciliation." |
| Full D365 Finance & Operations endpoint coverage | Any endpoint — not just the common ones | "Connect to any endpoint in D365 Finance & Operations." |

### Governance

| Feature | Advantage | Benefit (copy-ready) |
|---------|-----------|----------------------|
| Finance-owned schedules | Finance can operate without an IT ticket queue | "Schedules Finance can own. Changes Finance can make." |
| Transparent tracking across all integrations | Audit trail of every update | "Transparent tracking across all integrations and updates." |
| No data stored by Atmosphere | Reduced compliance surface area | "Nothing stored where it shouldn't be." |
| Enterprise-grade access controls | IT retains the guardrails | "Enterprise-grade access controls." |

---

## Without / with (lifted from the live page — use in comparison blocks)

| Without Atmosphere | With Atmosphere |
|--------------------|-----------------|
| Manual updates in spreadsheets with errors | Automated pipelines that move data reliably on-demand and on-schedule |
| Late reports and inaccurate plans from slow or delayed processing | Actuals, plans, and downstream systems kept aligned |
| Confidential business data copied in insecure files | Secure transfer with no data stored and clear access controls |
| Little visibility into what changed, when, or why | Transparent tracking across all integrations and updates |
| Heavy dependency on IT or technical specialists | Workflows Finance can run without burdening IT |

This is the highest-converting section on the Atmosphere page. Reuse the structure anywhere the buyer needs to see the before/after clearly.

---

## Source systems currently featured

D365 Pipeline · NetSuite · Snowflake · Databricks · SAP (ERP and S/4HANA)

Full list at `/atmosphere/features/` and `/atmosphere/integrations/`. When writing copy for a source tab, treat it as a deep-dive page of its own — include what's pre-defined, how it handles scale, and which audience (Finance vs IT) is reassured by the details.

---

## Proof points

- 34+ pre-built connectors across ERP, CRM, data-warehouse and cloud systems.
- Encrypted in-transit; no data stored by Atmosphere.
- Finance-owned scheduling and update workflows — no IT dependency.
- Two-way pipelines — data out as well as in.
- D365 Pipeline works standalone or alongside Microsoft Fabric.
- Real-time refreshes during month-end and other busy cycles.

---

## Voice cues

Atmosphere is the newest platform component and currently has no public customer testimonial on the live site. Rely on:

1. **Specificity** — name the systems, name the numbers ("34+ connectors," "D365 Finance & Operations endpoints").
2. **The Finance / IT framing** — "Owned by Finance. Trusted by IT" is the single most persuasive line on the current page.
3. **The without/with table** — lifted from the live page, it does the proof-by-contrast work.

When customer stories are added, place them in `content/social-proof.md` tagged `module: atmosphere`.

---

## Common trap when writing Atmosphere copy

**Leading with "data integration" alone.** Every ERP vendor, every iPaaS, and every BI tool claims "data integration." The Finance-owned / IT-trusted framing is what differentiates Atmosphere — and it is the brand Pillar 4 story. Lead with the *who runs it* story, not the *what it does* story.

Specifically: headlines that say "Finance can finally own the pipeline" beat headlines that say "Integrate any source."

---

## CTAs

| Stage | Primary | Secondary |
|-------|---------|-----------|
| Awareness (Atmosphere overview) | Get a demo | Read the Docs |
| Consideration (features, source deep-dives) | Get a demo | See all integrations / See datalake integrations |
| Decision | Get a demo | Talk to us |

---

## Related pages

- `/atmosphere/` — overview
- `/atmosphere/features/` — all integrations / features
- `/atmosphere/integrations/` — source-system deep-dives
- `/platform/power-users/` — persona landing page
