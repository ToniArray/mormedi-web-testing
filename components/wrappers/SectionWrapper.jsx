import { forwardRef } from 'react'
import cx from 'classnames'

const SectionWrapper = (props, ref) => {
  const classes = cx('sectionWrapper', {
    'is-large': props.isLarge,
    'is-small': props.isSmall,
  })

  return (
    <div className={classes} ref={ref}>
      {props.children}
    </div>
  )
}

export default forwardRef(SectionWrapper)
