const backdrop = document.createElement('div')
backdrop.className = 'nav-backdrop'
document.body.appendChild(backdrop)

const header = document.querySelector('.site-header')
if (header) {
  document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px')
}

const items = document.querySelectorAll('.nav-item-dropdown')
items.forEach(item => {
  let t
  const open = () => {
    clearTimeout(t)
    item.classList.add('is-open')
    backdrop.classList.add('is-visible')
  }
  const close = () => {
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
