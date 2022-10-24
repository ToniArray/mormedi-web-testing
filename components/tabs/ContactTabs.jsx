import React from 'react'
import cx from 'classnames'

import useTranslations from '../../config/i18n/useTranslations'

const ContactTabs = ({ titles, selected, children, onChangeTab }) => {
  const t = useTranslations()
  return (
    <div className="contactTabs tabs">
      <div className="contactTabs-buttons">
        {titles.map(title => (
          <button
            key={title}
            onClick={() => onChangeTab(title)}
            className={cx('contactTabs-button tabs-button', {
              'is-active': title === selected,
            })}
          >
            {t(title)}
          </button>
        ))}
      </div>
      <div className="contactTabs-contentContainer">{children}</div>
    </div>
  )
}

export default ContactTabs
