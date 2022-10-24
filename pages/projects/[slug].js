import { useRef, useState } from 'react'
import Head from 'next/head'

import showdown from 'showdown'

import {
  findById,
  findBySlug,
  getCollection,
  SWITCH_LANGS,
} from '../../services/cms'
import * as ENDPOINTS from '../../services/endpoints'
import * as ROUTES from '../../config/routes'

import useTranslations from '../../config/i18n/useTranslations'

import BackButton from '../../components/back-button/BackButton'
import Link from '../../components/link/Link'
import SectionWrapper from '../../components/wrappers/SectionWrapper'

import useWysiwygParallax from '../../hooks/useWysiwygParallax'
import PostIframe from '../../components/posts/PostIframe'

export default function Project({ project, next }) {
  const t = useTranslations()

  const imageTopRef = useRef(null)
  const imageBottomRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  useWysiwygParallax([imageTopRef.current, imageBottomRef.current], isLoaded)

  const converter = new showdown.Converter()

  const {
    client,
    when,
    title,
    topImage,
    bottomImage,
    context,
    solution,
    whatWeDid,
    description,
    quote,
    categories = [],
  } = project

  return (
    <>
      <Head>
        <title>{t('seo:project-title', { project: title })}</title>
        <meta name="description" content={t('seo:home-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.PROJECTS.path}/${project.slug}`}
        />
      </Head>

      <div className="postWysiwyg is-project">
        <SectionWrapper>
          <h2 className="postWysiwyg-client">
            {client !== null ? client.name : ''}
          </h2>

          {topImage ? (
            <div className="postWysiwyg-image" ref={imageTopRef}>
              <img src={topImage.url} alt="" onLoad={() => setIsLoaded(true)} />
            </div>
          ) : null}

          <div className="postWysiwyg-info">
            <h1 className="postWysiwyg-title">{title}</h1>
            <div className="postWysiwyg-references">
              <div className="postWysiwyg-tags">
                {(categories || []).map((category, idx) => (
                  <Link
                    to={`/our-work?filters=${category.slug}`}
                    title={category.title}
                    key={category.title}
                  >
                    {category.title}
                    {idx !== categories.length - 1 ? ', ' : ''}
                  </Link>
                ))}
              </div>
              <p className="postWysiwyg-referencesTitle">{t('client')}</p>
              <p>{client !== null ? client.name : ''}</p>
              <p>{when}</p>
              <p className="postWysiwyg-referencesTitle">{t('project')}</p>
              <p>{title}</p>
              <p className="postWysiwyg-referencesTitle">{t('context')}</p>
              <p>{context}</p>
              <p className="postWysiwyg-referencesTitle">{t('solution')}</p>
              <p>{solution}</p>
              <p className="postWysiwyg-referencesTitle">{t('what-we-did')}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(whatWeDid),
                }}
              ></div>
            </div>
          </div>

          <div
            className="postWysiwyg-content"
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(description),
            }}
          ></div>

          {bottomImage ? (
            <div className="postWysiwyg-image" ref={imageBottomRef}>
              <img
                src={bottomImage.url}
                alt=""
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          ) : null}

          {quote ? (
            <div className="postWysiwyg-quote">
              <h5>{quote.text}</h5>
              <p>{quote.author}</p>
              <p>{quote.date}</p>
            </div>
          ) : null}
        </SectionWrapper>
      </div>
      <BackButton />

      {next ? <PostIframe next={next} /> : null}
    </>
  )
}

export async function getServerSideProps({ query, locale }) {
  const { slug, filters: filtersQuery, ['is-next']: isIframe } = query

  const project = await findBySlug(ENDPOINTS.PROJECTS, slug, locale)

  if (!project) {
    // NOTE: If the post is not found in the selected locale, it is
    // possible that the slug corresponds to another locale (because
    // the user has visited the URL through an external link), so we
    // check if the post exists in another locale.
    const projectInAnotherLocale = await findBySlug(
      ENDPOINTS.PROJECTS,
      slug,
      SWITCH_LANGS[locale],
    )
    if (projectInAnotherLocale) {
      if (
        Array.isArray(projectInAnotherLocale.localizations) &&
        projectInAnotherLocale.localizations[0]
      ) {
        const id = projectInAnotherLocale.localizations[0].id

        const projectInCurrentLocale = await findById(
          ENDPOINTS.PROJECTS,
          id,
          locale,
        )

        if (projectInCurrentLocale) {
          return {
            redirect: {
              destination: `${ROUTES.PROJECTS.path}/${projectInCurrentLocale.slug}`,
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

  const projects = await getCollection(ENDPOINTS.PROJECTS, locale)
  const filters = filtersQuery ? filtersQuery.split(',') : []

  const filteredProjects = filters.length
    ? projects.filter(project => {
        const categorySlugs = project.categories.map(category => category.slug)
        return categorySlugs.some(slug => filters.includes(slug))
      })
    : projects

  let next = null

  if (filteredProjects.length && !isIframe) {
    const index = filteredProjects.findIndex(p => p.slug === project.slug)

    if (index < filteredProjects.length - 1) {
      const nextProject = filteredProjects[index + 1]
      next = {
        path: `${ROUTES.PROJECTS.path}/${nextProject.slug}`,
        filters: filtersQuery || '',
      }
    }
  }

  return {
    props: { project, next },
  }
}
