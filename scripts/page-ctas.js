/**
 * Per-page Page CTA config, used by build.js to generate `{{pageCta}}` for each page.
 * Add a page path here to centralise its bottom CTA into a single partial.
 * Pages without an entry get an empty `{{pageCta}}` and keep any inline CTA.
 */
export const PAGE_CTAS = {
  '/arc/features/': {
    headingKey: 'arc-features.cta-heading',
    headingText: 'See Arc in action',
    bodyKey: 'arc-features.cta-body',
    bodyText: 'The fastest way to develop, manage, and debug TM1 — all in one tool.',
    primaryKey: 'arc-features.cta-demo',
    primaryText: 'Request a demo',
    primaryHref: '/contact/',
    secondaryKey: 'arc-features.cta-overview',
    secondaryText: 'Arc Overview',
    secondaryHref: '/arc/',
  },
  '/pulse/features/': {
    headingKey: 'pulse-features.cta-heading',
    headingText: 'See Pulse in action',
    bodyKey: 'pulse-features.cta-body',
    bodyText: 'Get a personalised demo of the features that matter most to your team.',
    primaryKey: 'pulse-features.cta-demo',
    primaryText: 'Request a demo',
    primaryHref: '/contact/',
    secondaryKey: 'pulse-features.cta-docs',
    secondaryText: 'Read the Docs',
    secondaryHref: '/docs/',
  },
  '/atmosphere/': {
    headingKey: 'atmosphere.cta-heading',
    headingText: 'Ready to bridge the gap in your financial data?',
    bodyKey: 'atmosphere.cta-body',
    bodyText: 'Stop manual exports and start making decisions with live, two-way data pipelines.',
    primaryKey: 'atmosphere.cta-demo',
    primaryText: 'Get a demo',
    primaryHref: '/contact/',
    secondaryKey: 'atmosphere.cta-docs',
    secondaryText: 'Read the Docs',
    secondaryHref: '/docs/',
  },
  '/arc/download/': {
    headingKey: 'arc-download.cta-heading',
    headingText: 'Need a team licence or have questions?',
    bodyKey: 'arc-download.cta-body',
    bodyText: 'Talk to us about volume licensing, enterprise deployments, or getting a guided walkthrough of Arc.',
    primaryKey: 'arc-download.cta-btn',
    primaryText: 'Get in touch',
    primaryHref: '/contact/',
  },
  '/pulse/download/': {
    headingKey: 'pulse-download.cta-heading',
    headingText: 'Not yet a Pulse customer?',
    bodyKey: 'pulse-download.cta-body',
    bodyText: 'Talk to us about getting Pulse set up for your IBM Planning Analytics environment.',
    primaryKey: 'pulse-download.cta-btn',
    primaryText: 'Get in touch',
    primaryHref: '/contact/',
  },
  '/slice/download/': {
    headingKey: 'slice-download.cta-heading',
    headingText: 'Need a team licence or have questions?',
    bodyKey: 'slice-download.cta-body',
    bodyText: 'Talk to us about volume licensing, enterprise deployments, or getting a guided walkthrough of Slice.',
    primaryKey: 'slice-download.cta-btn',
    primaryText: 'Get in touch',
    primaryHref: '/contact/',
  },
}

export function renderPageCta(cfg, partialTemplate, injectFn) {
  if (!cfg) return ''
  const secondaryButton = cfg.secondaryKey
    ? `<a href="${cfg.secondaryHref}" class="btn btn-secondary" data-i18n="${cfg.secondaryKey}">${cfg.secondaryText}</a>`
    : ''
  return injectFn(partialTemplate, { ...cfg, secondaryButton })
}
