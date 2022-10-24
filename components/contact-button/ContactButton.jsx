import React from 'react'
import IconEmailCircle from '../../public/icons/icon-email-circle'
import IconEnvelop from '../../public/icons/icon-envelop'

const ContactButton = () => {
  return (
    <a className="contactButton" href="mailto:hi@mormedi.com" title="email">
      <div className="contactButton-circle">
        <IconEmailCircle />
      </div>
      <IconEnvelop />
    </a>
  )
}

export default ContactButton
