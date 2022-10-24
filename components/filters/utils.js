const getFilters = () => document.querySelector('.filters')
const getModal = () => document.querySelector('.filtersModal')

export const toggle = () => {
  if (getFilters() && !getFilters().classList.contains('is-modal')) {
    const button = getFilters().querySelector('.filters-toggle')
    const handleClick = () =>
      getFilters().classList.contains('is-open')
        ? getFilters().classList.remove('is-open')
        : getFilters().classList.add('is-open')
    button.addEventListener('click', () => handleClick())
    return button.removeEventListener('click', () => handleClick())
  } else return false
}

export const toggleModal = () => {
  if (getFilters() && getFilters().classList.contains('is-modal')) {
    const overlay = getModal().querySelector('.filtersModal-overlay')
    const open = getModal().querySelector('.filtersModal-open')
    const close = getModal().querySelector('.filters-close')

    const openModal = () => getModal().classList.add('is-open')
    const closeModal = () => getModal().classList.remove('is-open')

    open.addEventListener('click', () => openModal())
    overlay.addEventListener('click', () => closeModal())
    close.addEventListener('click', () => closeModal())
    return () => {
      open.removeEventListener('click', () => openModal())
      overlay.removeEventListener('click', () => closeModal())
      close.removeEventListener('click', () => closeModal())
    }
  } else return false
}

export const toggleHide = () => {
  if (getModal()) {
    const sections = document.querySelectorAll('.snapSection')
    const toggle = () => {
      if (sections.length < 2) {
        return
      }

      const windowReference = window.innerHeight / 2
      const reference = sections[sections.length - 2]
      const bottom = reference.getBoundingClientRect().bottom

      bottom < windowReference / 2
        ? getModal().classList.add('is-hidden')
        : getModal().classList.remove('is-hidden')
    }
    toggle()
  } else return false
}
