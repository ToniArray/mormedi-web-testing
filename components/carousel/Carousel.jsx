import React, { useEffect, useRef } from 'react'

import { Splide, SplideSlide } from '@splidejs/react-splide'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { SlowMo } from 'gsap/dist/EasePack'

const Carousel = ({ children }) => {
  const slidesRefs = useRef([])
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    if (children.length === 0) return () => false

    slidesRefs.current.forEach((slide, index) =>
      gsap.to(slide, {
        opacity: 1,
        y: '0%',
        duration: 0.6,
        delay: index * 0.2,
        ease: new SlowMo(0.25, 0, 0.25, 1),
        scrollTrigger: {
          scroller: '.mainWrapper',
          trigger: slide,
          start: 'top 75%',
        },
      }),
    )
  }, [children])

  return (
    <Splide
      className="carousel"
      options={{
        arrows: false,
        pagination: false,
        autoWidth: true,
        gap: '64px',
        lazyLoad: true,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <SplideSlide>
          {React.cloneElement(child, {
            ref: ref => (slidesRefs.current[index] = ref),
          })}
        </SplideSlide>
      ))}
    </Splide>
  )
}

export default Carousel
