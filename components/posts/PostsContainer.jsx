import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import SectionWrapper from '../wrappers/SectionWrapper'

const PostsContainer = ({ children, hasWorks }) => {
  const classes = cx('postsContainer', { 'has-works': hasWorks })

  const parallax = () => {
    const covers = document.querySelectorAll('.postCover:not(.is-full)')

    const even = Array.from(covers).map((cover, index) =>
      index % 2 === 0 ? cover : null,
    )
    const odd = Array.from(covers).map((cover, index) =>
      index % 2 === 0 ? null : cover,
    )
    const filtered = {
      even: even.filter(cover => cover !== null),
      odd: odd.filter(cover => cover !== null),
    }

    covers.forEach((cover, index) =>
      index % 2 === 0 ? filtered.even.push(cover) : filtered.odd.push(cover),
    )

    const animation = (even, odd) => {
      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          even.forEach(cover =>
            gsap.fromTo(
              cover,
              {
                y: '15%',
              },
              {
                y: '-5%',
                scrollTrigger: {
                  scroller: '.mainWrapper',
                  trigger: cover,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.1,
                },
              },
            ),
          )
          odd.forEach(cover =>
            gsap.fromTo(
              cover,
              {
                y: '40%',
              },
              {
                y: '-10%',
                scrollTrigger: {
                  scroller: '.mainWrapper',
                  trigger: cover,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.1,
                },
              },
            ),
          )
        },
        '(max-width: 767px)': () => {
          even.forEach(cover => gsap.to(cover, { y: '0%' }))
          odd.forEach(cover => gsap.to(cover, { y: '0%' }))
        },
      })
    }

    animation(filtered.even, filtered.odd)
  }

  const killParallax = () => {
    ScrollTrigger.getAll().map(trigger =>
      trigger.trigger.classList.contains('postCover')
        ? trigger.kill(true)
        : null,
    )
  }

  useEffect(() => {
    killParallax()
    parallax()
  }, [children])

  return (
    <section className={classes}>
      <SectionWrapper>{children}</SectionWrapper>
    </section>
  )
}

PostsContainer.propTypes = {
  hasWorks: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default PostsContainer
