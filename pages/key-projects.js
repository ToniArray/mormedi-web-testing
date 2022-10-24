import Head from 'next/head'

import useTranslations from '../config/i18n/useTranslations'

import { getSingle } from '../services/cms'
import * as ENDPOINTS from '../services/endpoints'
import * as ROUTES from '../config/routes'

import PageHeading from '../components/page-heading/PageHeading'
import PostsContainer from '../components/posts/PostsContainer'
import PostCover from '../components/posts/PostCover'

export default function KeyProjects({ metaHeading = {}, pageHeading = {}, projects = [] }) {
  const { title = '', description = '' } = pageHeading

  const t = useTranslations()

  return (
    <>
      <Head>
        <title>{metaHeading ? metaHeading.metaTitle : t('seo:key-projects-title')}</title>
        <meta name="description" content={metaHeading ? metaHeading.metaDescription : t('seo:key-projects-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.KEY_PROJECTS.path}`}
        />
      </Head>

      <PageHeading title={title} description={description} />

      <PostsContainer hasWorks={projects.length > 0}>
        {projects.map(project => (
          <PostCover
            key={project.slug}
            to={`/projects/${project.slug}`}
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
  const data = await getSingle(ENDPOINTS.KEY_PROJECTS_PAGE, locale)

  return {
    props: data,
  }
}
