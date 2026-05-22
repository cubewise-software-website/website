(function () {
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const DURATION = 1800

  function animate(el) {
    const target = parseFloat(el.dataset.countTarget)
    if (!isFinite(target)) return
    const suffix = el.dataset.countSuffix || ''
    const prefix = el.dataset.countPrefix || ''

    if (reducedMotion) {
      el.textContent = prefix + target + suffix
      return
    }

    const start = performance.now()
    const step = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = prefix + Math.round(eased * target) + suffix
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  function init() {
    const els = document.querySelectorAll('[data-count-target]')
    if (!els.length) return

    if (!('IntersectionObserver' in window)) {
      els.forEach(animate)
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.4 })

    els.forEach(el => observer.observe(el))
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
