import React, { useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import gsap from 'gsap'

import SectionWrapper from '../wrappers/SectionWrapper'
import useTranslations from '../../config/i18n/useTranslations'

import IconArrow from '../../public/icons/icon-arrow'

const BackButton = () => {
  const buttonRef = useRef(null)
  const router = useRouter()
  const t = useTranslations()

  const pushBack = () => router.back()

  useLayoutEffect(() => {
    gsap.to(buttonRef.current, {
      opacity: 0,
      scrollTrigger: {
        scroller: '.mainWrapper',
        trigger: buttonRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  return (
    <div className="backButton" ref={buttonRef}>
      <SectionWrapper>
        <button className="backButton-button" onClick={pushBack}>
          <IconArrow />
          <span>{t('back-button')}</span>
        </button>
      </SectionWrapper>
    </div>
  )
}

export default BackButton
