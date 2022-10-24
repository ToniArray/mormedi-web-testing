import React from 'react'

import useTranslations from '../../config/i18n/useTranslations'

const SubscribeCheckbox = ({ checked, onChange }) => {
  const t = useTranslations()

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id="subscribe-newsletter"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="subscribe-newsletter">{t('contact:newletter')}</label>
    </div>
  )
}

export default SubscribeCheckbox
