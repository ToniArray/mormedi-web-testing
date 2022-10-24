import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { SlowMo } from 'gsap/dist/EasePack'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'

const AboutPartners = ({ logos }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const listRef = useRef(null)

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
    if (logos.length === 0) return () => false
    const blocks = listRef.current.querySelectorAll('li')
    gsap.to(blocks, {
      opacity: 1,
      y: '0%',
      duration: 0.6,
      stagger: 0.2,
      ease: new SlowMo(0.25, 0, 0.25, 1),
      scrollTrigger: {
        scroller: '.mainWrapper',
        trigger: listRef.current,
        start: 'top 75%',
      },
    })
  }, [logos])

  return (
    <section className="aboutPartners" ref={containerRef}>
      <SectionWrapper>
        <h4 className="aboutPartners-title" ref={titleRef}>
          Partners
        </h4>
        <ul className="aboutPartners-list" ref={listRef}>
          {logos.map((logo, index) => (
            <li key={index}>
              <img src={logo} alt="" />
            </li>
          ))}
        </ul>
      </SectionWrapper>
    </section>
  )
}

AboutPartners.protoTypes = {
  logos: PropTypes.arrayOf([PropTypes.string]).isRequired,
}

export default AboutPartners
