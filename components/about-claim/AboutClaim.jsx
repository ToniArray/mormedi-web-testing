import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'
import gsap from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'
import { SlowMo } from 'gsap/dist/EasePack'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'

const AboutClaim = ({ title, description }) => {
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const converter = new showdown.Converter()

  const { mainWrapperRef } = useMainWrapper()

  useEffect(() => {
    if (!titleRef.current) return

    const splitTitle = new SplitText(titleRef.current)

    const anim = gsap
      .timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          scroller: mainWrapperRef.current,
          start: 'top center',
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

    return () => anim.kill()
  }, [title, description, titleRef, mainWrapperRef])

  return (
    <section className="aboutClaim has-negative">
      <SectionWrapper isSmall>
        <h3 className="aboutClaim-title" ref={titleRef}>
          {title}
        </h3>
        <h4
          className="aboutClaim-description"
          ref={descriptionRef}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(description),
          }}
        />
      </SectionWrapper>
    </section>
  )
}

AboutClaim.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default AboutClaim
