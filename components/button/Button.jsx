import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Link from '../link/Link'

import IconArrowRight from '../../public/icons/icon-arrow-right'

const Button = ({ isLink, text, ...others }) => {
  const buttonRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const handleHover = (line, width, total) => {
      line.style.strokeDasharray = `${width - 50}, ${total - 50}`
      line.style.strokeDashoffset = `${width + (width - 50) - 25}`
    }

    const width = buttonRef.current.clientWidth
    const height = buttonRef.current.clientHeight
    const total = width * 2 + height * 2

    lineRef.current.style.strokeDasharray = `${total}, 0`

    buttonRef.current.addEventListener('mouseenter', () =>
      handleHover(lineRef.current, width, total),
    )
    buttonRef.current.addEventListener('mouseleave', () => {
      lineRef.current.style.strokeDasharray = `${total}, 0`
      lineRef.current.style.strokeDashoffset = '0'
    })
  }, [text])

  return isLink ? (
    <Link
      classes="buttonBorder is-link"
      to={isLink}
      title={text}
      ref={buttonRef}
    >
      <svg className="buttonBorder-line" height="50">
        <rect fill="none" ref={lineRef} />
      </svg>
      <span>{text}</span>
      <IconArrowRight classes="buttonBorder-arrow" />
    </Link>
  ) : (
    <button
      className="buttonBorder"
      aria-label={text}
      {...others}
      ref={buttonRef}
    >
      <svg className="buttonBorder-line" height="50">
        <rect fill="none" ref={lineRef} />
      </svg>
      <span>{text}</span>
      <IconArrowRight classes="buttonBorder-arrow" />
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.node.isRequired,
}

export default Button
