import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { SlowMo } from 'gsap/dist/EasePack'

import useTranslations from '../../config/i18n/useTranslations'
import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'

const AboutAwards = ({ awards }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const listRef = useRef(null)

  const t = useTranslations()
  const { mainWrapperRef } = useMainWrapper()

  useEffect(() => {
    const container = containerRef.current
    const title = titleRef.current
    if (!container || !title) return

    const anim = gsap.from(title, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: new SlowMo(0.25, 0, 0.25, 1),
      scrollTrigger: {
        trigger: container,
        scroller: mainWrapperRef.current,
        start: 'top center',
      },
    })

    return () => anim.kill()
  }, [containerRef, titleRef, mainWrapperRef])

  useEffect(() => {
    if (awards.length === 0) return () => false
    const lines = listRef.current.querySelectorAll('li')
    lines.forEach(line => {
      gsap.to(line, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: new SlowMo(0.25, 0, 0.25, 1),
        scrollTrigger: {
          scroller: '.mainWrapper',
          trigger: line,
          start: 'top 75%',
        },
      })
    })
  }, [awards])

  return (
    <section className="aboutAwards" ref={containerRef}>
      <SectionWrapper>
        <h4 className="aboutAwards-title" ref={titleRef}>
          {t('about:award-list')}
        </h4>
        <ul className="aboutAwards-list" ref={listRef}>
          {awards.map((award, index) => (
            <li key={index}>
              <p className="aboutAwards-listTitle">{award.title}</p>
              {award.badges.map(({ title }) => (
                <span className="aboutAwards-listItem" key={title}>
                  {title}
                </span>
              ))}
              <img
                className="aboutAwards-listImage"
                src={award.logo.url}
                alt="Logo"
              />
            </li>
          ))}
        </ul>
      </SectionWrapper>
    </section>
  )
}

AboutAwards.propTypes = {
  awards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      badges: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
        }),
      ).isRequired,
      logo: PropTypes.shape().isRequired,
    }),
  ).isRequired,
}

export default AboutAwards
