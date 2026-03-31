(function () {
  const tocEl = document.getElementById('docs-toc')
  if (!tocEl) return

  const content = document.querySelector('.docs-content')
  if (!content) return

  const headings = [...content.querySelectorAll('h2, h3')]
  if (headings.length < 2) { tocEl.style.display = 'none'; return }

  let idCounter = 0
  const items = headings.map(h => {
    if (!h.id) { h.id = 'toc-' + (++idCounter) }
    return `<li class="toc-${h.tagName.toLowerCase()}">
      <a href="#${h.id}">${h.textContent}</a>
    </li>`
  }).join('\n')

  const ul = document.createElement('ul')
  ul.innerHTML = items
  tocEl.appendChild(ul)
})()
