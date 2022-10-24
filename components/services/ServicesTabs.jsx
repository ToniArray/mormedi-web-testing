import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import showdown from 'showdown'

const ServicesTabs = ({ buttons, descriptions }) => {
  const [activeItem, setActiveItem] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  const converter = new showdown.Converter()

  const changeChildren = useCallback(index => {
    setIsChanging(true)

    setTimeout(() => {
      setActiveItem(index)
      setIsChanging(false)
    }, 400)
  }, [])

  return (
    <div className="servicesTabs">
      <div className="servicesTabs-buttons">
        {buttons.map((button, index) => (
          <button
            className={cx('servicesTabs-button', {
              'is-active': index === activeItem,
            })}
            onClick={() => changeChildren(index)}
            key={index}
          >
            {button}
          </button>
        ))}
      </div>
      <div
        className={cx('servicesTabs-descriptions', {
          'is-changing': isChanging,
        })}
      >
        {descriptions.map((description, index) => (
          <div
            className={cx('servicesTabs-description', {
              'is-active': index === activeItem,
            })}
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(description),
            }}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  )
}

ServicesTabs.propTypes = {
  buttons: PropTypes.array.isRequired,
  descriptions: PropTypes.array.isRequired,
}

export default ServicesTabs
