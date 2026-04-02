# Cubewise Website — Claude Instructions

> **Brand guidelines:** [`docs/brand-guidelines.md`](docs/brand-guidelines.md) — read this for colors, typography, button variants, and voice & tone before doing any design or copy work.

## Design Rules

### Icons

Always use inline SVG icons with the following attributes — never emojis or icon fonts:

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="1.75"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- paths -->
</svg>
```

Wrap in a container div styled with `color: var(--sand-gold)` so the icon inherits the brand colour via `currentColor`. Use 24×24 for list/card contexts and 32×32 for hero/role-card contexts.

## Writing Rules

- Never use the word "tools" when referring to Cubewise products (Arc, Arc+, Pulse, Slice, Atmosphere, PowerConnect). Use "software" or "components" instead.
