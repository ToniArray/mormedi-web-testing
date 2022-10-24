import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const SnapSection = ({ isEnd, isNegative, children }) => {
  const classes = cx('snapSection', {
    'has-negative': isNegative,
    'is-end': isEnd,
  })
  return <div className={classes}>{children}</div>
}

SnapSection.propTypes = {
  isNegative: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default SnapSection
