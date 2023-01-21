import { forwardRef } from 'react'
import cx from 'classnames'

import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'

const Link = (props, ref) => {
  const router = useRouter()
  const classes = cx(props.classes, {
    'is-disabled': router.pathname === props.to,
  })

  return (
    <NextLink
      href={props.to}
      className={classes}
      onClick={props.handleClick ? props.handleClick : undefined}
      title={props.title}
      ref={ref}
    >
      {props.children}
    </NextLink>
  )
}

export default forwardRef(Link)
