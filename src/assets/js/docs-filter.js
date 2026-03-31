(function () {
  const productRow = document.getElementById('filter-product')
  const typeRow = document.getElementById('filter-type')
  if (!productRow || !typeRow) return

  let activeProduct = 'all'
  let activeType = 'all'

  function applyFilters() {
    document.querySelectorAll('.sidebar-product').forEach(productEl => {
      const product = productEl.dataset.product
      const productMatch = activeProduct === 'all' || product === activeProduct
      productEl.querySelectorAll('.sidebar-group').forEach(groupEl => {
        const docType = groupEl.dataset.docType
        const typeMatch = activeType === 'all' || docType === activeType
        groupEl.style.display = productMatch && typeMatch ? '' : 'none'
      })
      const anyVisible = [...productEl.querySelectorAll('.sidebar-group')]
        .some(g => g.style.display !== 'none')
      productEl.style.display = anyVisible ? '' : 'none'
    })
  }

  productRow.addEventListener('click', e => {
    const pill = e.target.closest('.filter-pill[data-filter-product]')
    if (!pill) return
    productRow.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'))
    pill.classList.add('active')
    activeProduct = pill.dataset.filterProduct
    applyFilters()
  })

  typeRow.addEventListener('click', e => {
    const pill = e.target.closest('.filter-pill[data-filter-type]')
    if (!pill) return
    typeRow.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'))
    pill.classList.add('active')
    activeType = pill.dataset.filterType
    applyFilters()
  })

  // Highlight active page link
  const currentPath = window.location.pathname.replace(/\/?$/, '/')
  document.querySelectorAll('.sidebar-product a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/?$/, '/')
    if (href === currentPath) {
      a.classList.add('active')
      // Auto-filter to this page's product+type
      const product = a.dataset.product
      const docType = a.dataset.docType
      if (product) {
        const productPill = productRow.querySelector(`[data-filter-product="${product}"]`)
        if (productPill) { productPill.click() }
      }
      if (docType) {
        const typePill = typeRow.querySelector(`[data-filter-type="${docType}"]`)
        if (typePill) { typePill.click() }
      }
    }
  })
})()
