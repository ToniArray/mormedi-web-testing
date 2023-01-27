import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import * as ROUTES from '../config/routes'
import emailjs from '@emailjs/browser'

import useTranslations from '../config/i18n/useTranslations'

import Input from '../components/input/Input'
import PolicyAgreeCheckbox from '../components/checkbox/PolicyAgreeCheckbox'
import Button from '../components/button/Button'

const BusinessForm = ({ buttons, descriptions }) => {
  const YOUR_SERVICE_ID = 'service_1tu0da7'
  const YOUR_TEMPLATE_ID = 'template_boi9x4u'
  const YOUR_PUBLIC_KEY = 'XaXi12p230JfJqZgB'
  
  const router = useRouter()
  const t = useTranslations()
  const form = useRef();


  const handleSubmit = async ev => {
    ev.preventDefault()
      emailjs
      .sendForm(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        form.current,
        YOUR_PUBLIC_KEY,
      )
      .then(
        result => {
          router.push(ROUTES.CONFIRMATION.path)
        },
        error => {
          router.push(ROUTES.ERROR.path)
        },
      )  
  }

  return (
    <>
      <form  ref={form} className="contact-form" id="business-form" onSubmit={handleSubmit}>
        <label className="label">{`* ${t('contact:required-fields')}`}</label>
        <div className="contact-form-content">
          <fieldset className="contact-fieldset">
            <Input
              required
              id="name"
              name="name"
              placeholder={t('contact:your-name')}
            />
            <Input
              required
              type="email"
              id="email"
              name="email"
              placeholder={t('contact:your-email')}
            />
            <div className="field">
              <select required id="city" name="city">
                <option value=""></option>
                <option value="Madrid">Madrid</option>
                <option value="Tokio">Tokio</option>
                <option value="Mexico City">Mexico City</option>
                <option value="London">London</option>
              </select>
              <label>{`${t('contact:select-office')}*`}</label>
            </div>
            <Input
              required
              id="phone"
              name="phone"
              placeholder={t('contact:phone-number')}
            />
          </fieldset>
          <fieldset className="contact-fieldset">
            <div className="field">
              <textarea
                required
                id="message"
                name="message"
                placeholder={t('contact:message')}
                rows="2"
                cols="30"
              />
              <label>{t('contact:message')}*</label>
            </div>
            <PolicyAgreeCheckbox id="business-agree" />
          </fieldset>
        </div>
        <Button
          type="submit"
          width={60}
          text={t('contact:send')}
          aria-label="Submit"
        />
      </form>
    </>
  )
}

export default BusinessForm
