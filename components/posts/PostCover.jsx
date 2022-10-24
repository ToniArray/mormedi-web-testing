import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Link from '../link/Link'

const PostCover = ({ isFull, title, intro, image, tags = [], to }) => {
  const classes = cx('postCover', { 'is-full': isFull })
  return (
    <div className={classes}>
      <Link classes="postCover-image" to={to}>
        <img src={image} alt="Post cover" />
      </Link>
      <div className="postCover-info">
        <h3 className="postCover-title">
          <Link to={to}>{title}</Link>
        </h3>
        <ul className="postCover-tags">
          {tags.map((tag, idx) => (
            <li key={tag.name}>
              <Link to={tag.href}>
                {tag.name}
                {idx === tags.length - 1 ? '' : ', '}
              </Link>
            </li>
          ))}
        </ul>
        <h4 className="postCover-intro">{intro}</h4>
      </div>
    </div>
  )
}

PostCover.propTypes = {
  isFull: PropTypes.bool,
  title: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  image: PropTypes.string,
}

export default PostCover
