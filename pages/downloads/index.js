import { useState, useEffect } from 'react'
import Head from 'next/head'

import useTranslations from '../../config/i18n/useTranslations'

import { getCollection, getSingle } from '../../services/cms'
import * as ENDPOINTS from '../../services/endpoints'
import * as ROUTES from '../../config/routes'
import useQuery from '../../hooks/useQuery'

import PageHeading from '../../components/page-heading/PageHeading'
import Filters from '../../components/filters/Filters'
import DownloadCover from '../../components/downloads/DownloadCover'

export default function Downloads({
  metaHeading,
  downloadCategories,
  downloads,
  pageHeading,
}) {
  const { title = '', description = '' } = pageHeading

  const t = useTranslations()

  const query = useQuery()
  const filtersQuery = query.get('filters')

  const [selection, setSelection] = useState([])
  const [filteredDownloads, setFilteredDownloads] = useState([])

  useEffect(() => {
    const allCategoriesDownload = downloadCategories
    const filters = filtersQuery ? filtersQuery.split(',') : []

    const selection = allCategoriesDownload.reduce(
      (selection, category) => ({
        ...selection,
        [category.slug]: filters.includes(category.slug),
      }),
      {},
    )

    setSelection(selection)
  }, [filtersQuery, downloadCategories])

  useEffect(() => {
    const selectedSlugs = Object.entries(selection)
      .filter(([, selected]) => selected)
      .map(([slug]) => slug)

    if (!selectedSlugs.length) {
      setFilteredDownloads(downloads)
    } else {
      const result = downloads.filter(download => {
        const categorySlugs = download.downloadCategories.map(
          category => category.slug,
        )
        const includeSlug = slug => selectedSlugs.includes(slug)
        return categorySlugs.some(includeSlug)
      })
      setFilteredDownloads(result)
    }
  }, [downloads, selection])

  const handleSelectAll = () => {
    setSelection(
      downloadCategories.reduce(
        (selection, category) => ({
          ...selection,
          [category.slug]: false,
        }),
        {},
      ),
    )
  }

  const handleSelectCategory = slug => {
    setSelection({ ...selection, [slug]: !selection[slug] })
  }

  return (
    <>
      <Head>
        <title>{metaHeading ? metaHeading.metaTitle : t('seo:downloads-title')}</title>
        <meta name="description" content={metaHeading ? metaHeading.metaDescription : t('seo:downloads-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.DOWNLOADS.path}`}
        />
      </Head>

      <PageHeading title={title} description={description} />

      <Filters
        categories={downloadCategories.map(category => ({
          ...category,
          count: category.downloads.length,
        }))}
        selection={selection}
        onCategoryClick={handleSelectCategory}
        onAllClick={handleSelectAll}
      />

      {filteredDownloads.map(download => (
        <DownloadCover key={download.title} download={download} />
      ))}
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const downloadCategories = await getCollection(
    ENDPOINTS.DOWNLOADS_CATEGORIES,
    locale,
  )
  const downloads = await getCollection(ENDPOINTS.DOWNLOADS, locale)
  const pageData = await getSingle(ENDPOINTS.DOWNLOADS_PAGE, locale)

  return {
    props: { metaHeading: pageData.metaHeading, downloadCategories, downloads, pageHeading: pageData.pageHeading },
  }
}
