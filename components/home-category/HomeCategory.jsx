import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { SlowMo } from 'gsap/dist/EasePack'

import useTranslations from '../../config/i18n/useTranslations'
import { useMainWrapper } from '../../contexts/MainWrapperContext'
import useWindowSize from '../../hooks/useWindowSize'
import SectionWrapper from '../wrappers/SectionWrapper'

import ArrowLink from '../arrow-link/ArrowLink'

const HomeCategory = ({
  isScalable,
  intro,
  description,
  title,
  horizontalVideo,
  verticalVideo,
  to,
}) => {
  const { mainWrapperRef, setIsSnap } = useMainWrapper()
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const introRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const linkRef = useRef(null)
  const classes = cx('homeCategory', { 'is-scalable': isScalable })

  const t = useTranslations()
  const size = useWindowSize()

  useEffect(() => {
    const reference = videoRef.current
    if (!size.width || !isScalable || !reference) return

    const tirgger = {
      trigger: reference,
      start: 'center bottom',
      scroller: mainWrapperRef.current,
      end: 'top top',
      scrub: true,
      onLeave: () => setIsSnap(true),
      onEnterBack: () => setIsSnap(false),
    }

    ScrollTrigger.matchMedia({
      '(max-width: 666px)': () => {
        gsap.from(reference, {
          scale: 0.66,
          scrollTrigger: tirgger,
        })
      },
      '(min-width: 667px)': () => {
        gsap.from(reference, {
          scale: 0.33,
          scrollTrigger: tirgger,
        })
      },
    })
  }, [size.width, videoRef, isScalable, mainWrapperRef, setIsSnap])

  useEffect(() => {
    const intro = introRef.current
    const title = titleRef.current
    const description = descriptionRef.current
    const link = linkRef.current

    if (!title || !description || !link) return

    const anim = gsap
      .timeline({
        scrollTrigger: {
          scroller: mainWrapperRef.current,
          trigger: containerRef.current,
          start: 'top 10px',
        },
      })
      .to(intro ? [intro, title, description] : [title, description], {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: new SlowMo(0.25, 0, 0.25, 1),
        stagger: 0.2,
      })
      .to(
        link,
        {
          xPercent: 0,
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: new SlowMo(0.25, 0, 0.25, 1),
        },
        '-=0.2',
      )

    return () => anim.kill()
  }, [mainWrapperRef])

  return (
    <div className={classes} ref={containerRef}>
      {size.width ? (
        <div className="homeCategory-videoContainer" ref={videoRef}>
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
      <SectionWrapper>
        <div className="homeCategory-info">
          {intro ? (
            <span className="homeCategory-intro" ref={introRef}>
              {intro}
            </span>
          ) : null}
          <h2 className="homeCategory-title" ref={titleRef}>
            {title}
          </h2>
          <h3 className="homeCategory-description" ref={descriptionRef}>
            {description}
          </h3>
          <ArrowLink text={t('view')} to={to} title="" ref={linkRef} />
        </div>
      </SectionWrapper>
    </div>
  )
}

HomeCategory.propTypes = {
  isScalable: PropTypes.bool,
  intro: PropTypes.string,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  horizontalVideo: PropTypes.string.isRequired,
  verticalVideo: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default HomeCategory
