import React from 'react'

import useTranslations from '../../config/i18n/useTranslations'

const PolicyAgreeCheckbox = ({ name, id }) => {
  const t = useTranslations()

  return (
    <div className="checkbox">
      <input
        required
        type="checkbox"
        id={id}
        name={name ? name : id}
        value={name ? name : id}
      />
      <label htmlFor={id}>
        {t('contact:accept-mormedi')}{' '}
        <a href="/legal" target="_blank" rel="noopener">
          {t('contact:privacy-policy')}
        </a>
      </label>
    </div>
  )
}

export default PolicyAgreeCheckbox
