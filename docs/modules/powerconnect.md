---
name: PowerConnect module
description: PowerConnect FAB matrix, positioning, personas, hooks — IBM PA data in Power BI
type: module
---

# PowerConnect

Layer 3 — Modules. Single source of truth for PowerConnect. Quote benefits from this file; don't re-describe PowerConnect ad hoc.

---

## One-line positioning

**IBM Planning Analytics / TM1 data, live in Microsoft Power BI.**

PowerConnect is the live, secure connection between TM1 cubes and Power BI — on-premises, cloud, or hybrid — so Finance and business teams build Power BI dashboards on always-current TM1 data, with the existing IBM PA security model enforced end-to-end.

---

## Tagline options (by context)

- Homepage card tagline: *"IBM Planning Analytics data in Microsoft Power BI."*
- Hero (PowerConnect page): *"Effortlessly integrate IBM Planning Analytics with Microsoft Power BI."*
- Sub-hero body: *"Unprecedented connectivity between IBM Planning Analytics and Power BI — on-premises, cloud, or hybrid."*
- Persona (Analysts): *"IBM Planning Analytics data in Microsoft Power BI."*

---

## Primary persona — Analyst

Finance analysts, FP&A, and Finance Systems leads who build Power BI dashboards and currently have to work from manually-exported TM1 data.

Secondary personas: **BI developers and data analysts** who sit inside business teams and need a TM1 data source for their Power BI workspaces; **Administrators** who care about the security story.

See `strategy/personas.md` → Analyst.

---

## Top hooks — priority order

1. **"Live TM1 data in Power BI. No exports."** — The core value. Eliminates the manual-export workflow.
2. **"Dimensions sync automatically. Reports never break."** — Structural sync, not just data sync.
3. **"Users see only what TM1 says they can see."** — Security model carries over to Power BI.
4. **"On-prem, cloud, or hybrid — one connector."** — Deployment flexibility.

---

## Top 5 features

The five PowerConnect capabilities every sales rep must be able to explain in 60 seconds. Sourced from `/powerconnect/` and `/powerconnect/features/`.

1. **Live Data Connection to TM1 Cubes** — Always up-to-date Power BI reports, no manual exports.
   - Dashboards reflect current data, not yesterday's export
   - Ad-hoc and scheduled refresh — fit freshness to the audience
   - Eliminates the manual export workflow entirely
   - Works with Power BI Desktop, Service and mobile

2. **Automatic Metadata & Dimension Sync** — Power BI follows the TM1 structure automatically.
   - Dimensions and hierarchies sync without manual updates
   - Reports never silently break when TM1 changes
   - Power BI stays aligned with TM1's structure
   - The differentiator vs. flat-CSV alternatives

3. **Security Model Integration** — Users see only what TM1 permits.
   - Same permissions in Power BI as in TM1
   - No parallel permission system to maintain
   - Data stays within established security protocols
   - The IT sign-off feature — surface it high in any pitch

4. **Hierarchical Visualization + Attribute Support** — Use TM1 hierarchies and attributes natively in Power BI.
   - Include as many hierarchy levels as your TM1 model contains
   - Intuitive Power BI navigation and filtering driven by TM1 hierarchies
   - Attribute support unlocks richer filtering, grouping and display
   - No flattening to a single-level table

5. **On-prem, Cloud & Hybrid — One Connector** — Deployment flexibility for any IBM PA environment.
   - Works with on-premises IBM Planning Analytics
   - Works with Planning Analytics as a Service (cloud)
   - Works with hybrid deployments
   - MDX Support for advanced users who need precise control over queries

---

## Features → Advantages → Benefits (FAB)

| Feature | Advantage | Benefit (copy-ready) |
|---------|-----------|----------------------|
| Live connection to TM1 cubes | Dashboards reflect current data, not yesterday's export | "Always up-to-date reports without manual intervention." |
| Automatic dimension & hierarchy sync | Power BI stays aligned with TM1's structure automatically | "No manual updates when your model changes — reports always reflect the latest structure." |
| Security model integration with IBM Planning Analytics | Same permissions in Power BI as in TM1 | "Get the right data to the right people — automatically." |
| On-premises, cloud, and hybrid support | Works regardless of where TM1 runs | "On-premises, cloud, or hybrid — one connector." |
| Works with Power BI Desktop, Service, and mobile | Not just a single-surface connector | "Build on desktop. Publish to Service. Read on mobile." |
| Ad-hoc and scheduled data refreshes | Fit your data freshness to the report's audience | "Refresh on demand. Or on a schedule. Your call." |
| Eliminates broken reports from dimensional changes | TM1 structural changes don't break the dashboard | "Eliminate broken reports caused by dimensional changes." |
| Respects established security protocols | Data doesn't leak around the permissions model | "Data always stays within your established security protocols." |

---

## Proof points

- Supports on-premises, cloud, and hybrid IBM Planning Analytics deployments from the same connector.
- Integrates with the existing TM1 security model — no parallel permissions to maintain.
- Works with Power BI Desktop, Service, and mobile — not just one surface.
- Dimension and hierarchy changes in TM1 propagate automatically; reports don't silently break.

---

## Voice cues

PowerConnect currently has no public customer testimonial on the live site. When customer stories are added, place them in `content/social-proof.md` tagged `module: powerconnect`. In the meantime, use the hook:

> *"Live TM1 data in Power BI. No exports. No broken reports."*

And rely on specificity: concrete feature claims ("automatic dimension sync," "security model carries over") are more persuasive than vague social proof.

---

## Common trap when writing PowerConnect copy

Two traps.

**Trap 1 — overselling "live."** "Live" means different things to different buyers. Be specific: live connection at query time, plus scheduled refresh for caching. Don't imply "real-time streaming" — that's not the product.

**Trap 2 — underselling security.** The security story (TM1 permissions carry over, on-prem / cloud / hybrid all supported) is the single biggest blocker for an IT sign-off, and PowerConnect solves it cleanly. Put this up high. Don't bury it in the third feature row.

---

## CTAs

| Stage | Primary | Secondary |
|-------|---------|-----------|
| Awareness (PowerConnect overview) | Get a demo | Read the Docs |
| Consideration (features) | See all PowerConnect features | Get a demo |
| Decision | Get a demo | Talk to us |

---

## Related pages

- `/powerconnect/` — overview
- `/powerconnect/features/` — all features
- `/powerconnect/download/` — download
- `/platform/analysts/` — persona landing page
