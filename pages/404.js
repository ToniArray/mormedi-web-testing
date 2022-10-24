import Head from 'next/head'

import useTranslations from '../config/i18n/useTranslations'
import Error from '../components/error/Error'

import * as ROUTES from '../config/routes'

export default function NotFound() {
  const t = useTranslations()
  return (<>
    <Head>
      <title>{t('seo:home-title')}</title>
      <meta name="description" content={t('seo:home-description')} />
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.ERROR.path}`}
      />
    </Head>
    <Error />
  </>)
}
