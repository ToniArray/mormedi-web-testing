import { useState, useEffect } from 'react'
import Head from 'next/head'

import useTranslations from '../../config/i18n/useTranslations'
import useQuery from '../../hooks/useQuery'

import { getSingle, getCollection } from '../../services/cms'
import * as ENDPOINTS from '../../services/endpoints'
import * as ROUTES from '../../config/routes'

import PageHeading from '../../components/page-heading/PageHeading'
import Filters from '../../components/filters/Filters'
import PostsContainer from '../../components/posts/PostsContainer'
import PostCover from '../../components/posts/PostCover'
import PostDownload from '../../components/posts/PostDownload'

export default function Insights({ metaHeading, pageHeading, categories, insights }) {
  const t = useTranslations()

  const query = useQuery()
  const filtersQuery = query.get('filters')

  const [selection, setSelection] = useState([])
  const [filteredInsights, setFilteredInsights] = useState([])

  useEffect(() => {
    const allCategories = categories
    const filters = filtersQuery ? filtersQuery.split(',') : []

    const selection = allCategories.reduce(
      (selection, category) => ({
        ...selection,
        [category.slug]: filters.includes(category.slug),
      }),
      {},
    )

    setSelection(selection)
  }, [filtersQuery, categories])

  useEffect(() => {
    const selectedSlugs = Object.entries(selection)
      .filter(([, selected]) => selected)
      .map(([slug]) => slug)

    if (!selectedSlugs.length) {
      setFilteredInsights(insights)
    } else {
      const result = insights.filter(insight => {
        const categorySlugs = insight.categories.map(category => category.slug)
        const includeSlug = slug => selectedSlugs.includes(slug)
        return categorySlugs.some(includeSlug)
      })
      setFilteredInsights(result)
    }
  }, [insights, selection])

  const handleSelectAll = () => {
    setSelection(
      categories.reduce(
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
        <title>{metaHeading ? metaHeading.metaTitle : t('seo:insights-title')}</title>
        <meta name="description" content={metaHeading ? metaHeading.metaDescription : t('seo:insights-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.INSIGHTS.path}`}
        />
      </Head>

      <PageHeading
        title={pageHeading.title}
        description={pageHeading.description}
      />

      <Filters
        categories={categories.map(category => ({
          ...category,
          count: category.insights.length,
        }))}
        selection={selection}
        onCategoryClick={handleSelectCategory}
        onAllClick={handleSelectAll}
      />

      <PostsContainer>
        {filteredInsights.map((insigth, index) => {
          const { title, description = '', thumbnailImage, slug } = insigth
          return index <= 2 ? (
            <PostCover
              key={title}
              title={title}
              intro={description}
              image={thumbnailImage.url}
              to={`/insights/${slug}`}
              isFull={index === 0 ? true : false}
              tags={insigth.categories.map(category => ({
                href: `/insights?filters=${category.slug}`,
                name: category.title,
              }))}
            />
          ) : null
        })}
      </PostsContainer>

      <PostDownload title={t('insights:download')} />

      <PostsContainer>
        {filteredInsights.map((insigth, index) => {
          const { title, description = '', thumbnailImage, slug } = insigth
          return index > 2 ? (
            <PostCover
              key={title}
              title={title}
              intro={description}
              slug={slug}
              image={thumbnailImage.url}
              to={`/insights/${slug}`}
              tags={insigth.categories.map(category => ({
                href: `/insights?filters=${category.slug}`,
                name: category.title,
              }))}
            />
          ) : null
        })}
      </PostsContainer>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const pageData = await getSingle(ENDPOINTS.INSIGHTS_PAGE, locale)
  const categories = await getCollection(ENDPOINTS.CATEGORIES, locale)

  const params = new URLSearchParams()
  params.append('_sort', 'Date:DESC')

  const insights = await getCollection(ENDPOINTS.INSIGHTS, locale, params)

  return {
    props: { metaHeading: pageData.metaHeading, pageHeading: pageData.pageHeading, categories, insights },
  }
}
