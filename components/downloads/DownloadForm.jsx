import React, { useState } from 'react'

import useTranslations from '../../config/i18n/useTranslations'

import SectionWrapper from '../wrappers/SectionWrapper'
import Input from '../input/Input'
import SubscribeCheckbox from '../checkbox/SubscribeCheckbox'
import PolicyAgreeCheckbox from '../checkbox/PolicyAgreeCheckbox'
import Button from '../button/Button.jsx'

const DownloadForm = ({ title, onFormSubmit }) => {
  const t = useTranslations()

  const [data, setData] = useState({})
  const [shouldSubscribe, setShouldSubscribe] = useState(false)

  const handleSubscribeChange = ev => {
    setShouldSubscribe(!shouldSubscribe)
  }

  const handleChange = ev => {
    const { name, value } = ev.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = ev => {
    ev.preventDefault()

    const formData = new FormData()

    formData.append(
      'data',
      JSON.stringify({
        subject: `Download ${title}`,
        body: JSON.stringify(data, null, 2),
      }),
    )

    onFormSubmit(formData)

    if (shouldSubscribe) {
      document.dispatchEvent(
        new CustomEvent('subscribe-newsletter', {
          bubbles: true,
          detail: data.email,
        }),
      )
    }
  }

  return (
    <div className="downloadForm">
      <SectionWrapper>
        <form id="download-form" onSubmit={handleSubmit}>
          <div className="downloadForm-overlay">
            <p className="downloadForm-overlayText">
              {t('download:text-detail')}
            </p>
          </div>
          <fieldset className="contact-fieldset">
            <Input
              required
              id="name"
              name="name"
              placeholder={t('download:name')}
              value={data.name || ''}
              onChange={handleChange}
            />
            <Input
              required
              type="email"
              id="email"
              name="email"
              placeholder={t('download:email')}
              value={data.email || ''}
              onChange={handleChange}
            />
            <Input
              required
              id="company"
              name="company"
              placeholder={t('download:company')}
              value={data.company || ''}
              onChange={handleChange}
            />
            <PolicyAgreeCheckbox id="agree" />
            <SubscribeCheckbox
              checked={shouldSubscribe}
              onChange={handleSubscribeChange}
            />
            <Button type="submit" text={t('contact:send')} />
          </fieldset>
        </form>
      </SectionWrapper>
    </div>
  )
}

export default DownloadForm
