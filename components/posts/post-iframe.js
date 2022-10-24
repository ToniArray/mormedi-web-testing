const getIframe = () => document.querySelector('.postIframe')
let redirecting = false
const redirect = () => {
  if (!getIframe()) return false

  const reference = getIframe().getBoundingClientRect().bottom - 10
  const url = getIframe().getAttribute('src')
  const overlay = document.querySelector('.mainOverlay')

  if (reference <= window.innerHeight && !redirecting) {
    redirecting = true
    overlay.classList.remove('is-hidden')
    setTimeout(() => window.location.assign(url), 800)
  }
}

export default {
  redirect,
}
