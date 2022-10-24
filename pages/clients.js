import Head from 'next/head'

import useTranslations from '../config/i18n/useTranslations'

import { getSingle } from '../services/cms'
import * as ENDPOINTS from '../services/endpoints'
import * as ROUTES from '../config/routes'

import PageHeading from '../components/page-heading/PageHeading'
import BackButton from '../components/back-button/BackButton'
import ClientsList from '../components/clients-list/ClientsList'

export default function Clients({ metaHeading = {}, pageHeading = {}, categories = [] }) {
  const t = useTranslations()
  const { title = '', description = '' } = pageHeading

  return (
    <>
      <Head>
        <title>{metaHeading ? metaHeading.metaTitle : t('seo:clients-title')}</title>
        <meta name="description" content={metaHeading ? metaHeading.metaDescription : t('seo:clients-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.CLIENTS.path}`}
        />
      </Head>
      <PageHeading title={title} description={description} />
      <BackButton />
      <ClientsList categories={categories} />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const data = await getSingle(ENDPOINTS.CLIENTS_PAGE, locale)

  return {
    props: data,
  }
}
