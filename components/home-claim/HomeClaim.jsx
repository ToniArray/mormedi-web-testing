import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'
import { SlowMo } from 'gsap/dist/EasePack'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'
import ArrowLink from '../arrow-link/ArrowLink'

import IconArrowLong from '../../public/icons/icon-arrow-long'

const HomeClaim = ({ title, description, buttonLink, words }) => {
  const { mainWrapperRef, setIsSnap } = useMainWrapper()
  const containerRef = useRef(null)
  const initialDateRef = useRef(null)
  const arrowRef = useRef(null)
  const dateRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const wordsRef = useRef(null)
  const [year, setYear] = useState(1997)
  const converter = new showdown.Converter()

  useEffect(() => {
    const reference = containerRef.current
    if (!reference) return

    const anim = ScrollTrigger.create({
      trigger: reference,
      start: 'top top',
      scroller: mainWrapperRef.current,
      onEnter: () => setIsSnap(false),
      onLeaveBack: () => setIsSnap(true),
    })

    return () => anim.kill()
  }, [mainWrapperRef, setIsSnap])

  useEffect(() => {
    const container = containerRef.current
    const initialDate = initialDateRef.current
    const arrow = arrowRef.current
    const date = dateRef.current
    if (!container) return

    const currentYear = new Date().getFullYear()
    const duration = 0.8

    const anim = gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 25%',
          scroller: mainWrapperRef.current,
        },
      })
      .from(initialDate, {
        opacity: 0,
        duration: duration,
      })
      .from(
        arrow,
        {
          x: -16,
          opacity: 0,
          duration: duration,
        },
        `-=${duration / 2}`,
      )
      .from(
        date,
        {
          opacity: 0,
          duration: duration,
          onStart: () => {
            let initialYear = year
            const increment = () => {
              setYear(initialYear++)
              if (initialYear === currentYear) {
                clearInterval(interval)
                setYear('Today')
              }
            }
            const interval = setInterval(increment, 100)
          },
        },
        `-=${duration / 2}`,
      )

    return () => anim.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRef, mainWrapperRef])

  useEffect(() => {
    const title = titleRef.current
    const description = descriptionRef.current
    if (!title || !description) return

    const splitTitle = new SplitText(titleRef.current)

    const anim = gsap
      .timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          scroller: mainWrapperRef.current,
          start: 'top 25%',
        },
      })
      .from(splitTitle.lines, {
        opacity: 0,
        y: '50%',
        duration: 0.6,
        stagger: 0.2,
        ease: new SlowMo(0.25, 0, 0.25, 1),
      })
      .from(
        descriptionRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.4,
          ease: new SlowMo(0.25, 0, 0.25, 1),
        },
        '-=0.2',
      )

    return () => anim.kill()
  }, [titleRef, descriptionRef, mainWrapperRef])

  useEffect(() => {
    const reference = wordsRef.current
    if (!reference) return

    const anim = gsap.timeline().to(reference, {
      x: '-50%',
      force3D: false,
      duration: 16,
      ease: 'none',
      repeat: -1,
      // overwrite: true,
    })

    return () => anim.kill()
  }, [wordsRef])

  return (
    <section className="homeClaim" ref={containerRef}>
      <SectionWrapper>
        <div className="homeClaim-timer">
          <span ref={initialDateRef}>1998</span>
          <div className="homeClaim-timerArrow" ref={arrowRef}>
            <IconArrowLong />
          </div>
          <span ref={dateRef}>{year}</span>
        </div>
        <div className="homeClaim-info">
          <h4 className="homeClaim-infoTitle" ref={titleRef}>
            {title}
          </h4>
          <div
            className="homeClaim-infoDescription"
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(description),
            }}
            ref={descriptionRef}
          />
          <ArrowLink text={buttonLink.title} to={buttonLink.link} title="" />
        </div>
      </SectionWrapper>
      <div className="homeClaim-carousel">
        <div className="homeClaim-carouselWrapper" ref={wordsRef}>
          {words.map((word, index) => (
            <span key={`words-${index}`} className="homeClaim-carouselWord">
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

HomeClaim.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonLink: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
  }),
  words: PropTypes.arrayOf(PropTypes.string),
}

export default HomeClaim
