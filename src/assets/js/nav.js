const items = document.querySelectorAll('.nav-item-dropdown')
items.forEach(item => {
  let t
  const open = () => { clearTimeout(t); item.classList.add('is-open') }
  const close = () => { t = setTimeout(() => item.classList.remove('is-open'), 200) }
  item.addEventListener('mouseenter', open)
  item.addEventListener('mouseleave', close)
  const menu = item.querySelector('.nav-mega-menu')
  if (menu) {
    menu.addEventListener('mouseenter', open)
    menu.addEventListener('mouseleave', close)
  }
})
