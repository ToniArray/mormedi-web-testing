import { useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import cx from 'classnames'

import useTranslations from '../config/i18n/useTranslations'

import { getSingle, sendEmail } from '../services/cms'

import * as ENDPOINTS from '../services/endpoints'
import * as ROUTES from '../config/routes'

import PageHeading from '../components/page-heading/PageHeading'
import SectionWrapper from '../components/wrappers/SectionWrapper'
import Button from '../components/button/Button'
import Input from '../components/input/Input'
import ContactTabs from '../components/tabs/ContactTabs'
import PolicyAgreeCheckbox from '../components/checkbox/PolicyAgreeCheckbox'
import User from '../components/user/User'

import IconClose from '../public/icons/icon-close'
import BusinessForm from '../components/business-form'

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
              <form
                className="contact-form"
                id="press-form"
                onSubmit={handleSubmit}
              >
                <label className="label">
                  {`* ${t('contact:required-fields')}`}
                </label>
                <div className="contact-form-content">
                  <fieldset className="contact-fieldset">
                    <Input
                      required
                      id="press-name"
                      name="name"
                      placeholder={t('contact:your-name')}
                      value={data.name || ''}
                      onChange={handleChange}
                    />
                    <Input
                      required
                      id="press-email"
                      name="email"
                      placeholder={t('contact:your-email')}
                      type="email"
                      value={data.email || ''}
                      onChange={handleChange}
                    />
                    <Input
                      required
                      id="press-company"
                      name="company"
                      placeholder={t('contact:your-company')}
                      value={data.company || ''}
                      onChange={handleChange}
                    />
                    <Input
                      required
                      id="press-phone"
                      name="phone"
                      placeholder={t('contact:phone-number')}
                      value={data.phone || ''}
                      onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className="contact-fieldset">
                    <div className="field">
                      <textarea
                        required
                        id="press-message"
                        name="message"
                        placeholder={t('contact:message')}
                        rows="2"
                        cols="30"
                        value={data.message || ''}
                        onChange={handleChange}
                      />
                      <label>{t('contact:message')}*</label>
                    </div>
                    <PolicyAgreeCheckbox id="press-agree" />
                  </fieldset>
                </div>
                <Button
                  type="submit"
                  width={60}
                  text={t('contact:send')}
                  aria-label="Submit"
                />
              </form>
            </div>
            <div
              className={cx('contactTabs-content tabs-content', {
                'is-active': selected === 'contact:tabs:join',
              })}
            >
              <form
                className="contact-form"
                id="join-form"
                onSubmit={handleSubmit}
              >
                <label className="label">
                  {`* ${t('contact:required-fields')}`}
                </label>
                <div className="contact-form-content">
                  <fieldset className="contact-fieldset">
                    <Input
                      required
                      id="join-name"
                      name="name"
                      placeholder={t('contact:your-name')}
                      value={data.name || ''}
                      onChange={handleChange}
                    />
                    <Input
                      required
                      id="join-email"
                      name="email"
                      placeholder={t('contact:your-email')}
                      type="email"
                      value={data.email || ''}
                      onChange={handleChange}
                    />
                    <div className="field">
                      <div className="dropButton">
                        {selectedFile !== null ? (
                          <div style={{ fontSize: '0.625rem' }}>
                            <span>{selectedFile.name}</span>
                            <span onClick={handleDeleteFile}>
                              <IconClose />
                            </span>
                          </div>
                        ) : (
                          <>
                            <input
                              required
                              id="join-cv"
                              name="cv"
                              type="file"
                              title=""
                              value=""
                              style={{ opacity: 0 }}
                              onChange={handleSelectFile}
                            />
                            <label htmlFor="join-cv">
                              {t('contact:upload-file')}
                            </label>
                          </>
                        )}
                      </div>

                      <label>{`${t('contact:your-cv')} *`}</label>
                    </div>
                    <Input
                      id="porfolio"
                      name="porfolio"
                      placeholder={t('contact:your-porfolio')}
                      value={data.porfolio || ''}
                      onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className="contact-fieldset">
                    <div className="field">
                      <textarea
                        required
                        id="join-profile"
                        name="profile"
                        placeholder={t('contact:what-profile')}
                        rows="2"
                        cols="30"
                        value={data.profile || ''}
                        onChange={handleChange}
                      />
                      <label>{`${t('contact:what-profile')} *`}</label>
                    </div>
                    <div className="field">
                      <textarea
                        required
                        id="join-message"
                        name="message"
                        placeholder={t('contact:message')}
                        rows="2"
                        cols="30"
                        value={data.message || ''}
                        onChange={handleChange}
                      />
                      <label>{t('contact:message')}*</label>
                    </div>
                    <PolicyAgreeCheckbox id="join-agree" />
                  </fieldset>
                </div>
                <Button
                  type="submit"
                  width={60}
                  text={t('contact:send')}
                  aria-label="Submit"
                />
              </form>
            </div>
          </ContactTabs>

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
