import React, { createRef, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'
import { SlowMo } from 'gsap/dist/EasePack'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'

const AboutExperts = ({ title, description, experts, onPersonClick }) => {
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const blocksRef = experts.map(() => createRef())

  const { mainWrapperRef } = useMainWrapper()

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
          start: 'top center',
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
    if (blocksRef.length === 0) return () => false

    // blocksRef.forEach(block =>
    //   gsap.from(block.current, {
    //     opacity: 0,
    //     y: 40,
    //     duration: 0.6,
    //     ease: new SlowMo(0.25, 0, 0.25, 1),
    //     scrollTrigger: {
    //       scroller: mainWrapperRef.current,
    //       trigger: block.current,
    //       start: 'top center',
    //     },
    //   }),
    // )
  }, [blocksRef, mainWrapperRef])

  return (
    <section className="aboutExperts">
      <SectionWrapper>
        <div className="aboutExperts-info">
          <h4 className="aboutExperts-title" ref={titleRef}>
            {title}
          </h4>
          <p className="aboutExperts-description" ref={descriptionRef}>
            {description}
          </p>
        </div>
        <ul className="aboutExperts-list">
          {experts.map((expert, index) => (
            <li ref={blocksRef[index]} key={expert.name}>
              <button
                className="aboutExperts-modalButton"
                aria-label="Modal button"
                onClick={() => !window.glideRunnig && onPersonClick(expert)}
              >
                <img
                  className="aboutExperts-personImage"
                  src={expert.picture.url}
                  alt=""
                />
                <p className="aboutExperts-personRol">{expert.role}</p>
                <p className="aboutExperts-personName">{expert.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </SectionWrapper>
    </section>
  )
}

AboutExperts.propTypes = {
  experts: PropTypes.arrayOf(
    PropTypes.shape({
      picture: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default AboutExperts
