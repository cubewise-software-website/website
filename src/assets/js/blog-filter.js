(function () {
  const container = document.getElementById('blog-filter-pills')
  if (!container) return

  const LABEL_DISPLAY = {
    'arc': 'Arc',
    'arc-plus': 'Arc+',
    'pulse': 'Pulse',
    'slice': 'Slice',
    'atmosphere': 'Atmosphere',
    'powerconnect': 'PowerConnect',
  }

  function displayName(slug) {
    return LABEL_DISPLAY[slug] ?? (slug.charAt(0).toUpperCase() + slug.slice(1))
  }

  // Collect unique label slugs from all post cards
  const slugSet = new Set()
  document.querySelectorAll('.post-card[data-labels]').forEach(function (card) {
    const raw = card.dataset.labels.trim()
    if (raw) raw.split(' ').forEach(function (s) { if (s) slugSet.add(s) })
  })

  if (slugSet.size === 0) return

  // Sort slugs alphabetically by display name
  const slugs = [...slugSet].sort(function (a, b) {
    return displayName(a).localeCompare(displayName(b))
  })

  // Build pill HTML: "All" first, then one per label
  const pillsHtml = ['<button class="filter-pill active" data-filter="all">All</button>']
    .concat(slugs.map(function (slug) {
      return `<button class="filter-pill" data-filter="${slug}">${displayName(slug)}</button>`
    }))
    .join('')
  container.innerHTML = pillsHtml

  let active = 'all'

  container.addEventListener('click', function (e) {
    const pill = e.target.closest('.filter-pill[data-filter]')
    if (!pill) return
    active = pill.dataset.filter
    container.querySelectorAll('.filter-pill').forEach(function (p) { p.classList.remove('active') })
    pill.classList.add('active')
    document.querySelectorAll('.post-card').forEach(function (card) {
      if (active === 'all') {
        card.style.display = ''
      } else {
        const cardLabels = card.dataset.labels ? card.dataset.labels.split(' ') : []
        card.style.display = cardLabels.includes(active) ? '' : 'none'
      }
    })
  })
})()
