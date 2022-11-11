import Head from 'next/head'
import showdown from 'showdown'

import FeaturedProjects from '../components/featured-projects/FeaturedProjects'
import Gallery from '../components/gallery/Gallery'
import Hero from '../components/hero/Hero'
import HomeCategory from '../components/home-category/HomeCategory'
import HomeClaim from '../components/home-claim/HomeClaim'
import SnapSection from '../components/snap-section/SnapSection'
import ContactButton from '../components/contact-button/ContactButton'

import useTranslations from '../config/i18n/useTranslations'

import { getSingle } from '../services/cms'
import * as ENDPOINTS from '../services/endpoints'
import * as ROUTES from '../config/routes'

export default function Home({
  metaHeading,
  heroText,
  gallery,
  categories,
  projectsSection,
}) {
  const t = useTranslations()

  const claim = { 
    description: t('home:description'),
    title: t('home:title'),
    buttonLink: { 
      title: t('home:buttonLinkTitle'),
      link: t('home:buttonLink'),
    },
    words: [
      t('home:wordsForesight'),
      t('home:wordsStrategy'),
      t('home:wordsDesign'),
      t('home:wordsForesight'),
      t('home:wordsStrategy'),
      t('home:wordsDesign'),
    ] }  


  return (
    <>
      <Head>
        <title>
          {metaHeading ? metaHeading.metaTitle : t('seo:home-title')}
        </title>
        <meta
          name="description"
          content={
            metaHeading
              ? metaHeading.metaDescription
              : t('seo:home-description')
          }
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.HOME.path}`}
        />
      </Head>

      <>
        <SnapSection isEnd isNegative>
          <Hero title={heroText} />
          <Gallery items={gallery} />
          {categories[0] ? (
            <HomeCategory
              isScalable
              intro={categories[0].intro}
              title={categories[0].category.title}
              description={categories[0].category.description}
              to={`/categories/${categories[0].category.slug}`}
              horizontalVideo={categories[0].horizontalVideo?.url}
              verticalVideo={categories[0].verticalVideo?.url}
            />
          ) : null}
        </SnapSection>

        {categories
          .slice(1)
          .map(({ intro, category, horizontalVideo, verticalVideo }, index) => (
            <SnapSection isNegative key={`${category.slug}-${index}`}>
              <HomeCategory
                intro={intro}
                title={category.title}
                description={category.description}
                to={`/categories/${category.slug}`}
                horizontalVideo={horizontalVideo.url}
                verticalVideo={verticalVideo.url}
              />
            </SnapSection>
          ))}

    {     <SnapSection>
          <HomeClaim
            title={claim.title}
            description={claim.description}
            buttonLink={claim.buttonLink}
            words={claim.words}
          />
         {/*  <FeaturedProjects
            title={projectsSection.title}
            projects={projectsSection.featuredProjects}
          /> */}
          <ContactButton />
        </SnapSection> }
      </>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const data = await getSingle(ENDPOINTS.HOME, locale)

  const converter = new showdown.Converter()

  const {
    metaHeading = {},
    heroText = '',
    gallery = [],
    categories = [],
    projectsSection = { projects: [] },
  } = data

  

  const featuredProjects = projectsSection.projects.map(
    ({ mediaLayout, media, project }) => ({
      mediaLayout,
      media,
      to: `/projects/${project.slug}`,
      ...project,
    }),
  )

  const galleryItems = gallery.map(({ item }) => item)


  return {
    props: {
      metaHeading: metaHeading,
      heroText: heroText,
      gallery: galleryItems,
      categories: categories,
      projectsSection: { ...projectsSection, featuredProjects },
    },
  }
}
