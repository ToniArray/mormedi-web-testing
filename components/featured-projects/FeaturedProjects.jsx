import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { SlowMo } from 'gsap/dist/EasePack'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'
import FeaturedProject from './FeturedProject'

const FeaturedProjects = ({ title, projects }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)

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
          {title}
        </h4>
        {projects.map((project, index) => (
          <FeaturedProject
            client={project.client.name}
            title={project.title}
            type={project.mediaLayout}
            media={project.media}
            to={project.to}
            key={index}
          />
        ))}
      </SectionWrapper>
    </section>
  )
}

FeaturedProjects.propTypes = {
  title: PropTypes.string,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      media: PropTypes.shape({
        url: PropTypes.string.isRequired,
        mime: PropTypes.string.isRequired,
        alternativeText: PropTypes.string,
      }),
    }),
  ).isRequired,
}

export default FeaturedProjects
