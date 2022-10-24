import translations from './index'
import availableLocales from './locales'

export const DEFAULT_LOCALE =
  process.env.REACT_APP_DEFAULT_LOCALE || availableLocales[0].locale

export const findMatchingLocale = (language = undefined) => {
  const matchingLocale = availableLocales.find(({ match }) =>
    match.test(
      language
        ? language
        : typeof navigator !== 'undefined' && navigator
        ? navigator.language
        : DEFAULT_LOCALE,
    ),
  )

  return matchingLocale ? matchingLocale.locale : DEFAULT_LOCALE
}

export const setupI18n = (language = undefined) => {
  const locale = findMatchingLocale(language)

  const messages = translations[locale] || translations[DEFAULT_LOCALE]

  if (!translations[locale]) {
    console.warn(`Missing translations for locale ${locale}`)
  }

  return {
    messages,
    locale,
  }
}
