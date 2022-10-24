import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const Input = ({
  error,
  errorMessage,
  type,
  name,
  id,
  placeholder,
  required,
  ...props
}) => {
  const classes = cx(
    'field',
    { 'is-required': required },
    { 'has-error': error },
  )
  return (
    <div className={classes}>
      <input
        type="text"
        name={name}
        id={id ? id : name}
        required={required}
        placeholder={placeholder}
        spellCheck="false"
        {...props}
      />
      <label>{placeholder}</label>
      <span className="error">{errorMessage}</span>
    </div>
  )
}

Input.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
}

export default Input
