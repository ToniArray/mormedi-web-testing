import { useState, useEffect, useMemo } from 'react'
import Head from 'next/head'

import useTranslations from '../config/i18n/useTranslations'

import { getCollection } from '../services/cms'
import * as ENDPOINTS from '../services/endpoints'
import * as ROUTES from '../config/routes'
import useQuery from '../hooks/useQuery'

import PageHeading from '../components/page-heading/PageHeading'
import BackButton from '../components/back-button/BackButton'
import Filters from '../components/filters/Filters'
import PostsContainer from '../components/posts/PostsContainer'
import PostCover from '../components/posts/PostCover'

export default function OurWork({ metaHeading = {}, pageHeading = {}, categories, projects }) {
  const t = useTranslations()

  const { title = '', description = '' } = pageHeading

  const query = useQuery()
  const filtersQuery = query.get('filters')

  const [selection, setSelection] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])

  useEffect(() => {
    const filters = filtersQuery ? filtersQuery.split(',') : []

    const selection = categories.reduce(
      (selection, category) => ({
        ...selection,
        [category.slug]: filters.includes(category.slug),
      }),
      {},
    )

    setSelection(selection)
  }, [categories, filtersQuery])

  useEffect(() => {
    const selectedSlugs = Object.entries(selection)
      .filter(([, selected]) => selected)
      .map(([slug]) => slug)

    if (!selectedSlugs.length) {
      setFilteredProjects(projects)
    } else {
      const result = projects.filter(project => {
        const categorySlugs = project.categories.map(category => category.slug)
        return categorySlugs.some(slug => selectedSlugs.includes(slug))
      })
      setFilteredProjects(result)
    }
  }, [selection, projects])

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

  const selectionQuery = useMemo(
    () =>
      Object.entries(selection).reduce(
        (acc, [filter, isActive]) => [...acc, ...(isActive ? [filter] : [])],
        [],
      ),
    [selection],
  )

  return (
    <>
      <Head>
        <title>{metaHeading ? metaHeading.metaTitle : t('seo:our-work-title')}</title>
        <meta name="description" content={metaHeading ? metaHeading.metaDescription : t('seo:our-work-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.OUR_WORK.path}`}
        />
      </Head>

      <PageHeading title={title} description={description} />

      <BackButton />
      <Filters
        categories={categories.map(category => ({
          ...category,
          count: category.projects.length,
        }))}
        selection={selection}
        onCategoryClick={handleSelectCategory}
        onAllClick={handleSelectAll}
      />
      <PostsContainer hasWorks={projects.length > 0}>
        {filteredProjects.map(project => (
          <PostCover
            key={project.slug}
            to={ROUTES.PROJECT.linkTo({
              slug: project.slug,
              ...(selectionQuery.length
                ? { filters: selectionQuery.join(',') }
                : {}),
            })}
            image={project.coverImage.url}
            title={project.title}
            intro={project.intro}
            tags={project.categories.map(category => ({
              href: `/our-work?filters=${category.slug}`,
              name: category.title,
            }))}
          />
        ))}
      </PostsContainer>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const pageData = await getCollection(ENDPOINTS.OUR_WORK_PAGE, locale)
  const categories = await getCollection(ENDPOINTS.CATEGORIES, locale)
  const projects = await getCollection(ENDPOINTS.PROJECTS, locale)

  return {
    props: { metaHeading: pageData.metaHeading, pageHeading: pageData.pageHeading, categories, projects },
  }
}
