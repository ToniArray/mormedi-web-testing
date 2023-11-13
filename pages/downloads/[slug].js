import Head from 'next/head'
import { useRouter } from 'next/router'
import showdown from 'showdown'

import useTranslations from '../../config/i18n/useTranslations'

import * as ROUTES from '../../config/routes'
import {
  findById,
  findBySlug,
  sendEmail,
  SWITCH_LANGS,
} from '../../services/cms'
import * as ENDPOINTS from '../../services/endpoints'

import BackButton from '../../components/back-button/BackButton'
import SectionWrapper from '../../components/wrappers/SectionWrapper'

export default function Download({ pageData }) {
  const { title = '', description = '', image = '' } = pageData || {}
  const converter = new showdown.Converter()

  const t = useTranslations()
  const router = useRouter()

  const handleSubmit = async data => {
    const result = await sendEmail(data)

    if (result.success) {
      router.push(ROUTES.CONFIRMATION.path)
    } else {
      router.push(ROUTES.ERROR.path)
    }
  }

  return (
    <>
      <Head>
        <title>{t('seo:downloads-title')}</title>
        <meta name="description" content={t('seo:home-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.DOWNLOADS.path}`}
        />
      </Head>

      <div className="postWysiwyg is-download">
        <SectionWrapper>
          <div className="postWysiwyg-image">
            <img src={image.url} alt={image.name} />
          </div>
          <div className="postWysiwyg-info">
            <h1 className="postWysiwyg-title">{title}</h1>
          </div>
          <div className="postWysiwyg-content">
            <div
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(description),
              }}
            ></div>
            {/* <img src={image.url} alt={image.name} /> */}
          </div>
        </SectionWrapper>
      </div>

      <BackButton />

      {/* <DownloadForm title={title} onFormSubmit={handleSubmit} /> */}
    </>
  )
}

export async function getServerSideProps({ query, locale }) {
  const { slug } = query

  const pageData = await findBySlug(ENDPOINTS.DOWNLOADS, slug, locale)

  if (!pageData) {
    // NOTE: If the post is not found in the selected locale, it is
    // possible that the slug corresponds to another locale (because
    // the user has visited the URL through an external link), so we
    // check if the post exists in another locale.
    const downloadInAnotherLocale = await findBySlug(
      ENDPOINTS.DOWNLOADS,
      slug,
      SWITCH_LANGS[locale],
    )
    if (downloadInAnotherLocale) {
      if (
        Array.isArray(downloadInAnotherLocale.localizations) &&
        downloadInAnotherLocale.localizations[0]
      ) {
        const id = downloadInAnotherLocale.localizations[0].id

        const downloadInCurrentLocale = await findById(
          ENDPOINTS.DOWNLOADS,
          id,
          locale,
        )

        if (downloadInCurrentLocale) {
          return {
            redirect: {
              destination: `${ROUTES.DOWNLOADS.path}/${downloadInCurrentLocale.slug}`,
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

  return {
    props: { pageData },
  }
}
