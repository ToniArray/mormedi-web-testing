import Head from 'next/head'
import showdown from 'showdown'

import useTranslations from '../config/i18n/useTranslations'

import { getSingle } from '../services/cms'
import * as ENDPOINTS from '../services/endpoints'
import * as ROUTES from '../config/routes'

import PageHeading from '../components/page-heading/PageHeading'

export default function Confirmation({ metaHeading = {}, pageHeading = {}, text }) {
  const { title = '', description = '' } = pageHeading

  const t = useTranslations()

  const converter = new showdown.Converter()

  return (
    <>
      <Head>
        <title>{metaHeading ? metaHeading.metaTitle : t('seo:confirmation-title')}</title>
        <meta name="description" content={metaHeading ? metaHeading.metaDescription : t('seo:confirmation-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.CONFIRMATION.path}`}
        />
      </Head>

      <PageHeading title={title} description={description} />
      <div
        className="postWysiwyg-content"
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(text),
        }}
      ></div>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const data = await getSingle(ENDPOINTS.CONFIRMATION_PAGE, locale)

  return {
    props: data,
  }
}
