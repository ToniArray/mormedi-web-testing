import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import useTranslations from '../../config/i18n/useTranslations'

import { getCollection, getSingle } from '../../services/cms'
import * as ENDPOINTS from '../../services/endpoints'
import * as ROUTES from '../../config/routes'

import SnapSection from '../../components/snap-section/SnapSection'
import WorkCategory from '../../components/work-category/WorkCategory'
import ClientsResume from '../../components/clients-resume/ClientsResume'
import FiltersModal from '../../components/filters-modal/FiltersModal'

export default function Works({
  pageContent = { metaHeading: {}, categories: [], clients: [] },
  filtersCategories = [],
}) {
  const t = useTranslations()
  const router = useRouter()

  const [selection, setSelection] = useState([])

  useEffect(() => {
    const selection = filtersCategories.reduce(
      (selection, category) => ({ ...selection, [category.slug]: false }),
      {},
    )
    setSelection(selection)
  }, [filtersCategories])

  const handleSelectCategory = slug => {
    setSelection({ ...selection, [slug]: !selection[slug] })
  }

  const handleApplyFilters = () => {
    const filters = Object.entries(selection)
      .filter(([slug, selected]) => selected)
      .map(([slug]) => slug)
      .join(',')

    if (!filters.length) {
      router.push(`/our-work`)
    } else {
      router.push(`/our-work?filters=${filters}`)
    }
  }

  const handleSelectAll = () => {
    setSelection(
      filtersCategories.reduce(
        (selection, category) => ({
          ...selection,
          [category.slug]: false,
        }),
        {},
      ),
    )
  }

  return (
    <>
      <Head>
        <title>{pageContent.metaHeading ? pageContent.metaHeading.metaTitle : t('seo:works-title')}</title>
        <meta name="description" content={pageContent.metaHeading ? pageContent.metaHeading.metaDescription : t('seo:works-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.WORKS.path}`}
        />
      </Head>
      {pageContent.categories.map(
        ({ category, horizontalVideo, verticalVideo, clients }) => (
          <SnapSection key={category.title} isNegative>
            <WorkCategory
              horizontalVideo={horizontalVideo.url}
              verticalVideo={verticalVideo.url}
              title={category.title}
              clientLogos={(clients || []).map(c => c.whiteLogo.url)}
              slug={category.slug}
            />
          </SnapSection>
        ),
      )}
      <SnapSection>
        <ClientsResume clients={pageContent.clients} />
      </SnapSection>

      <FiltersModal
        categories={filtersCategories}
        selection={selection}
        onCategoryClick={handleSelectCategory}
        onApplyFiltersClick={handleApplyFilters}
        onAllClick={handleSelectAll}
      />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const pageContent = await getSingle(ENDPOINTS.WORKS_PAGE, locale)
  const categories = await getCollection(ENDPOINTS.CATEGORIES, locale)

  return {
    props: { pageContent, filtersCategories: categories },
  }
}
