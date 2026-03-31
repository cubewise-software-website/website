(function () {
  const input = document.querySelector('.docs-search-input')
  const resultsEl = document.querySelector('.docs-search-results')
  if (!input || !resultsEl) return

  const PRODUCT_DISPLAY = {
    'arc': 'Arc', 'arc-plus': 'Arc+', 'powerconnect': 'PowerConnect',
    'pulse': 'Pulse', 'slice': 'Slice',
  }
  const DOC_TYPE_DISPLAY = {
    'installation': 'Installation & Config', 'manual': 'User Manual',
  }

  let index = null
  let activeIdx = -1
  let debounceTimer = null

  function loadIndex() {
    if (index !== null) return Promise.resolve()
    return fetch('/assets/search-index.json')
      .then(r => r.json())
      .then(data => { index = data })
      .catch(() => { index = [] })
  }

  function score(entry, query) {
    const q = query.toLowerCase()
    const titleMatch = entry.title.toLowerCase().includes(q)
    const excerptMatch = entry.excerpt.toLowerCase().includes(q)
    if (titleMatch) return 2
    if (excerptMatch) return 1
    return 0
  }

  function renderResults(results) {
    activeIdx = -1
    if (!results.length) {
      resultsEl.classList.remove('is-open')
      return
    }
    resultsEl.innerHTML = results.map((r, i) => `
      <a class="docs-search-result" href="/docs/${r.slug}/" data-idx="${i}">
        <span class="docs-search-result-title">${r.title}</span>
        <span class="docs-search-result-meta">
          <span class="docs-search-badge">${PRODUCT_DISPLAY[r.product] ?? r.product}</span>
          <span class="docs-search-badge">${DOC_TYPE_DISPLAY[r.docType] ?? r.docType}</span>
        </span>
      </a>`).join('')
    resultsEl.classList.add('is-open')
  }

  function search(query) {
    if (!query.trim() || !index) { resultsEl.classList.remove('is-open'); return }
    const scored = index
      .map(e => ({ entry: e, score: score(e, query) }))
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(s => s.entry)
    renderResults(scored)
  }

  input.addEventListener('focus', () => {
    loadIndex().then(() => { if (input.value.trim()) search(input.value) })
  })

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => search(input.value), 150)
  })

  input.addEventListener('keydown', e => {
    const items = resultsEl.querySelectorAll('.docs-search-result')
    if (!items.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      activeIdx = Math.min(activeIdx + 1, items.length - 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      activeIdx = Math.max(activeIdx - 1, -1)
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      items[activeIdx].click()
      return
    } else if (e.key === 'Escape') {
      resultsEl.classList.remove('is-open')
      return
    }
    items.forEach((el, i) => el.classList.toggle('is-active', i === activeIdx))
  })

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !resultsEl.contains(e.target)) {
      resultsEl.classList.remove('is-open')
    }
  })
})()
