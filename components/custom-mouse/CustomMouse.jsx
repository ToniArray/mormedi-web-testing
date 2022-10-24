import { useEffect, useRef } from 'react'

import useMobileDetect from '../../hooks/useMobileDetect'

import IconChevron from '../../public/icons/icon-chevron'

const getMouse = () => document.querySelector('.mouse')

const appear = () =>
  getMouse() ? getMouse().classList.remove('is-hidden') : false

const CustomMouse = () => {
  const isMobile = useMobileDetect()

  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current

    if (!element || isMobile) {
      return
    }

    const move = event => {
      const posX = event.clientX
      const posY = event.clientY
      element.style.transform = `translateX(calc(${posX}px - 50%)) translateY(calc(${posY}px - 50%))`
    }

    const hover = event => {
      if (!event.target.parentNode.parentNode) {
        return
      }

      const condition01 =
        event.target.tagName === 'BUTTON' ||
        event.target.tagName === 'A' ||
        event.target.tagName === 'VIDEO' ||
        event.target.tagName === 'SELECT'
      const condition02 =
        event.target.parentNode.parentNode.classList.contains('splide__slide')
      if (condition01 && !condition02) {
        element.classList.remove('is-drag')
        element.classList.add('is-hover')
      } else if (condition02) {
        element.classList.remove('is-hover')
        element.classList.add('is-drag')
      } else {
        element.classList.remove('is-hover')
        element.classList.remove('is-drag')
      }
    }

    document.addEventListener('mousemove', event => {
      appear()
      move(event)
      hover(event)
    })
    return document.removeEventListener('mousemove', event => {
      appear()
      move(event)
      hover(event)
    })
  }, [isMobile])

  return isMobile ? (
    <></>
  ) : (
    <div className="mouse is-hidden" ref={ref}>
      <IconChevron />
      <IconChevron />
    </div>
  )
}

export default CustomMouse
