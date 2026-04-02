const backdrop = document.createElement('div')
backdrop.className = 'nav-backdrop'
document.body.appendChild(backdrop)

const header = document.querySelector('.site-header')
if (header) {
  document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px')
}

// ─── Desktop mega menu ────────────────────────────────────────
const items = document.querySelectorAll('.nav-item-dropdown')
items.forEach(item => {
  let t
  const open = () => {
    if (window.innerWidth <= 768) return
    clearTimeout(t)
    item.classList.add('is-open')
    backdrop.classList.add('is-visible')
  }
  const close = () => {
    if (window.innerWidth <= 768) return
    t = setTimeout(() => {
      item.classList.remove('is-open')
      backdrop.classList.remove('is-visible')
    }, 200)
  }
  item.addEventListener('mouseenter', open)
  item.addEventListener('mouseleave', close)
  const menu = item.querySelector('.nav-mega-menu')
  if (menu) {
    menu.addEventListener('mouseenter', open)
    menu.addEventListener('mouseleave', close)
  }
})

// ─── Mobile hamburger ─────────────────────────────────────────
const nav = document.querySelector('.nav')

const toggle = document.createElement('button')
toggle.className = 'nav-toggle'
toggle.setAttribute('aria-label', 'Toggle navigation')
toggle.setAttribute('aria-expanded', 'false')
toggle.innerHTML = `
  <svg class="nav-toggle-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
  <svg class="nav-toggle-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`

if (nav) nav.appendChild(toggle)

const openNav = () => {
  nav.classList.add('is-open')
  toggle.setAttribute('aria-expanded', 'true')
  document.body.style.overflow = 'hidden'
}

const closeNav = () => {
  nav.classList.remove('is-open')
  toggle.setAttribute('aria-expanded', 'false')
  document.body.style.overflow = ''
  items.forEach(item => item.classList.remove('is-open'))
  backdrop.classList.remove('is-visible')
}

toggle.addEventListener('click', () => {
  nav.classList.contains('is-open') ? closeNav() : openNav()
})

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNav()
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeNav()
})
