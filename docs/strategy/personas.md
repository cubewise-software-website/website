# Personas

Layer 2 — Strategy. Source of truth for who we're talking to on every page.

Derived from the four audience pages on the site: `/platform/developers/`, `/platform/administrators/`, `/platform/analysts/`, `/platform/managers/`. These are **module personas** (they shape feature pages and hooks). The brand persona — the senior Finance buyer — lives separately and shapes the homepage.

---

## At a glance

| Persona | Role | Primary JTBD | Core software | Pages shaped |
|---------|------|--------------|---------------|--------------|
| Developer | TM1 Developer / Consultant | Build and ship IBM PA applications faster, with less risk | Arc, Arc+ | `/arc/`, `/arc-plus/`, `/platform/developers/` |
| Administrator | TM1 Administrator / PA Ops | Keep the TM1 environment healthy, governed and auditable | Pulse, Arc+ | `/pulse/`, `/arc-plus/`, `/platform/administrators/` |
| Analyst | Finance analyst / FP&A / Finance Systems lead | Work with IBM PA data their way — without waiting for IT | Slice, Atmosphere, PowerConnect | `/slice/`, `/atmosphere/`, `/powerconnect/`, `/platform/analysts/` |
| Manager | Team lead / Finance Systems Manager / IT Manager | Run the TM1 platform confidently — full visibility, controlled change, lower integration cost | Pulse, Arc+, Atmosphere | `/platform/managers/` |

---

## Developer

**Who they are.** TM1 developers and consultants who write TI processes, build rules, and deploy models. From their first TI process through enterprise-scale deployments across dozens of instances.

**Jobs to be Done.**
- Build IBM PA applications business users can actually use — without breaking them
- Ship changes faster with fewer production incidents
- Apply modern software-engineering discipline (version control, testing, review) to a platform that was never built for it

**What they gain.**
- A professional IDE with syntax highlighting, autocomplete, code folding, and find-and-replace across the entire model
- Real debugger with breakpoints and live variable inspection — step through code instead of reading log files
- All TM1 instances connected and manageable in one window — switch, copy, and compare without context switching
- Impact analysis that shows exactly what will be affected before a single change goes to production
- Automated unit tests, enforced best practices, and instant rollback — every deployment backed by evidence

**Top hooks (in priority order).**
1. *"The IDE TM1 developers have wanted for decades."* — Arc as the professional environment.
2. *"Know what will break before you change it."* — Arc+ impact analysis.
3. *"Deploy live. Roll back if it goes wrong."* — Arc+ deployment packages + migration logs.
4. *"Write the test once. Run it forever."* — Arc+ automated unit testing.

**Products → Benefits.**

| Product | Role | Top benefit for this persona |
|---------|------|------------------------------|
| Arc | The IDE | Debug, autocomplete, templates — no more Notepad++ |
| Arc+ | DevOps platform | DevOps discipline for TM1 — impact analysis, tests, deployment packages, rollback |

**Voice cues (from live testimonials).**
> "Arc is quite simply a game changer for TM1 development." — Garry Cook, Informa
> "I am paying for Arc out of my own pocket. Why? Because it's worth that much to me in productivity savings." — Alan Kirk
> "We maintain over 70 TM1 instances on multiple servers." — Christoph Hein, Deutsche Bahn

**CTAs (buyer-stage matched).**
- Awareness → *Download Arc Free*
- Decision → *Talk to us* / *Get a demo* (Arc+)

---

## Administrator

**Who they are.** IBM Planning Analytics administrators and PA-Ops owners. Responsible for server health, uptime, change control and governance across one or many TM1 environments.

**Jobs to be Done.**
- Keep every TM1 server healthy, 24/7, across the estate
- Know what changed, when, and who changed it — without asking
- Control what goes into production — separation of duties between development and ops
- Migrate changes without scheduling downtime

**What they gain.**
- Real-time lock and thread visibility — know about issues before any user does
- Instant alerts when a chore fails or a process runs long — morning reports stay reliable
- A complete, searchable audit trail of every change in every production environment
- Live migration to production with zero downtime — no maintenance window required
- Full deployment history with one-click rollback — bad changes reversed in minutes, not hours

**Top hooks (in priority order).**
1. *"Complete visibility and control."* — hero positioning for the persona page.
2. *"Know about the lock before your users do."* — Pulse real-time alerting.
3. *"Migrate live. No downtime."* — Pulse live migration.
4. *"Governance without slowing the team down."* — Arc+ best-practice rules + approval workflows.

**Products → Benefits.**

| Product | Role | Top benefit for this persona |
|---------|------|------------------------------|
| Pulse | Monitoring & management | 24/7 visibility, audit trails, live migration, performance analysis |
| Arc+ | Governance & control | Enforce standards, control deployments, maintain separation of duties |

**Voice cues (from live testimonials).**
> "Pulse has helped us to significantly reduce user locks." — Pattonair
> "Pulse gives us as developers the option to migrate packages live without the need to bring down services." — SCC
> "With the change tracking feature in Pulse, every time an object is changed it is tracked and logged." — Stockland

**CTAs (buyer-stage matched).**
- Consideration → *Explore Pulse features*
- Decision → *Request a demo*

---

## Analyst

**Who they are.** Finance analysts, FP&A team members, and Finance Systems leads who consume and work with IBM Planning Analytics data. They live in Excel, build dashboards in Power BI, and often need data from source systems that IT hasn't wired up yet.

**Jobs to be Done.**
- Work with IBM PA data in the application they already know (Excel, Power BI)
- Bring in data from any source — without raising an IT ticket
- Plan and scenario-model without fear of breaking the live model
- Deliver reports that reflect current data, not yesterday's export

**What they gain.**
- A modern Excel add-in built for IBM Planning Analytics — familiar interface, no retraining required
- Live TM1 data in Power BI with automatic dimension sync — dashboards that are always current
- Self-service data connections to any cloud platform in hours — no IT ticket, no waiting
- Sandbox writeback — experiment freely with full confidence the live model stays intact

**Top hooks (in priority order).**
1. *"The modern successor to Perspectives."* — Slice positioning, zero learning curve.
2. *"Live TM1 data in Power BI. No exports."* — PowerConnect.
3. *"Connect any source. No IT ticket."* — Atmosphere, Finance-owned pipelines.
4. *"Plan without fear. Sandbox writeback."* — Slice sandbox + writeback.

**Products → Benefits.**

| Product | Role | Top benefit for this persona |
|---------|------|------------------------------|
| Slice | Excel add-in | All of Perspectives' familiarity, plus DBRW hierarchies, dynamic columns, cross-drill, sandbox writeback |
| Atmosphere | Data integration | 34+ pre-built connectors. Finance-owned schedules. No code. |
| PowerConnect | Power BI connector | Live connection to TM1 cubes. Dimensions sync automatically. Security respected. |

**Voice cues (from live testimonials).**
> "Cubewise Slice has provided our business users with a modern, easy to use interface. It has increased engagement with IBM PA data." — Anne-Marie Rodd, GHD
> "Slice is the modern successor to Perspectives. Virtually no learning curve." — Wei Wang

**CTAs (buyer-stage matched).**
- Awareness → *Explore Slice*
- Decision → *Request a demo* / *Get in touch*

---

## Manager

**Who they are.** Team leads, Finance Systems Managers, and IT Managers who own the IBM Planning Analytics platform. They oversee developers, administrators, and analysts but are not hands-on with the tools day-to-day. They care about reliability, risk, team productivity, and the cost of keeping everything running.

**Jobs to be Done.**
- Keep planning cycles running reliably without becoming a technical bottleneck
- Know what is happening across the environment without having to ask
- Control what changes go to production — and prove it when asked
- Reduce the cost and time of connecting new data sources
- Make the case internally for platform investment

**What they gain.**
- Real-time visibility across every server — know the health of the environment at all times, not just when something breaks
- A complete change audit trail — answer "what changed and who changed it?" in seconds, not hours
- Planned, documented production deployments with full rollback capability — releases become controlled events
- Pre-built, maintained connectors to every major cloud platform — no fragile custom scripts, no single points of failure
- One integration platform that replaces point-to-point ETL licences and the developer time spent maintaining them

**Top hooks (in priority order).**
1. *"Know what is happening before your users do."* — Pulse real-time monitoring + alerting.
2. *"Approve changes knowing exactly what will be affected."* — Arc+ impact analysis.
3. *"Connect any cloud platform in hours, not weeks."* — Atmosphere pre-built connectors.
4. *"Full audit trail — who changed what, when, and why."* — Pulse + Arc+ combined.

**Products → Benefits.**

| Product | Role | Top benefit for this persona |
|---------|------|------------------------------|
| Pulse | Platform monitor | 24/7 visibility, full change audit trail, performance insights, migration history |
| Arc+ | Governance platform | Impact analysis before every change, best-practice enforcement, deployment packages, rollback |
| Atmosphere | Integration layer | 50+ pre-built cloud connectors, self-service for the team, eliminate custom ETL cost |

**Voice cues (from live testimonials).**
> "Pulse has given us great confidence knowing that everything necessary will have been migrated." — Aveva
> "Pulse has helped us to significantly reduce user locks." — Pattonair

**CTAs (buyer-stage matched).**
- Consideration → *See all Pulse features* / *See all Arc+ features*
- Decision → *Get in Touch* / *Get a demo*

---

## How to use this file

When drafting copy for a page, product, or feature:

1. **Identify the target persona** — one per page, not three. If the page is `/arc/features/`, the persona is Developer.
2. **Lead with the top hook for that persona** — not the feature you're proudest of technically.
3. **Quote benefits, not features** — pull from the "Products → Benefits" table, or reference the module FAB file.
4. **Match CTA commitment to buyer stage** — see CTA rules in `brand/style-guide.md`.
5. **Place social proof next to the CTA** — match testimonial voice cues to this persona.

**Common trap.** A page can mention all three personas in its nav, but the body copy must speak to one. When in doubt, ask: *which persona is on the landing page of this journey?* That's the one the hook belongs to.
