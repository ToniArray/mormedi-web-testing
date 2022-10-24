import PropTypes from 'prop-types'
import cx from 'classnames'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

const MainWrapper = ({ children }) => {
  const { isLock, isSnap, mainWrapperRef } = useMainWrapper()
  const classes = cx('mainWrapper', { 'is-lock': isLock, 'is-snap': isSnap })

  return (
    <div className={classes} ref={mainWrapperRef}>
      {children}
    </div>
  )
}

MainWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainWrapper
