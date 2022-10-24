import { useState, useEffect, useCallback } from 'react'
import cx from 'classnames'
import Head from 'next/head'
import showdown from 'showdown'

import useTranslations from '../config/i18n/useTranslations'

import { getSingle } from '../services/cms'
import * as ENDPOINTS from '../services/endpoints'
import * as ROUTES from '../config/routes'

import PageHeading from '../components/page-heading/PageHeading'
import LegalTabs from '../components/tabs/LegalTabs'

export default function Legal({ metaHeading = {}, pageHeading = {}, legal = [] }) {
  const { title = '', description = '' } = pageHeading
  const converter = new showdown.Converter()
  const [activeTab, setActiveTab] = useState('')

  const t = useTranslations()

  const getTitles = useCallback(() => {
    return legal.map(legalText => legalText.title)
  }, [legal])

  useEffect(() => {
    const titles = getTitles()
    setActiveTab(titles[0])
  }, [getTitles])

  const handleSetActiveTab = tab => setActiveTab(tab)

  return (
    <>
      <Head>
        <title>{metaHeading ? metaHeading.metaTitle : t('seo:legal-title')}</title>
        <meta name="description" content={metaHeading ? metaHeading.metaDescription : t('seo:legal-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.LEGAL.path}`}
        />
      </Head>
      <PageHeading title={title} description={description} />
      <LegalTabs
        titles={getTitles()}
        activeTab={activeTab}
        onChangeTab={handleSetActiveTab}
      >
        {legal.map((legalText) => {
          const className = cx(
            'legalTabs-content tabs-content postWysiwyg-content',
            { 'is-active': legalText.title === activeTab },
          )
          return (
            <div
              key={legalText.title}
              className={className}
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(legalText.description),
              }}
            ></div>
          )
        })}
      </LegalTabs>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const data = await getSingle(ENDPOINTS.LEGAL_PAGE, locale)


  return {
    props: data,
  }
}
