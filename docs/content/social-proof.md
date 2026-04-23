---
name: Social proof
description: Every customer quote on the site, tagged by stage + objection + module for reuse
type: content
---

# Social proof

Every quote on the Cubewise site, in one place, tagged. Claude pulls from here when placing social proof adjacent to a CTA. Stage + objection-resolved is the useful tag — not persona.

When a quote grows into a case study, add a `case study: [link]` field — no restructuring needed.

---

## Tag reference

- **stage:** `awareness` · `consideration` · `decision` — match to the page's stage, not the buyer's role.
- **resolves:** the specific buyer objection this quote answers.
- **module:** which Cubewise component the quote is about.
- **use on:** which pages this quote should appear on.
- **source:** where it currently lives on the site.

---

## Arc

```yaml
quote: "Arc is quite simply a game changer for TM1 development which I cannot recommend highly enough. The efficiency it brings to the development cycle is undeniable, especially with the integration to our TM1 Cloud instances."
attribution: Garry Cook, Financial Data Analytics Director, Informa
stage: consideration
resolves: "Is this actually better than what we use now?"
module: arc
use on: homepage, /arc/, /arc/customers/, /platform/developers/
source: homepage testimonials, /platform/developers/
```

```yaml
quote: "I am paying for Arc out of my own pocket. Why? Because it's worth that much to me in productivity savings. The ability to use templates, autocomplete, breakpoints, debugging… all the things developers have been pining for years are here."
attribution: Alan Kirk, TM1 Forum Legend — Australia
stage: decision
resolves: "Is it worth the budget?"
module: arc
use on: /arc/, /arc/customers/, /platform/developers/, /arc/download/
source: /platform/developers/
```

```yaml
quote: "At Deutsche Bahn the biggest advantage of Arc is the possibility to easily switch between TM1 instances and migrate processes — we maintain over 70 TM1 instances on multiple servers."
attribution: Christoph Hein, Senior TM1 Consultant, Deutsche Bahn
stage: consideration
resolves: "Does it scale to enterprise environments?"
module: arc
use on: /arc/, /arc/customers/, /platform/developers/
source: /platform/developers/
```

---

## Pulse

```yaml
quote: "Pulse has helped us to significantly reduce user locks and allowed us to be notified via email if any user is locked in TM1 for more than 5 minutes. It has transformed how we monitor our environment."
attribution: Pattonair, Aerospace & Defence supply chain
stage: decision
resolves: "Will this actually reduce the operational pain we have today?"
module: pulse
use on: homepage, /pulse/, /pulse/customers/, /platform/administrators/
source: homepage testimonials, /pulse/, /platform/administrators/
```

```yaml
quote: "Pulse gives us as developers the option to migrate packages live without the need to bring down services."
attribution: SCC, Technology Solutions
stage: decision
resolves: "Can we deploy without downtime?"
module: pulse
use on: /pulse/, /pulse/migration/, /pulse/customers/, /platform/administrators/, /arc-plus/
source: /pulse/, /platform/administrators/
```

```yaml
quote: "Pulse has given us great confidence knowing that everything necessary will have been migrated."
attribution: Aveva
stage: decision
resolves: "Will the migration be complete — or will we find something missing after?"
module: pulse
use on: /pulse/, /pulse/migration/, /pulse/customers/aveva/
source: /pulse/
```

```yaml
quote: "With the change tracking feature in Pulse, every time an object is changed it is tracked and logged — helping us verify correct changes have been made in production."
attribution: Stockland, Property & Real Estate
stage: consideration
resolves: "How do we audit changes in production?"
module: pulse
use on: /pulse/, /pulse/customers/stockland/, /platform/administrators/
source: /platform/administrators/
```

---

## Slice

```yaml
quote: "Cubewise Slice has provided our business users with a modern, easy to use interface to interrogate their data. We now have cross drill and dynamic columns at our fingertips. It has increased engagement with IBM PA data."
attribution: Anne-Marie Rodd, Finance Systems Leader, GHD
stage: consideration
resolves: "Will our Finance users actually use this, or will it sit unused?"
module: slice
use on: homepage, /slice/, /slice/customers/, /platform/power-users/
source: homepage testimonials, /platform/power-users/
```

```yaml
quote: "Slice is the modern successor to Perspectives. For those hardened through building Excel templates in Perspectives, there is virtually no learning curve and a bunch of enhancements that we all wish had existed earlier."
attribution: Wei Wang, TM1 Developer
stage: consideration
resolves: "Will our Perspectives users struggle to switch?"
module: slice
use on: /slice/, /slice/features/, /platform/power-users/
source: /platform/power-users/
```

---

## Arc+

Arc+ inherits the Pulse quotes above (because Arc+ = Arc + Pulse). Prioritise the SCC *migrate live* quote and the Stockland *change tracking* quote on Arc+ pages, since they speak directly to the DevOps pillar.

When a dedicated Arc+ case study becomes available, add it here with `module: arc-plus`.

---

## Atmosphere

No public customer testimonial on the live site as of the framework creation date. Decision-stage quotes for Finance-owned / IT-trusted pipelines are the top priority to collect.

**Target objections to solve with new quotes:**
- "Can Finance really run this without IT?" → need a Finance-owned schedule story.
- "Is the data secure?" → need an IT quote confirming the no-data-stored / encrypted-in-transit story.
- "Does it scale to month-end?" → need a high-volume quote.

---

## PowerConnect

No public customer testimonial on the live site as of the framework creation date.

**Target objections to solve:**
- "Will the security model carry over correctly?" → need an IT / Administrator quote.
- "Is the connection actually live, or is it a scheduled extract?" → need a BI developer quote.

---

## Multi-module / brand-level

Quotes that speak to the Cubewise platform or team in general — not a specific component — go here. Use on the homepage closer, `/about/`, and `/contact/`.

*(None currently collected. Candidates when gathering: customer quotes that reference more than one component, or the Cubewise Care support experience specifically.)*

---

## Stage-to-page quick reference

Use this to route a quote fast:

| Stage | Most effective on | Objection shape |
|-------|-------------------|-----------------|
| Awareness | Homepage hero area, persona page heroes | "Is this real / serious?" (logos, count claims) |
| Consideration | Feature pages, persona pages, blog | "Does it solve my specific problem?" (outcome-specific quotes) |
| Decision | `/contact/`, pricing, download pages, bottom-CTA blocks | "Can I trust the vendor? Is implementation safe?" (risk-removal quotes, named senior titles) |

---

## When a new quote comes in

1. Add a new YAML block in the right product section.
2. Tag it with stage + resolves + module + use-on pages.
3. If the quote is from a named customer *with a named role at a named company*, prefer it over anonymous or company-only quotes — they are dramatically more persuasive.
4. If it mentions a number (time, count, percent), flag it — numbers beat adjectives.
5. Check `use on:` targets actually render it (testimonial sections, inline CTA blocks).
6. Update the live page to use the new quote — this file is the source, but the page has to consume it.
