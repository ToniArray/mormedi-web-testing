import { useRef, useEffect } from 'react'
import cx from 'classnames'

import SectionWrapper from '../wrappers/SectionWrapper'

import { useNewsletter } from '../../contexts/NewsletterContext'

import useTranslations from '../../config/i18n/useTranslations'
import IconArrowRight from '../../public/icons/icon-arrow-right'

const Newsletter = ({ language }) => {
  const t = useTranslations()
  const formRef = useRef(null)
  const emailRef = useRef(null)
  const { ref, isOpen } = useNewsletter()

  const classes = cx('newsletter', { 'is-hidden': !isOpen })

  const action =
    language === 'en'
      ? 'https://mormedi.us5.list-manage.com/subscribe/post?u=41565fa367e712a6a34ade89f&amp;id=b246f12cbd'
      : 'https://mormedi.us5.list-manage.com/subscribe/post?u=41565fa367e712a6a34ade89f&amp;id=e19583121c'

  const token =
    language === 'en'
      ? 'b_41565fa367e712a6a34ade89f_b246f12cbd'
      : 'b_41565fa367e712a6a34ade89f_e19583121c'

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
    <div ref={ref} className={classes} id="mc_embed_signup">
      <SectionWrapper>
        <form
          ref={formRef}
          action={action}
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          noValidate
        >
          <div id="mc_embed_signup_scroll">
            <p className="newsletter-title">Newsletter</p>
            <div className="mc-field-group">
              <input
                ref={emailRef}
                type="email"
                name="EMAIL"
                className="required email"
                id="mce-EMAIL"
                placeholder={`${t('newsletter:email')}*`}
              />
            </div>
            <div id="mce-responses" className="clear">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: 'none' }}
              ></div>
              <div
                className="response"
                id="mce-success-response"
                style={{ display: 'none' }}
              ></div>
            </div>
            <div
              style={{ position: 'absolute', left: '-5000px' }}
              aria-hidden="true"
            >
              <input type="text" name={token} tabIndex="-1" />
            </div>
            <button className="clear buttonBorder">
              <svg className="buttonBorder-line" height="50">
                <rect fill="none" />
              </svg>
              <input
                type="submit"
                value={t('send')}
                name="subscribe"
                id="mc-embedded-subscribe"
                className="button"
                onChange={() => {}}
              />
              <IconArrowRight classes="buttonBorder-arrow" />
            </button>
          </div>
        </form>
      </SectionWrapper>
    </div>
  )
}

export default Newsletter
