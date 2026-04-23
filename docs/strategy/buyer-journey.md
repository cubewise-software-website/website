---
name: Buyer journey
description: Awareness/Consideration/Decision stages — what buyers need at each stage and which pages serve them
type: strategy
---

# Buyer journey

Layer 2 — Strategy. The stages a Cubewise buyer moves through, and what each stage needs.

Pair this with `strategy/personas.md` (who is on this journey) and `brand/style-guide.md` (CTA copy rules per stage).

---

## Who is on this journey

Cubewise sells into IBM Planning Analytics / TM1 accounts. The buying group is typically 2–4 people:

- **Technical evaluator.** TM1 Developer, Consultant, or Administrator. Will actually use Arc / Arc+ / Pulse day to day.
- **Budget holder.** Finance Systems Manager, FP&A Lead, Head of Finance, or (in larger orgs) IT Director.
- **End user sponsor.** FP&A Analyst or Finance Lead who is frustrated with Excel/Perspectives and will benefit from Slice, PowerConnect or Atmosphere.

The technical evaluator almost always discovers Cubewise first (via the TM1 Forum, a conference, peer recommendation, or an LLM query). They drive the process internally.

---

## The three stages

| Stage | Question in the buyer's head | Cubewise page that serves it |
|-------|------------------------------|------------------------------|
| **Awareness** | "Is there anything better than what I'm using?" | Homepage, `/platform/`, product overview (`/arc/`, `/pulse/` etc.) |
| **Consideration** | "Does this actually solve *my* problem?" | Feature pages, persona pages, customer stories, `/blog/`, docs |
| **Decision** | "Is this worth the budget / approval / install?" | `/contact/`, `/arc/download/`, `/pricing/`, `/deployment/` |

---

## Awareness

**Buyer mindset.** Has a problem — user locks, slow deployments, Excel report rebuilds, data-pipeline pain. Doesn't know Cubewise. May have searched "TM1 monitoring tool" or asked Claude/GPT "best alternatives to Perspectives."

**Information scent they're following.** The search term or LLM recommendation that brought them here. The landing page must match that scent in its H1 and first paragraph.

**What they need on the page.**
- A clear statement of what the product *is*, in the first five seconds.
- Proof it's made for TM1 specifically, not a generic tool — specificity is trust.
- A visual (screenshot or GIF) that makes the value obvious without reading.
- One low-commitment next step. Not a demo. A download, a product tour, or a deeper read.

**What they do NOT need.**
- Pricing. They have no budget authority yet.
- A contact form. They're nowhere near talking to someone.
- A 2,000-word manifesto.

**CTA at this stage:** *See how it works · Explore the Platform · Download Arc Free · Watch the overview.*

**Social proof at this stage:** broad trust signals. Logos of well-known customers. Total install counts. "Trusted by TM1 teams worldwide."

---

## Consideration

**Buyer mindset.** Interested. Narrowing the shortlist. Needs to answer specific objections: will this work with my TM1 version? My deployment (on-prem / IBM PA SaaS / cloud)? My team's skill level? How much upheaval is it?

**What they need on the page.**
- Features in benefit language. "Debug TI line by line" beats "advanced debugging."
- Persona-matched hooks (see `strategy/personas.md`). A Developer and a Finance Lead need different proof.
- Customer stories in their industry or of their size.
- Comparison content — vs. their current state, not vs. competitors by name. The "Without / With" table on `/atmosphere/` is the pattern.
- Screenshots and GIFs. Every feature row on Arc, Pulse and Slice has one — for a reason.
- Docs that exist *before* they ask ("Read the Docs" is already a link on the hero).

**What they do NOT need (yet).**
- Pressure to book a demo. They'll self-serve if you let them.
- A contract.

**CTA at this stage:** *Watch a 2-min demo · See all features · Read customer stories · Explore [Product] features · Download Arc Free.*

**Social proof at this stage:** specific, detailed. A quote that names the outcome ("reduced user locks," "migrate live without bringing services down," "virtually no learning curve from Perspectives"). Use `content/social-proof.md` tags to match stage.

---

## Decision

**Buyer mindset.** Convinced the product works. Now evaluating cost, implementation, risk, and support. Needs to sell it internally.

**What they need on the page.**
- A clear path to pricing or quote — even if pricing is "contact us" (be honest about why).
- Deployment clarity: Self-Hosted vs. Cubewise Cloud. The trade-offs, side by side.
- Risk reversal: free trials (Arc has 90 days), documentation, the Cubewise Care support portal, forum activity.
- Proof of post-sale experience: testimonials that mention *the company*, not just the product. "Cubewise delivered" matters here more than "the software is great."
- An easy way to talk to a human. `/contact/` should get the buyer to a named TM1 specialist, not a lead-capture form.
- An installation or onboarding path that's not intimidating.

**What they do NOT need.**
- More feature depth. They're past that.
- Another blog post.

**CTA at this stage:** *Request a demo · Talk to us · Get in touch · Start a trial · Request pricing.*

**Social proof at this stage:** risk-removal quotes. "We went live in a week." "Support has been excellent." "Implementation was smooth." Named, senior-title where possible.

---

## How the site moves buyers through the stages

| From | To | Mechanism |
|------|-----|-----------|
| Homepage (Awareness) | Product page (Consideration) | Six product cards, each with a benefit-led tagline. |
| Product overview (Consideration) | Features page (deeper Consideration) | "See all features" link; feature rows with visuals. |
| Product overview (Consideration) | Customer stories (Decision prep) | "Read customer stories" in testimonial block. |
| Features / Customer stories (Consideration → Decision) | Contact (Decision) | "Get a demo" / "Talk to us" — secondary CTA already on the page. |
| Persona page (Consideration) | Two or three product pages | Product cards within the persona page route sideways. |
| Arc / Slice (any stage) | Download page (Decision, low-commitment) | Download is free — no gate — which short-circuits normal B2B friction. |

---

## The anti-pattern to avoid

**Don't put a Decision-stage CTA on an Awareness page.**

A visitor who just landed from a search for "TM1 debugger" is not ready to "Book a demo." Asking them to converts worse than offering "See how Arc debugs TI" and getting them into the product.

Match CTA commitment to the page's place in the journey. Full CTA rules live in `brand/style-guide.md`.

---

## Free trials as a strategic shortcut

Arc's free 90-day trial with no credit card and no contact details is a deliberate journey-compression move. It collapses Awareness → Consideration → Decision into a single download for individual developers. The buyer uses it, loves it, and becomes the internal champion for Arc+, Pulse, Slice, etc.

Every product page should honour this: Arc → "Download Arc Free" in the hero. Don't bury it behind a contact form.
