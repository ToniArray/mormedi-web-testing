import React from 'react'
import PropTypes from 'prop-types'

const User = ({ image, name, role, url }) => {
  return (
    <a className="user" href={url} target="_blank" rel="noopener noreferrer">
      <div className="user-avatar">
        <div className="user-avatar-wrapper">
          <img src={image} alt={name} />
        </div>
        <img
          className="user-avatar-icon"
          src="/images/linkedin.png"
          alt={name}
        />
      </div>
      <div className="user-data">
        <p className="user-name">{name}</p>
        <p className="user-role">{role}</p>
      </div>
    </a>
  )
}

User.propTypes = {
  image: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default User
