import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import SectionWrapper from '../wrappers/SectionWrapper'

import IconClose from '../../public/icons/icon-close'
import IconArrow from '../../public/icons/icon-arrow'
import IconArrowLink from '../../public/icons/icon-arrow-link'

const AboutModal = ({
  isChanging,
  children,
  person = {},
  isOpen,
  onClose,
  onNext,
  onPrevious,
}) => {
  const classes = cx('aboutModal', {
    'is-changing': isChanging,
    'is-open': isOpen,
  })

  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [closeRef, person])

  const { name, role, placeOfOrigin, picture, linkedIn } = person

  return (
    <div className={classes}>
      <SectionWrapper>
        <button className="aboutModal-close" onClick={onClose} ref={closeRef}>
          <IconClose />
        </button>
        <div className="aboutModal-info">
          <div className="aboutModal-wrapper">
            <h5 className="aboutModal-name">{name}</h5>
            <p className="aboutModal-rol">{role}</p>
            <p className="aboutModal-place">{placeOfOrigin}</p>
          </div>
          <div className="aboutModal-wrapper">
            <img src={picture.url} alt="" />
            {children}
            {linkedIn ? (
              <a
                href={linkedIn}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
              >
                View on{' '}
                <span>
                  LinkedIn
                  <IconArrowLink />
                </span>
              </a>
            ) : null}
          </div>
        </div>
        <div className="aboutModal-controls">
          <button
            className="aboutModal-arrow is-prev"
            onClick={() => onPrevious(person)}
          >
            <IconArrow />
          </button>
          <button
            className="aboutModal-arrow is-next"
            onClick={() => onNext(person)}
          >
            <IconArrow />
          </button>
        </div>
      </SectionWrapper>
    </div>
  )
}

AboutModal.propTypes = {
  isChanging: PropTypes.bool,
  children: PropTypes.node.isRequired,
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    placeOfOrigin: PropTypes.string.isRequired,
    picture: PropTypes.shape({ url: PropTypes.string.isRequired }),
    linkedIn: PropTypes.string,
  }),
}

export default AboutModal
