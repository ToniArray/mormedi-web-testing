import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'

import { SplitText } from 'gsap/dist/SplitText'
import { SlowMo } from 'gsap/dist/EasePack'

import useTranslations from '../../config/i18n/useTranslations'
import useWindowSize from '../../hooks/useWindowSize'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'
import ArrowLink from '../arrow-link/ArrowLink'

const WorkCategory = ({
  horizontalVideo,
  verticalVideo,
  title,
  clientLogos,
  slug,
}) => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  const t = useTranslations()
  const size = useWindowSize()

  const { mainWrapperRef, setIsSnap } = useMainWrapper()

  useEffect(() => {
    const reference = sectionRef.current
    if (!reference) return

    setIsSnap(true)

    const link = reference.querySelector('.arrowLink')
    const title = reference.querySelector('.workCategory-title')
    const clients = reference.querySelectorAll('.workCategory-clients li')
    const filters = document.querySelector('.filtersModal')
    const splitTitle = new SplitText(title)
    const ease = new SlowMo(0.25, 0, 0.25, 1)

    const tl = gsap
      .timeline({
        scrollTrigger: {
          scroller: mainWrapperRef.current,
          trigger: reference,
          start: 'top 10px',
        },
      })
      .to(titleRef.current, {
        opacity: 1,
        duration: 0,
      })
      .to(splitTitle.lines, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: ease,
      })
      .to(
        link,
        {
          xPercent: 0,
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: ease,
        },
        '-=0.2',
      )
      .to(
        filters,
        {
          opacity: 1,
          duration: 0.4,
        },
        '-=0.2',
      )
      .to(
        clients,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: ease,
        },
        '-=0.2',
      )
    return () => tl.kill()
  }, [mainWrapperRef, sectionRef])

  return (
    <div className="workCategory" ref={sectionRef}>
      {size.width ? (
        <div className="homeCategory-videoContainer">
          {size.width >= 667 ? (
            <video
              className="homeCategory-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={horizontalVideo} type="video/mp4" />
            </video>
          ) : (
            <video
              className="homeCategory-video is-vertical"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={verticalVideo} type="video/mp4" />
            </video>
          )}
        </div>
      ) : null}
      <SectionWrapper isLarge>
        <div className="workCategory-info">
          <h2 className="workCategory-title" ref={titleRef}>
            {title}
          </h2>
          <ArrowLink
            text={t('view')}
            to={`/categories/${slug}`}
            title={`View ${title}`}
          />
        </div>
        <ul className="workCategory-clients">
          {clientLogos.map((logo, idx) => (
            <li key={idx}>
              <img className="workCategory-clientsLink" src={logo} alt="" />
            </li>
          ))}
        </ul>
      </SectionWrapper>
    </div>
  )
}

WorkCategory.propTypes = {
  horizontalVideo: PropTypes.string.isRequired,
  verticalVideo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default WorkCategory
