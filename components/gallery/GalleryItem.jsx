import { useEffect, useRef, useMemo } from 'react'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

const GalleryItem = ({ media }) => {
  const containerRef = useRef(null)
  const { mainWrapperRef } = useMainWrapper()

  const isVideo = useMemo(() => media.mime.includes('video'), [media.mime])

  useEffect(() => {
    const reference = containerRef.current
    if (!reference) return

    const anim = gsap.from(reference, {
      scale: 0.6,
      opacity: 0.4,
      scrollTrigger: {
        trigger: reference,
        scroller: mainWrapperRef.current,
        start: 'bottom bottom',
        end: 'bottom center',
        scrub: true,
      },
    })

    return () => anim.kill()
  }, [containerRef, mainWrapperRef])

  return (
    <div className="gallery-item" ref={containerRef}>
      {isVideo ? (
        <video
          className="gallery-itemMedia"
          onLoad={() => ScrollTrigger.refresh()}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={media.url} type="video/mp4" />
        </video>
      ) : (
        <img
          className="gallery-itemMedia"
          onLoad={() => ScrollTrigger.refresh()}
          src={media.url}
          alt={media.alternativeText}
        />
      )}
    </div>
  )
}

export default GalleryItem
