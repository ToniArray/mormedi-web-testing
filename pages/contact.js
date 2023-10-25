import { useState } from 'react'

import cx from 'classnames'
import Head from 'next/head'
import { useRouter } from 'next/router'

import useTranslations from '../config/i18n/useTranslations'

import { getSingle, sendEmail } from '../services/cms'

import * as ROUTES from '../config/routes'
import * as ENDPOINTS from '../services/endpoints'

import PageHeading from '../components/page-heading/PageHeading'
import ContactTabs from '../components/tabs/ContactTabs'
import User from '../components/user/User'
import SectionWrapper from '../components/wrappers/SectionWrapper'

import BusinessForm from '../components/business-form'
import JobsForm from '../components/jobs-form'
import PressForm from '../components/press-form'

const titles = [
  'contact:tabs:business',
  'contact:tabs:press',
  'contact:tabs:join',
]

export default function Contact({
  metaHeading = {},
  pageHeading = {},
  people = [],
}) {
  const { title = '', description = '' } = pageHeading
  const [selected, setSelected] = useState('contact:tabs:business')
  const [data, setData] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)
  const router = useRouter()

  const t = useTranslations()

  const handleChange = ev => {
    const { name, value } = ev.target
    setData({ ...data, [name]: value })
  }

  const handleSelectFile = ev => {
    setSelectedFile(ev.target.files[0])
  }

  const handleDeleteFile = ev => {
    setSelectedFile(null)
  }

  const handleSubmit = async ev => {
    ev.preventDefault()
    const result = await sendEmail(formData)
    if (result.success) {
      router.push(ROUTES.CONFIRMATION.path)
    } else {
      router.push(ROUTES.ERROR.path)
    }
  }

  const handleChangeTab = title => {
    setData({})
    setSelected(title)
  }

  return (
    <>
      <Head>
        <title>
          {metaHeading ? metaHeading.metaTitle : t('seo:contact-title')}
        </title>
        <meta
          name="description"
          content={
            metaHeading
              ? metaHeading.metaDescription
              : t('seo:contact-description')
          }
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.CONTACT.path}`}
        />
      </Head>

      <PageHeading title={title} description={description} />
      <section className="contact-wrapper">
        <SectionWrapper>
          <div className="contact-message">
            <p>
              {t('contact:message-email', {
                email1: (
                  <a href="mailto:hi@mormedi.com" target="_blank">
                    hi@mormedi.com
                  </a>
                ),
                link: (
                  <a href="jobs@mormedi.com" target="_blank">
                    {t('contact:literal-link')}
                  </a>
                ),
              })}
            </p>
          </div>
          <div style={{ display: 'none' }}>
            <ContactTabs
              titles={titles}
              selected={selected}
              onChangeTab={handleChangeTab}
            >
              <div
                className={cx('contactTabs-content tabs-content', {
                  'is-active': selected === 'contact:tabs:business',
                })}
              >
                <BusinessForm />
              </div>
              <div
                className={cx('contactTabs-content tabs-content', {
                  'is-active': selected === 'contact:tabs:press',
                })}
              >
                <PressForm />
              </div>
              <div
                className={cx('contactTabs-content tabs-content', {
                  'is-active': selected === 'contact:tabs:join',
                })}
              >
                <JobsForm />
              </div>
            </ContactTabs>
          </div>

          <div className="contact-sidebar">
            <h3 className="contact-sidebar-title">
              {t('contact:general-inquires')}
            </h3>
            <a className="contact-sidebar-link" href="mailto:hi@mormedi.com">
              hi@mormedi.com
            </a>
            <hr className="contact-divider" />
            {people.map(person => (
              <User
                key={person.name}
                image={person.picture.url}
                name={person.name}
                role={person.role}
                url={person.linkedIn}
              />
            ))}
          </div>
        </SectionWrapper>
      </section>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const data = await getSingle(ENDPOINTS.CONTACT_PAGE, locale)

  return {
    props: data,
  }
}
