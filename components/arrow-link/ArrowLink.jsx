import { forwardRef } from 'react'
import PropTypes from 'prop-types'

import Link from '../link/Link'

import IconArrow from '../../public/icons/icon-arrow'
import IconArrowLong from '../../public/icons/icon-arrow-long'

const ArrowLink = forwardRef(({ text, title, to }, ref) => {
  return (
    <Link classes="arrowLink" to={to} title={title} ref={ref}>
      <IconArrowLong classes="arrowLink-arrowLong" />
      <span className="arrowLink-text">{text}</span>
      <IconArrow classes="arrowLink-arrow" />
    </Link>
  )
})

ArrowLink.displayName = 'ArrowLink'

ArrowLink.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default ArrowLink
