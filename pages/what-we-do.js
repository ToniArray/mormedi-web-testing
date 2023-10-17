import Head from 'next/head'
import { useState } from 'react'

import useTranslations from '../config/i18n/useTranslations'

import * as ROUTES from '../config/routes'
import { getSingle } from '../services/cms'
import * as ENDPOINTS from '../services/endpoints'

import PageHeading from '../components/page-heading/PageHeading'
import WhatWeDo from '../components/what-we-do/WhatWeDo'

export default function WhatWeDoPage({
  metaHeading = {},
  pageHeading = {},
  people,
  services,
}) {
  const t = useTranslations()
  const [videoLanguage, setVideoLanguage] = useState('spanish')

  const { title = '', description = '' } = pageHeading

  const handleSelectLanguage = language => {
    setVideoLanguage(language)
  }

  return (
    <>
      <Head>
        <title>
          {metaHeading ? metaHeading.metaTitle : t('seo:what-we-do-title')}
        </title>
        <meta
          name="description"
          content={
            metaHeading
              ? metaHeading.metaDescription
              : t('seo:what-we-do-description')
          }
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.WHAT_WE_DO.path}`}
        />
      </Head>

      <PageHeading title={title} description={description} />

      <WhatWeDo
        people={people}
        videoLanguage={videoLanguage}
        onChangeVideoLanguage={handleSelectLanguage}
        services={services}
      />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const data = await getSingle(ENDPOINTS.WHAT_WE_DO_PAGE, locale)

  return {
    props: data,
  }
}
