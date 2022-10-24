import { getServerSideSitemap } from 'next-sitemap'

import { getCollection } from '../../services/cms'
import * as ENDPOINTS from '../../services/endpoints'

import * as ROUTES from '../../config/routes'

const getFieldFromSlug = (slug, locale, collection, currentDate) => {
  return {
    loc: `https://mormedi.com${
      locale === 'es' ? '/es' : ''
    }${collection}/${slug}`,
    lastmod: currentDate,
  }
}

const getFields = (slugs, collection, currentDate) => [
  ...slugs.en.map(slug =>
    getFieldFromSlug(slug, 'en', collection, currentDate),
  ),
  ...slugs.es.map(slug =>
    getFieldFromSlug(slug, 'es', collection, currentDate),
  ),
]

const getCollectionSlugs = collection => collection.map(item => item.slug)

const getCollectionSlugsFromCMS = async collection => {
  const enCollection = await getCollection(collection, 'en')
  const esCollection = await getCollection(collection, 'es')

  const enSlugs = getCollectionSlugs(enCollection)
  const esSlugs = getCollectionSlugs(esCollection)

  return { en: enSlugs, es: esSlugs }
}

export const getServerSideProps = async ctx => {
  const currentDate = new Date().toISOString()

  const categoriesSlugs = await getCollectionSlugsFromCMS(ENDPOINTS.CATEGORIES)
  const categoriesFields = getFields(
    categoriesSlugs,
    ROUTES.CATEGORIES.path,
    currentDate,
  )

  const insightsSlugs = await getCollectionSlugsFromCMS(ENDPOINTS.INSIGHTS)
  const insightsFields = getFields(
    insightsSlugs,
    ROUTES.INSIGHTS.path,
    currentDate,
  )

  const downloadsSlugs = await getCollectionSlugsFromCMS(ENDPOINTS.DOWNLOADS)
  const downloadsFields = getFields(
    downloadsSlugs,
    ROUTES.DOWNLOADS.path,
    currentDate,
  )

  const fields = [...categoriesFields, ...insightsFields, ...downloadsFields]

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
