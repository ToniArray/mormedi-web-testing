import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'

import { SplitText } from 'gsap/dist/SplitText'
import { SlowMo } from 'gsap/dist/EasePack'

import SectionWrapper from '../wrappers/SectionWrapper'

const PageHeading = ({ title, description }) => {
  const wrapperRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  useEffect(() => {
    if (!titleRef.current) return

    const splitTitle = new SplitText(titleRef.current)

    gsap
      .timeline()
      .to(titleRef.current, {
        opacity: 1,
        duration: 0,
      })
      .to(splitTitle.lines, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: new SlowMo(0.25, 0, 0.25, 1),
      })
      .to(
        descriptionRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: new SlowMo(0.25, 0, 0.25, 1),
        },
        '-=0.2',
      )
      .fromTo(
        wrapperRef.current,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          scrollTrigger: {
            scroller: '.mainWrapper',
            trigger: wrapperRef.current,
            start: 'top 33.33%',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
  }, [title, description, titleRef])

  return (
    <section className="pageHeading">
      <SectionWrapper ref={wrapperRef}>
        <h1 className="pageHeading-title" ref={titleRef}>
          {title}
        </h1>
        <h2 className="pageHeading-description" ref={descriptionRef}>
          {description}
        </h2>
      </SectionWrapper>
    </section>
  )
}

PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default PageHeading
