import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import * as ROUTES from '../config/routes'

import useTranslations from '../config/i18n/useTranslations'

import Input from '../components/input/Input'
import PolicyAgreeCheckbox from '../components/checkbox/PolicyAgreeCheckbox'
import Button from '../components/button/Button'

const PressForm = () => {
  
  const router = useRouter()
  const t = useTranslations()
  const form = useRef();


  const handleSubmit = async ev => {
    ev.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.NEXT_PUBLIC_SENDIBLUE_API,
      },
      body: JSON.stringify({
        sender: { email: 'web.mormedi@intercloud.es', name: 'mormedi' },
        to: [{ email: 'comunicacion@mormedi.com', name: 'mormedi' }],
        params: {
          NOMBRE: ev.target.name.value,
          EMAIL: ev.target.email.value,
          EMPRESA: ev.target.company.value,
          TELEFONO: ev.target.phone.value,
          MENSAJE: ev.target.message.value,
          FORM_TYPE: 'eventos',
        },
        subject: 'Formulario nuevas prensa y eventos',
        templateId: 5,
      }),
    }
    fetch('https://api.sendinblue.com/v3/smtp/email', options)
      .then(response => {
        console.log(response)
        router.push(ROUTES.CONFIRMATION.path)
      })
      .catch(err => {
        console.log(err)
        router.push(ROUTES.ERROR.path)
      })
   
  }

  return (
    <>
              <form
                className="contact-form"
                id="press-form"
                ref={form} 
                onSubmit={handleSubmit}
              >
                <label className="label">
                  {`* ${t('contact:required-fields')}`}
                </label>
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
                      id="email"
                      name="email"
                      placeholder={t('contact:your-email')}
                      type="email"
                    />
                    <Input
                      required
                      id="company"
                      name="company"
                      placeholder={t('contact:your-company')}
                    />
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
    </>
  )
}

export default PressForm
