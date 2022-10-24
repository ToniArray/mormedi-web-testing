import { useRouter } from 'next/router'
import CookieManager from 'js-cookie'

const setNextLocaleCookie = locale => {
  CookieManager.set('NEXT_LOCALE', locale, {
    expires: 30 * 3,
    sameSite: 'lax',
  })
}

const useSetLocale = () => {
  const router = useRouter()

  const setLocale = locale => {
    setNextLocaleCookie(locale)
    router.push(router.asPath, router.asPath, { locale: locale })
  }

  return { setLocale, activeLocale: router.locale, locales: router.locales }
}

export default useSetLocale
