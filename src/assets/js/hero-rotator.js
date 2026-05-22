(function () {
  const ROTATE_MS = 3800
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function init() {
    if (reducedMotion) return
    document.querySelectorAll('[data-rotator]').forEach(setup)
  }

  function setup(root) {
    const items = root.querySelectorAll('[data-rotator-item]')
    if (items.length < 2) return

    let index = 0
    items.forEach((el, i) => {
      el.style.opacity = i === 0 ? '1' : '0'
    })
    root.setAttribute('data-rotator-active', '')

    setInterval(() => {
      items[index].style.opacity = '0'
      index = (index + 1) % items.length
      items[index].style.opacity = '1'
    }, ROTATE_MS)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
