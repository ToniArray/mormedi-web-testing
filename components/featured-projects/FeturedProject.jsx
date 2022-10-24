import { useEffect, useRef, useMemo } from 'react'
import cx from 'classnames'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'
import { SlowMo } from 'gsap/dist/EasePack'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

import Link from '../../components/link/Link'

const FeaturedProject = ({ client, title, type, to, media }) => {
  const mediaRef = useRef(null)
  const clientRef = useRef(null)
  const titleRef = useRef(null)
  const { mainWrapperRef } = useMainWrapper()

  const isVideo = useMemo(() => media.mime.includes('video'), [media.mime])

  useEffect(() => {
    const client = clientRef.current
    const title = titleRef.current
    if (!client || !title) return

    const splitTitle = new SplitText(title)

    const anim = gsap
      .timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          scroller: mainWrapperRef.current,
          start: 'top 75%',
        },
      })
      .from(client, {
        y: 40,
        opacity: 0,
        duration: 0.4,
        ease: new SlowMo(0.25, 0, 0.25, 1),
      })
      .from(
        splitTitle.lines,
        {
          opacity: 0,
          y: '50%',
          duration: 0.6,
          stagger: 0.2,
          ease: new SlowMo(0.25, 0, 0.25, 1),
        },
        '-=0.2',
      )

    return () => anim.kill()
  }, [mainWrapperRef])

  useEffect(() => {
    const reference = mediaRef.current
    if (!reference) return

    const anim = gsap.from(reference, {
      scale: 0.8,
      opacity: 0.8,
      scrollTrigger: {
        trigger: reference,
        scroller: mainWrapperRef.current,
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
    })

    return () => anim.kill()
  }, [mediaRef, mainWrapperRef])

  const classes = cx('featuredProjects-project', {
    'is-horizontal': type === 'horizontal',
    'is-vertical': type === 'vertical',
    'is-smallHorizontal': type === 'smallHorizontal',
  })

  return (
    <div className={classes}>
      <div className="featuredProjects-projectInfo">
        <span className="featuredProjects-projectClient" ref={clientRef}>
          {client}
        </span>
        <p className="featuredProjects-projectTitle">
          <Link to={to} title={title} ref={titleRef}>
            {title}
          </Link>
        </p>
      </div>
      <div className="featuredProjects-projectMedia" ref={mediaRef}>
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoad={() => ScrollTrigger.refresh()}
          >
            <source src={media.url} type="video/mp4" />
          </video>
        ) : (
          <img
            src={media.url}
            alt={media.alternativeText}
            onLoad={() => ScrollTrigger.refresh()}
          />
        )}
      </div>
    </div>
  )
}

export default FeaturedProject
