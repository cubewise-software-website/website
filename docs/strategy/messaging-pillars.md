---
name: Messaging pillars
description: The 3-4 core messages Cubewise repeats across every page, with proof points
type: strategy
---

# Messaging pillars

Layer 2 — Strategy. The handful of messages Cubewise keeps repeating so a buyer hears them in every channel.

A pillar is not a tagline. It's a claim we make, proof that backs it, and the emotional payoff the buyer takes away. Use these when drafting any page to check: "am I laddering back to a pillar, or wandering?"

---

## Pillar 1 — Built for TM1, by TM1 people

**Claim.** Cubewise is not a generic planning platform that added TM1 support. It is the only platform purpose-built for IBM Planning Analytics / TM1, by people who have spent their careers inside it.

**Why the buyer cares.** TM1 is idiosyncratic. A generic tool will get 70% right and miss the 30% that matters — DBRW, hierarchies, rules, chores, TI — and the team will end up with workarounds. Specialists do not.

**Proof points — use these on any page.**
- "Six specialised software for IBM Planning Analytics — built by TM1 experts."
- Arc's hero: *"Boost your TM1 developments without compromising on quality."*
- Slice is the modern successor to Perspectives — zero learning curve (Wei Wang quote).
- "IBM Planning Analytics / TM1 specialists" in the footer of every page.

**Emotional payoff.** *"Finally, someone who gets it."*

**How to use this pillar.**
- Lead the homepage hero. The platform page. The about page.
- Bring back when a feature page risks sounding generic — ground it in a TM1-specific pain (e.g. "no more DBRW array-formula hell").

---

## Pillar 2 — One platform, built to work together

**Claim.** Arc, Arc+, Pulse, Slice, Atmosphere and PowerConnect are not six standalone products bolted into a suite. They are a coherent platform, with Arc as the hub and every other component connecting through it.

**Why the buyer cares.** Buyers have been burned by "suites" that are really acquisitions glued together. The Cubewise platform is engineered to integrate — Arc+ is literally Arc integrated with Pulse. Atmosphere feeds Arc. Slice surfaces TM1 from the Excel side. Each component makes the others more valuable.

**Proof points.**
- Platform page: *"Arc is the central hub. Every other component extends Arc's capabilities, integrates with it to surface data and insights, or connects your existing systems to it."*
- Arc+ explicitly defined as "Arc connected to Pulse" on `/platform/`.
- Platform hero benefits: Build faster → Operate with confidence → Connect everything. A narrative, not a catalogue.
- Six products sharing one brand, one nav, one voice.

**Emotional payoff.** *"I'm buying a system, not a pile of parts."*

**How to use this pillar.**
- Anywhere a visitor might worry about product sprawl or overlap.
- The platform page, the hub-and-spoke diagram, cross-links between product pages.
- When a persona page shows multiple products — explain why they belong together.

---

## Pillar 3 — The DevOps way for IBM PA

**Claim.** Cubewise brings modern software-engineering discipline — version control, testing, impact analysis, deployment pipelines, rollback — to a platform that historically never had them.

**Why the buyer cares.** TM1 teams in 2026 are expected to ship changes like any other software team: fast, safe, with a paper trail. The default TM1 tooling doesn't support any of that. Cubewise does. This is the single strongest argument for Arc+.

**Proof points.**
- Arc+ tagline: *"DevOps for IBM Planning Analytics."*
- Arc+ hero: *"Plan. Build. Test. Migrate. Operate. Support."* — the six stages of a DevOps lifecycle, claimed explicitly.
- Arc+ features: impact analysis, automated unit testing, best-practice rules, deployment packages, migration logs, rollback, live monitoring.
- Pulse: migrate to production live, no downtime. Change tracking. Separation of duties between TM1 team and IT.
- "The DevOps Way" is the team motto (see `brand-guidelines.md`: *"This is the way"* — Mandalorian reference).

**Emotional payoff.** *"We can finally ship TM1 changes like a proper team — not like it's 1998."*

**How to use this pillar.**
- Arc+ page (obviously). Developer and Administrator persona pages. Pulse migration sections.
- Anywhere the buyer is a senior technical decision-maker evaluating governance or compliance.
- Blog posts framing Cubewise as an evolution of TM1 engineering practice.

---

## Pillar 4 — Finance-owned, IT-trusted

**Claim.** Cubewise components that serve Finance — Slice, Atmosphere, PowerConnect — let Finance move at Finance's pace, without forcing IT to take on the risk. Finance owns the workflow; IT keeps the controls.

**Why the buyer cares.** The oldest fight in enterprise software is Finance wanting speed, IT wanting control. Cubewise's Finance-side components resolve it structurally: self-service pipelines, Excel-native reporting, Power BI connectors — all respecting the existing IBM PA security model, all encrypted, with nothing stored where it shouldn't be.

**Proof points.**
- Atmosphere banner: *"Owned by Finance. Trusted by IT. Encrypted in-transit. No data stored. Enterprise-grade access controls."*
- Atmosphere: *"Finance-owned schedules that eliminate IT backlog."*
- PowerConnect: *"Integrates with your existing IBM Planning Analytics security model — users only see the data they're entitled to."*
- Slice: no separate security model — uses TM1's.
- Power Users persona page: *"Connect any source. No IT ticket."*

**Emotional payoff.** *"I can get my job done. And no one is going to get fired."*

**How to use this pillar.**
- Power Users persona page. Atmosphere, Slice, PowerConnect product pages.
- Whenever Finance buyers may be worried about IT pushback.
- In risk-reversal copy on decision-stage pages.

---

## Ladder check: a worked example

Suppose you are drafting a Pulse feature card for the Administrator persona. You write:

> *"Real-time notifications for user locks and chore failures."*

Good — but it's pillar-free. Let it ladder to Pillar 3 (DevOps way) by adding:

> *"Know about the lock before your users do — and migrate the fix live, no downtime."*

Now the card has:
- A specific capability (pillar 3 proof — "migrate live, no downtime")
- A benefit in the buyer's voice ("before your users do")
- An emotional payoff ("we can ship fixes like a proper team")

This is the test: can you name which pillar each section of a page is supporting?

---

## When pillars collide

Sometimes two pillars fit on the same page. The rule:

- **One pillar leads** — the H1 and hero paragraph.
- **One or two support** — body sections and feature cards.
- **Others sit quietly** — footer CTA, adjacent pages.

Example — the homepage:
- Pillar 1 leads (*"Everything your TM1 team needs. In one platform. Built by TM1 experts."*).
- Pillar 2 supports (*"One platform. Six powerful components."*).
- Pillars 3 and 4 appear in the role cards and testimonials, respectively.

Example — `/atmosphere/`:
- Pillar 4 leads (*"Owned by Finance. Trusted by IT."*).
- Pillar 2 supports (the platform-integration hub-and-spoke context).
- Pillar 1 is implicit (the product exists because Finance teams using TM1 needed it).
