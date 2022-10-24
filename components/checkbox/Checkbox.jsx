import React from 'react'

import { useTranslations } from '../../../i18n'

const Checkbox = ({ isMailchimp }) => {
  const t = useTranslations()

  return (
    <div className="checkbox">
      <input type="checkbox" id={!isMailchimp ? 'accept01' : 'accept02'} />
      {!isMailchimp ? (
        <label htmlFor="accept01">
          {t('contact:accept-mormedi')}{' '}
          <a href="/" target="_blank" rel="noopener">
            {t('contact:privacy-policy')}
          </a>
        </label>
      ) : (
        <label htmlFor="accept02">{t('contact:newletter')}</label>
      )}
    </div>
  )
}

export default Checkbox
