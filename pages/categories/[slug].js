import Head from 'next/head'

import {
  getCollection,
  findById,
  findBySlug,
  getSingle,
  SWITCH_LANGS,
} from '../../services/cms'
import * as ENDPOINTS from '../../services/endpoints'
import * as ROUTES from '../../config/routes'

import useTranslations from '../../config/i18n/useTranslations'

import PageHeading from '../../components/page-heading/PageHeading'
import PostsContainer from '../../components/posts/PostsContainer'
import PostCover from '../../components/posts/PostCover'

export default function Category({ pageHeading, projects, category }) {
  const t = useTranslations()

  return (
    <>
      <Head>
        <title>{t('seo:category-title', { category: category.title })}</title>
        <meta name="description" content={t('seo:home-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.CATEGORIES.path}/${category.slug}`}
        />
      </Head>

      <PageHeading
        title={`${pageHeading.title} ${t('in')} ${category.title}`}
        description={category.description}
      />

      <PostsContainer hasWorks={projects.length > 0}>
        {projects.map(project => (
          <PostCover
            key={project.slug}
            // TODO: use routes object
            to={`/projects/${project.slug}?filters=${category.slug}`}
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

export async function getServerSideProps({ query, locale }) {
  const slug = query.slug

  const category = await findBySlug(ENDPOINTS.CATEGORIES, slug, locale)
  const projects = await getCollection(ENDPOINTS.PROJECTS, locale)
  const pageData = await getSingle(ENDPOINTS.OUR_WORK_PAGE, locale)

  if (!category) {
    // NOTE: If the post is not found in the selected locale, it is
    // possible that the slug corresponds to another locale (because
    // the user has visited the URL through an external link), so we
    // check if the post exists in another locale.
    const categoryInAnotherLocale = await findBySlug(
      ENDPOINTS.CATEGORIES,
      slug,
      SWITCH_LANGS[locale],
    )
    if (categoryInAnotherLocale) {
      if (
        Array.isArray(categoryInAnotherLocale.localizations) &&
        categoryInAnotherLocale.localizations[0]
      ) {
        const id = categoryInAnotherLocale.localizations[0].id

        const categoryInCurrentLocale = await findById(
          ENDPOINTS.CATEGORIES,
          id,
          locale,
        )

        if (categoryInCurrentLocale) {
          return {
            redirect: {
              destination: `${ROUTES.CATEGORIES.path}/${categoryInCurrentLocale.slug}`,
              permanent: false,
            },
          }
        }
      }
    }

    return {
      notFound: true,
    }
  }

  const categoryProjects = projects.filter(project => {
    const categoryIndex = project.categories.findIndex(
      projectCategory => projectCategory.id === category.id,
    )

    return categoryIndex >= 0
  })

  return {
    props: {
      pageHeading: pageData.pageHeading,
      projects: categoryProjects,
      category,
    },
  }
}
