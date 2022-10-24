import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

const useWysiwygParallax = (refs, isLoaded) => {
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    if (!isLoaded) return
    refs.forEach(imageContainer => {
      if (!imageContainer) return
      const image = imageContainer.querySelector('img')
      gsap.to(image, {
        y: '-5%',
        scrollTrigger: {
          scroller: '.mainWrapper',
          trigger: imageContainer,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.2,
        },
      })
    })
  }, [refs, isLoaded])
}

export default useWysiwygParallax
