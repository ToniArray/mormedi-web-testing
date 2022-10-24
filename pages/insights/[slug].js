import { useEffect, useRef } from 'react'
import Head from 'next/head'
import showdown from 'showdown'

import {
  getCollection,
  findById,
  findBySlug,
  SWITCH_LANGS,
} from '../../services/cms'
import * as ENDPOINTS from '../../services/endpoints'
import * as ROUTES from '../../config/routes'

import useTranslations from '../../config/i18n/useTranslations'
import useToggleLocales from '../../config/i18n/useToggleLocales'

import Button from '../../components/button/Button'
import BackButton from '../../components/back-button/BackButton'
import Input from '../../components/input/Input'
import Link from '../../components/link/Link'
import SectionWrapper from '../../components/wrappers/SectionWrapper'
import PolicyAgreeCheckbox from '../../components/checkbox/PolicyAgreeCheckbox'

import IconArrow from '../../public/icons/icon-arrow'

export default function Insight({ current, previous, next }) {
  const {
    title,
    author,
    position,
    content,
    categories = [],
    topImage = {},
  } = current

  const converter = new showdown.Converter()

  const t = useTranslations()
  const { activeLocale: locale } = useToggleLocales()

  const formRef = useRef(null)
  const emailRef = useRef(null)

  const action =
    locale === 'en'
      ? 'https://mormedi.us5.list-manage.com/subscribe/post?u=41565fa367e712a6a34ade89f&amp;id=b246f12cbd'
      : 'https://mormedi.us5.list-manage.com/subscribe/post?u=41565fa367e712a6a34ade89f&amp;id=e19583121c'

  useEffect(() => {
    const submitSubscription = ev => {
      emailRef.current.value = ev.detail
      formRef.current.submit()
    }

    document.addEventListener('subscribe-newsletter', submitSubscription)
    return () =>
      document.removeEventListener('subscribe-newsletter', submitSubscription)
  }, [formRef, emailRef])

  return (
    <>
      <Head>
        <title>{t('seo:insights-title')}</title>
        <meta name="description" content={t('seo:home-description')} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.INSIGHTS.path}/${current.slug}`}
        />
      </Head>

      <div className="postWysiwyg">
        <SectionWrapper>
          {topImage ? (
            <div className="postWysiwyg-image">
              <img src={topImage.url} alt="" />
            </div>
          ) : null}
          <div className="postWysiwyg-info">
            <ul className="postWysiwyg-tags">
              {(categories || []).map((category, idx) => (
                <a
                  href={`/our-work?filters=${category.slug}`}
                  alt=""
                  key={category.title}
                >
                  {category.title}
                  {idx !== categories.length - 1 ? ', ' : ''}
                </a>
              ))}
            </ul>
            <h1 className="postWysiwyg-title">{title}</h1>
            <h2 className="postWysiwyg-author">{author}</h2>
            <h3 className="postWysiwyg-position">{position}</h3>
          </div>
          <div className="postWysiwyg-content">
            <div
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(content),
              }}
            ></div>

            <div className="postWysiwyg-formBlock">
              <span className="postWysiwyg-formTitle">
                {t('insight-detail:title-form')}
              </span>
              <span className="postWysiwyg-formIntro">
                {t('insight-detail:description-form')}
              </span>
              <form
                id="download-form"
                ref={formRef}
                action={action}
                method="post"
                name="mc-embedded-subscribe-form"
                target="_blank"
              >
                <fieldset className="contact-fieldset">
                  <Input
                    required
                    type="name"
                    id="mce-FEMAIL"
                    name="FNAME"
                    placeholder={t('insight-detail:name-form')}
                  />
                  <Input
                    required
                    type="email"
                    name="EMAIL"
                    id="mce-EMAIL"
                    placeholder={t('insight-detail:email-form')}
                  />
                  <PolicyAgreeCheckbox id="agree" />
                  <Button
                    text={t('insight-detail:send-form')}
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    onChange={() => {}}
                  />
                </fieldset>
              </form>
            </div>
          </div>
          <div className="postWysiwyg-more">
            {previous || next ? (
              <span className="postWysiwyg-moreTitle">{t('more-reads')}</span>
            ) : null}
            {previous ? (
              <div className="postWysiwyg-morePrev">
                <div className="postWysiwyg-morePost">
                  <Link
                    to={ROUTES.INSIGHT.linkTo({ slug: previous.slug })}
                    title=""
                  >
                    <img
                      className="postWysiwyg-morePost-image"
                      src={previous.thumbnailImage.url}
                      alt=""
                    />
                    <h4 className="postWysiwyg-morePost-title">
                      {previous.title}
                    </h4>
                  </Link>
                  <Link
                    classes="postWysiwyg-morePost-link"
                    to={ROUTES.INSIGHT.linkTo({ slug: previous.slug })}
                    title=""
                  >
                    <IconArrow />
                  </Link>
                </div>
              </div>
            ) : null}
            {next ? (
              <div className="postWysiwyg-moreNext">
                <div className="postWysiwyg-morePost">
                  <Link
                    to={ROUTES.INSIGHT.linkTo({ slug: next.slug })}
                    title=""
                  >
                    <img
                      className="postWysiwyg-morePost-image"
                      src={next.thumbnailImage.url}
                      alt=""
                    />
                    <h4 className="postWysiwyg-morePost-title">{next.title}</h4>
                  </Link>
                  <Link
                    classes="postWysiwyg-morePost-link"
                    to={ROUTES.INSIGHT.linkTo({ slug: next.slug })}
                    title=""
                  >
                    <IconArrow />
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </SectionWrapper>
      </div>

      <BackButton />
    </>
  )
}

export async function getServerSideProps({ query, locale }) {
  const slug = query.slug

  const insight = await findBySlug(ENDPOINTS.INSIGHTS, slug, locale)
  const insights = await getCollection(ENDPOINTS.INSIGHTS, locale)

  let previous = null
  let next = null

  if (insight && insights) {
    const index = insights.findIndex(p => p.slug === insight.slug)
    if (index < insights.length - 1) {
      next = insights[index + 1]
    }
    if (index > 0) {
      previous = insights[index - 1]
    }
  }

  if (!insight) {
    // NOTE: If the post is not found in the selected locale, it is
    // possible that the slug corresponds to another locale (because
    // the user has visited the URL through an external link), so we
    // check if the post exists in another locale.
    const insightInAnotherLocale = await findBySlug(
      ENDPOINTS.INSIGHTS,
      slug,
      SWITCH_LANGS[locale],
    )
    if (insightInAnotherLocale) {
      if (
        Array.isArray(insightInAnotherLocale.localizations) &&
        insightInAnotherLocale.localizations[0]
      ) {
        const id = insightInAnotherLocale.localizations[0].id

        const insightInCurrentLocale = await findById(
          ENDPOINTS.INSIGHTS,
          id,
          locale,
        )

        if (insightInCurrentLocale) {
          return {
            redirect: {
              destination: `${ROUTES.INSIGHTS.path}/${insightInCurrentLocale.slug}`,
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
    props: { current: insight, previous, next, changeLocale: false },
  }
}
