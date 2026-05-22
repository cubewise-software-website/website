(function () {
  const ROTATE_MS = 6500
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function buildCarousel(root) {
    const slides = Array.from(root.children).filter(el => el.matches('[data-carousel-slide], .testimonial-card, .home-testimonial, .audience-testimonial'))
    if (slides.length < 2) return

    root.setAttribute('data-carousel-active', '')
    root.setAttribute('aria-roledescription', 'carousel')
    root.setAttribute('aria-live', 'polite')

    slides.forEach((s, i) => {
      s.setAttribute('data-carousel-slide', '')
      s.setAttribute('role', 'group')
      s.setAttribute('aria-roledescription', 'slide')
      s.setAttribute('aria-label', (i + 1) + ' of ' + slides.length)
      if (i !== 0) s.setAttribute('aria-hidden', 'true')
    })

    const controls = document.createElement('div')
    controls.className = 'carousel-controls'

    const prev = document.createElement('button')
    prev.type = 'button'
    prev.className = 'carousel-btn carousel-btn--prev'
    prev.setAttribute('aria-label', 'Previous testimonial')
    prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'

    const next = document.createElement('button')
    next.type = 'button'
    next.className = 'carousel-btn carousel-btn--next'
    next.setAttribute('aria-label', 'Next testimonial')
    next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'

    const dots = document.createElement('div')
    dots.className = 'carousel-dots'
    dots.setAttribute('role', 'tablist')

    slides.forEach((_, i) => {
      const dot = document.createElement('button')
      dot.type = 'button'
      dot.className = 'carousel-dot'
      dot.setAttribute('role', 'tab')
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1))
      if (i === 0) dot.setAttribute('aria-selected', 'true')
      dot.addEventListener('click', () => goTo(i, true))
      dots.appendChild(dot)
    })

    controls.appendChild(prev)
    controls.appendChild(dots)
    controls.appendChild(next)
    root.parentNode.insertBefore(controls, root.nextSibling)

    let index = 0
    let timer = null
    let paused = false

    function goTo(i, userTriggered) {
      const n = slides.length
      index = ((i % n) + n) % n
      slides.forEach((s, j) => {
        s.toggleAttribute('data-active', j === index)
        if (j === index) s.removeAttribute('aria-hidden')
        else s.setAttribute('aria-hidden', 'true')
      })
      dots.querySelectorAll('.carousel-dot').forEach((d, j) => {
        if (j === index) d.setAttribute('aria-selected', 'true')
        else d.removeAttribute('aria-selected')
      })
      if (userTriggered) restartTimer()
    }

    function tick() {
      if (!paused) goTo(index + 1)
    }

    function startTimer() {
      if (reducedMotion) return
      stopTimer()
      timer = setInterval(tick, ROTATE_MS)
    }

    function stopTimer() {
      if (timer) { clearInterval(timer); timer = null }
    }

    function restartTimer() {
      stopTimer()
      startTimer()
    }

    prev.addEventListener('click', () => goTo(index - 1, true))
    next.addEventListener('click', () => goTo(index + 1, true))

    root.addEventListener('mouseenter', () => { paused = true })
    root.addEventListener('mouseleave', () => { paused = false })
    root.addEventListener('focusin', () => { paused = true })
    root.addEventListener('focusout', () => { paused = false })

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopTimer()
      else startTimer()
    })

    slides[0].setAttribute('data-active', '')

    const setHeight = () => {
      let maxH = 0
      slides.forEach(s => { if (s.offsetHeight > maxH) maxH = s.offsetHeight })
      if (maxH) root.style.minHeight = maxH + 'px'
    }
    setHeight()
    window.addEventListener('resize', setHeight)

    startTimer()
  }

  function init() {
    document.querySelectorAll('[data-carousel="testimonial"]').forEach(buildCarousel)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
