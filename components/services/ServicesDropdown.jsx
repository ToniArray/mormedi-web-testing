import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import showdown from 'showdown'

const ServicesDropdown = ({ isOpen, buttonText, buttonClick, description }) => {
  const descriptionRef = useRef(null)
  const [descriptionHeight, setDescriptionHeight] = useState('auto')
  const classes = cx('servicesDropdown', { 'is-open': isOpen })
  const converter = new showdown.Converter()

  useEffect(() => {
    const ref = descriptionRef.current
    if (!ref) return

    const changeHeight = () => setDescriptionHeight(`${ref.clientHeight}px`)

    window.addEventListener('resize', () => changeHeight())
    return window.removeEventListener('resize', () => changeHeight())
  }, [descriptionRef])

  return (
    <div className={classes}>
      <button className="servicesDropdown-button" onClick={buttonClick}>
        {buttonText}
      </button>
      <div
        className="servicesDropdown-container"
        style={{ height: descriptionHeight }}
      >
        <div
          className="servicesDropdown-description"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(description),
          }}
          ref={descriptionRef}
        ></div>
      </div>
    </div>
  )
}

ServicesDropdown.propTypes = {
  isOpen: PropTypes.bool,
  buttonClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default ServicesDropdown
