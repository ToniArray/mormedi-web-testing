import React, { useRef } from 'react'
import { useState } from 'react'

import { useRouter } from 'next/router'
import * as ROUTES from '../config/routes'
import IconClose from '../public/icons/icon-close'

import useTranslations from '../config/i18n/useTranslations'

import Input from './input/Input'
import PolicyAgreeCheckbox from './checkbox/PolicyAgreeCheckbox'
import Button from './button/Button'
import { CONFIG_FILES } from 'next/dist/shared/lib/constants'

const JobsForm = ({ buttons, descriptions }) => {
  const form = useRef()

  const router = useRouter()
  const t = useTranslations()

  const [selectedFile, setSelectedFile] = useState(null)
  const [nameFile, setNameFile] = useState(null)


  const handleDeleteFile = ev => {
    setSelectedFile(false)
    setNameFile(false)
  }

  const handleSelectFile = ev => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(ev.target.files[0])
    fileReader.onloadend = function () {
      let base64result = fileReader.result.split(',')[1]
      setSelectedFile(base64result)
      console.log(selectedFile);
      setNameFile(ev.target.files[0].name)
      console.log(selectedFile)
    }
  }

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
        to: [{ email: 'jobs@mormedi.com', name: 'mormedi' }],
        attachment: [
          {
            content: selectedFile,
            name: nameFile,
          },
        ],
        params: {
          NOMBRE: ev.target.name.value,
          EMAIL: ev.target.email.value,
          PERFIL: ev.target.profile.value,
          PORTAFOLIO: ev.target.porfolio.value,
          MENSAJE: ev.target.message.value,
          FORM_TYPE: 'join',
        },
        subject: 'Formulario jobs',
        templateId: 1,
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
        ref={form}
        className="contact-form"
        id="join-form"
        onSubmit={handleSubmit}
      >
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
              id="email"
              name="email"
              placeholder={t('contact:your-email')}
              type="email"
            />
            <div className="field">
              <div className="dropButton">
                 {nameFile? (
                  <div style={{ fontSize: '0.625rem',  position: 'relative' }}>
                    <span>{nameFile}</span>
                    <span onClick={handleDeleteFile} style={{ position: 'absolute', top:'-15px', right: '-15px', zIndex: '99999'}}>
                      <IconClose />
                    </span>
                  </div>
                ) : <><label htmlFor="join-cv">{t('contact:upload-file')}</label></>
                 }
                  <input
                      required
                      id="cv"
                      name="cv"
                      type="file"
                      style={{ opacity: 0 }}
                      onChange={handleSelectFile}
                    />
                    
              </div>

              <label>{`${t('contact:your-cv')} *`}</label>
            </div>
            <Input
              id="porfolio"
              name="porfolio"
              placeholder={t('contact:your-porfolio')}
            />
          </fieldset>
          <fieldset className="contact-fieldset">
            <div className="field">
              <textarea
                required
                id="profile"
                name="profile"
                placeholder={t('contact:what-profile')}
                rows="2"
                cols="30"
              />
              <label>{`${t('contact:what-profile')} *`}</label>
            </div>
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
    </>
  )
}

export default JobsForm
