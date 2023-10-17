import Head from 'next/head'
import { useCallback, useState } from 'react'
import showdown from 'showdown'

// import AboutClaim from '../components/about-claim/AboutClaim'
import AboutMap from '../components/about-map/AboutMap'
import AboutSuccess from '../components/about-success/AboutSuccess'
import AboutVideos from '../components/about-videos/AboutVideos'

import PageHeading from '../components/page-heading/PageHeading'
import useTranslations from '../config/i18n/useTranslations'
import { getSingle } from '../services/cms'

import * as ROUTES from '../config/routes'
import * as ENDPOINTS from '../services/endpoints'

import AboutAwards from '../components/about-awards/AboutAwards'
import AboutExperts from '../components/about-experts/AboutExperts'
import AboutModal from '../components/about-modal/AboutModal'
import AboutPartners from '../components/about-partners/AboutPartners'

const EMPTY_PERSON = {
  name: '',
  role: '',
  picture: { url: '' },
  placeOfOrigin: '',
  linkedIn: '',
  biography: '',
}

export default function About({
  metaHeading = {},
  pageHeading = {},
  videos = [],
  worldButton = {},
  caption = {},
  successReasons = [],
  people = [],
  networkExperts = { experts: [] },
  partners = [],
  awards = [],
}) {
  const t = useTranslations()

  const [person, setPerson] = useState(null)
  const [modalData, setModalData] = useState(null)

  const converter = new showdown.Converter()

  const handlePersonClick = person => {
    const peopleModal = people.some(worker => worker.id === person.id)
    peopleModal ? setModalData(people) : setModalData(networkExperts.experts)
    setPerson(person)
  }

  const handleCloseModal = () => {
    setPerson(null)
  }

  const setNextPerson = useCallback(
    person => {
      const index = modalData.findIndex(p => p.id === person.id)
      const newPerson =
        index + 1 === modalData.length ? modalData[0] : modalData[index + 1]
      setPerson(newPerson)
    },
    [modalData],
  )

  const setPreviousPerson = useCallback(
    person => {
      const index = modalData.findIndex(p => p.id === person.id)
      const newPerson =
        index === 0 ? modalData[modalData.length - 1] : modalData[index - 1]
      setPerson(newPerson)
    },
    [modalData],
  )

  return (
    <>
      <Head>
        <title>
          {metaHeading ? metaHeading.metaTitle : t('seo:about-title')}
        </title>
        <meta
          name="description"
          content={
            metaHeading
              ? metaHeading.metaDescription
              : t('seo:about-description')
          }
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.ABOUT.path}`}
        />
      </Head>

      <PageHeading
        title={pageHeading.title}
        description={pageHeading.description}
      />

      <AboutVideos videos={videos} />

      {/* <AboutClaim title={caption.title} description={caption.description} /> */}

      <AboutMap buttonText={worldButton.title} to={worldButton.link} />

      <AboutSuccess
        list={successReasons}
        people={people}
        onPersonClick={handlePersonClick}
      />

      <AboutExperts
        title={networkExperts.title}
        description={networkExperts.description}
        experts={networkExperts.experts}
        onPersonClick={handlePersonClick}
      />

      <AboutPartners logos={partners.map(p => p.url)} />

      <AboutAwards awards={awards} />

      <AboutModal
        isOpen={person !== null}
        person={person === null ? EMPTY_PERSON : person}
        onClose={handleCloseModal}
        onNext={setNextPerson}
        onPrevious={setPreviousPerson}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(person ? person.biography : ''),
          }}
        ></div>
      </AboutModal>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const data = await getSingle(ENDPOINTS.ABOUT, locale)

  return {
    props: data,
  }
}
