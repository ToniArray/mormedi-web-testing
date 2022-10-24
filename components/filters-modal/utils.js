const getFilters = () => document.querySelector('.filters')
const getModal = () => document.querySelector('.filtersModal')

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
