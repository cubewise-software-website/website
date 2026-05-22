(function () {
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function init() {
    const targets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]')
    if (!targets.length) return

    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.setAttribute('data-revealed', ''))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target
          const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10)
          if (delay > 0) {
            setTimeout(() => el.setAttribute('data-revealed', ''), delay)
          } else {
            el.setAttribute('data-revealed', '')
          }
          observer.unobserve(el)
        }
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })

    targets.forEach(el => observer.observe(el))
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
