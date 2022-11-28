import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { SlowMo } from 'gsap/dist/EasePack'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'
import FeaturedProject from './FeturedProject'
import useTranslations from '../../config/i18n/useTranslations'


const FeaturedProjects = ({ projects }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
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

  return (
    <section className="featuredProjects has-negative" ref={containerRef}>
      <SectionWrapper isSmall>
        <h4 className="featuredProjects-title" ref={titleRef}>
          {t('home:project-title')}
        </h4>
        {projects.map((project, index) => (
          <FeaturedProject
            cliente={project.client}
            title={project.title}
            media={project.coverImage.url}
            to={project.slug}
            key={index}
          />
        ))}


      </SectionWrapper>
    </section>
  )
}
export default FeaturedProjects
