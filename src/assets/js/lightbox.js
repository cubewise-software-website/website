(function () {
  const overlay = document.createElement('div')
  overlay.className = 'lightbox-overlay'
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <img class="lightbox-img" src="" alt="">
  `
  document.body.appendChild(overlay)

  const img = overlay.querySelector('.lightbox-img')
  const closeBtn = overlay.querySelector('.lightbox-close')

  function open(src, alt) {
    img.src = src
    img.alt = alt || ''
    overlay.classList.add('is-open')
    document.body.classList.add('lightbox-open')
  }

  function close() {
    overlay.classList.remove('is-open')
    document.body.classList.remove('lightbox-open')
    img.src = ''
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close()
  })
  closeBtn.addEventListener('click', close)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close()
  })

  document.querySelectorAll('img[src$=".gif"]').forEach(function (el) {
    el.classList.add('is-lightbox')
    el.addEventListener('click', function () {
      open(el.src, el.alt)
    })
  })
})()
