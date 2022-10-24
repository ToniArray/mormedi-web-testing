import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import { setupI18n } from './i18n'

export const ConnectedIntlProvider = ({ children }) => {
  const { locale: nextLocale } = useRouter()
  const { messages, locale } = setupI18n(nextLocale)

  return (
    <IntlProvider
      messages={messages}
      locale={locale}
      textComponent={React.Fragment}
    >
      {children}
    </IntlProvider>
  )
}

ConnectedIntlProvider.propTypes = {
  children: PropTypes.node,
}

export default ConnectedIntlProvider
