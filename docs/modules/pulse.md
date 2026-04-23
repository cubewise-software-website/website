---
name: Pulse module
description: Pulse FAB matrix, positioning, personas, hooks — application lifecycle management for TM1
type: module
---

# Pulse

Layer 3 — Modules. Single source of truth for Pulse. Quote benefits from this file; don't re-describe Pulse ad hoc.

---

## One-line positioning

**Application lifecycle management for IBM Planning Analytics / TM1.**

Pulse gives administrators and developers complete visibility and control over their TM1 environment: 24/7 monitoring, real-time alerts, audit trails, live migration, rollback, performance analysis, and user-activity insight.

---

## Tagline options (by context)

- Homepage card tagline: *"Monitor, understand and manage your TM1 environment."*
- Hero (Pulse page): *"The application lifecycle management software for IBM Planning Analytics."*
- Sub-hero body: *"Monitor what is happening. Migrate faster with confidence. Understand what happened."*
- Persona (Administrators): *"Complete visibility and control over your TM1 environment."*

---

## Primary persona — Administrator

IBM Planning Analytics administrators, PA-Ops owners, and senior TM1 developers who are responsible for environment health, change control, and governance.

See `strategy/personas.md` → Administrator.

**Secondary persona — Developer** (as part of Arc+). Pulse is half of Arc+, so Developer use cases also apply here — impact analysis, live migration, deployment history.

---

## Top hooks — priority order

1. **"Know about the lock before your users do."** — Real-time user-lock alerting. The Pattonair story.
2. **"Migrate live. No downtime."** — Live package migration. The SCC story.
3. **"Every change tracked. Every deploy verified."** — Change tracking and audit trails. The Stockland story.
4. **"See every error across every instance, on one dashboard."** — Cross-instance operations view.

---

## Three capability pillars (the site structure uses these)

Pulse's own sub-nav divides the product into three groups. Copy should follow this structure.

| Pillar | What it covers | Sub-page |
|--------|---------------|----------|
| **Monitor** | 24/7 monitoring, alerting, real-time status across all TM1 servers | `/pulse/monitor/` |
| **Understand** | Impact analysis, model navigation, user-activity analysis, performance analysis | `/pulse/understand/` |
| **Migrate** | Package creation, live migration, rollback, change tracking, separation of duties | `/pulse/migration/` |

Plus a fourth implicit pillar: **Continuously improve** — performance tuning, user training identification, long-term trend analysis.

---

## Features → Advantages → Benefits (FAB)

### Monitor

| Feature | Advantage | Benefit (copy-ready) |
|---------|-----------|----------------------|
| 24/7 monitoring | Constant awareness across every server, not just during business hours | "Every TM1 server, every minute — watched." |
| Real-time email/alerting integrations | User locks, chore failures, memory thresholds discovered before users complain | "Know about the lock before your users do." |
| Real-time notification of model changes | Spot unauthorised or unexpected changes instantly | "Every model change, as it happens." |
| Reduce support calls | Problems surface — and often resolve — before tickets are raised | "Fewer support tickets. Fewer angry mornings." |
| History and favourites | Navigate back to what you care about fast | "Keep your history and favourites where you need them." |

### Understand

| Feature | Advantage | Benefit (copy-ready) |
|---------|-----------|----------------------|
| Impact analysis | See object dependencies across the entire model | "Know what will break before you change it." |
| Interactive model navigation | Click through cubes, dimensions, processes visually | "Navigate your TM1 model the way it was always meant to be navigated." |
| Error troubleshooting | Jump straight to the object and the cause | "Troubleshoot errors faster — not by reading 10,000 log lines." |
| User-activity analysis | See how users interact with the model, what they hit most | "Understand how your users actually use TM1." |
| Identify users who need training | Usage patterns surface knowledge gaps | "Identify users who require training." |
| Look back at earlier states | Historical snapshots for root-cause analysis | "Diagnose problems by looking at earlier states." |

### Migrate

| Feature | Advantage | Benefit (copy-ready) |
|---------|-----------|----------------------|
| Deployment packages | All object dependencies resolved automatically | "Stop hand-assembling migration packages." |
| Live migration | Deploy changes to production with services running | "Deploy to production live. No downtime." |
| Full deployment history + downloadable logs | Compliance-grade audit trail | "Every migration, logged. Every auditor, happy." |
| Rollback | Recover fast from a bad deploy | "One click to roll back." |
| Change tracking | Every object change tracked automatically | "Every change tracked and logged — automatically." |
| Separation of duties between TM1 team and IT | IT has control without bottlenecking the TM1 team | "Separation of duties. Without the politics." |
| Improve testing procedures | Deployment discipline forces upstream testing | "Deployment rigour that pushes quality upstream." |

### Continuously improve

| Feature | Advantage | Benefit (copy-ready) |
|---------|-----------|----------------------|
| Performance analysis | Identify slow chores, memory spikes, patterns that drag the server | "Find the chore that's killing performance." |
| Speed up TM1 development | Insight into what developers are doing drives better practices | "Speed up TM1 development." |
| Licence compliance & unused-licence reallocation | Reclaim budget; avoid over-licensing | "Reallocate unused licences. Stop paying for seats no one uses." |
| Make users more productive | Performance + training insight + fewer outages | "Make your users more productive — and keep them that way." |

---

## Proof points

- Used across aerospace, technology, real estate, pharma, real estate, property industries (Pattonair, SCC, Aveva, Norgine, Stockland).
- Live migration to production with no downtime — quoted capability at SCC.
- Change tracking as a compliance-grade audit trail — Stockland reference.
- Reduced user locks, with email notifications for locks >5 minutes — Pattonair reference.
- Confidence in migrations — "knowing that everything necessary will have been migrated" (Aveva).

---

## Voice cues (live customer quotes)

> **"Pulse has helped us to significantly reduce user locks and allowed us to be notified via email if any user is locked in TM1 for more than 5 min."**
> — Pattonair, Aerospace & Defence supply chain

> **"Pulse gives us as developers the option to migrate packages live without the need to bring down services."**
> — SCC, Technology Solutions

> **"With the change tracking feature in Pulse, every time an object is changed it is tracked and logged — helping us verify correct changes have been made in production."**
> — Stockland, Property & Real Estate

> **"Pulse has given us great confidence knowing that everything necessary will have been migrated."**
> — Aveva

Full customer-story index: `/pulse/customers/`. Full quote index: `content/social-proof.md`.

---

## Common trap when writing Pulse copy

Pulse has a huge feature surface. The trap is laying it out as an undifferentiated list of capabilities. The **Monitor / Understand / Migrate** triad is the structure — it's how the site nav divides the product, how the hero sub-text frames it, and how customers actually think about what Pulse does for them.

Pick one of the three as the lead for any given page. Use the others to support.

---

## CTAs

| Stage | Primary | Secondary |
|-------|---------|-----------|
| Awareness (Pulse overview) | Request a demo | Read the Docs |
| Consideration (features / deep-dives) | Request a demo | Read customer stories / See all features |
| Decision | Request a demo | Talk to us |

Pulse does not currently have a public free-trial path like Arc. Lead with demo and customer stories.

---

## Related pages

- `/pulse/` — overview
- `/pulse/features/` — all features
- `/pulse/monitor/` — monitoring deep-dive
- `/pulse/understand/` — understanding / analysis deep-dive
- `/pulse/migration/` — migration deep-dive
- `/pulse/customers/` — index of Aveva, Norgine, Pattonair, SCC, Stockland stories
- `/pulse/download/` — download
- `/platform/administrators/` — persona landing page
- `/arc-plus/` — Pulse + Arc as a DevOps platform
