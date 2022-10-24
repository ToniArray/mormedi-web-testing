import { useEffect } from 'react'

import Button from '../button/Button.jsx'

const closeCookies = () => {
  const cookiesLayer = document.querySelector('.cookies')

  if (!cookiesLayer) return false

  const isHidden = localStorage.hideCookiesLayer
  isHidden
    ? cookiesLayer.classList.add('is-hidden')
    : cookiesLayer.classList.remove('is-hidden')

  const button = cookiesLayer.querySelector('.buttonBorder')

  if (!button) return false

  const closeCookies = () => {
    cookiesLayer.classList.add('is-hidden')
    localStorage.setItem('hideCookiesLayer', true)
  }

  button.addEventListener('click', () => closeCookies())
  return button.removeEventListener('click', () => closeCookies())
}

const Cookies = () => {
  useEffect(() => {
    closeCookies()
  }, [])

  return (
    <div className="cookies is-hidden">
      <p className="cookies-text">
        We use cookies to improve your browsing experience. You consent to our
        cookies policy if you continue to use this website.
      </p>
      <Button text="Accept" />
    </div>
  )
}

export default Cookies
