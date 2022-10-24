import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Link from '../link/Link'
import IconArrow from '../../public/icons/icon-arrow'

const ArrowLinkBig = forwardRef(({ text, title, to }, ref) => {
  return (
    <Link classes="arrowLinkBig" to={to} title={title} ref={ref}>
      <div className="arrowLinkBig-arrowContainer">
        <IconArrow classes="arrowLinkBig-arrow" />
      </div>
      <span className="arrowLinkBig-text">{text}</span>
    </Link>
  )
})

ArrowLinkBig.displayName = 'ArrowLinkBig'

ArrowLinkBig.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default ArrowLinkBig
