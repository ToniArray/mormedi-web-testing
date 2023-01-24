import React, { useState } from "react";
import { useRouter } from 'next/router'
import * as ROUTES from '../config/routes'


import useTranslations from '../config/i18n/useTranslations'

import Input from '../components/input/Input'
import PolicyAgreeCheckbox from '../components/checkbox/PolicyAgreeCheckbox'
import Button from '../components/button/Button'
import { sendEmail } from '../services/cms'

const BusinessForm = ({ buttons, descriptions }) => {
  const router = useRouter()
  const t = useTranslations()


  const handleSubmit = async ev => {
    ev.preventDefault()
    const formData = {
      name:  ev.target.name.value,
      email: ev.target.email.value,
      city: ev.target.city.value,
      phone: ev.target.phone.value,
      message: ev.target.message.value,
      subject: 'Formulario de contacto Empresas',
    }
    console.log(formData);


  const result = await sendEmail(formData)
      if (result.success) {
      router.push(ROUTES.CONFIRMATION.path)
    } else {
      router.push(ROUTES.ERROR.path)
    } 
  }

  return (
    <>
      <form className="contact-form" id="business-form" onSubmit={handleSubmit}>
        <label className="label">{`* ${t('contact:required-fields')}`}</label>
        <div className="contact-form-content">
          <fieldset className="contact-fieldset">
            <Input
              required
              id="business-name"
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
              <select
                required
                id="city"
                name="city"
              >
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
