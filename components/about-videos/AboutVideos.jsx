import React, { createRef, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'
import IconPlay from '../../public/icons/icon-play'

const AboutVideos = ({ videos }) => {
  const containerRef = useRef(null)
  const blocksRef = useRef(videos.map(() => createRef()))
  const videosRef = useRef(videos.map(() => createRef()))

  const { mainWrapperRef } = useMainWrapper()

  useEffect(() => {
    const blocks = blocksRef.current
    const players = videosRef.current
    if (blocks.length === 0 || players.length === 0) return false

    players.forEach(video => video.current.pause())
    blocks.forEach(block =>
      gsap.from(block.current, {
        scale: 0.8,
        opacity: 0.8,
        scrollTrigger: {
          trigger: block.current,
          scroller: mainWrapperRef.current,
          start: 'center bottom',
          end: 'center center',
          scrub: true,
        },
      }),
    )

    const pauseAll = () => {
      blocks.forEach(block => block.current.classList.remove('is-playing'))
      players.forEach(video => video.current.pause())
    }

    const togglePlay = (block, index) => {
      if (block.classList.contains('is-playing')) {
        pauseAll()
      } else {
        pauseAll()
        block.classList.add('is-playing')
        players[index].current.play()
      }
    }

    blocks.forEach((block, index) => {
      const blockNode = block.current
      blockNode.addEventListener('click', () => togglePlay(blockNode, index))
      return blockNode.removeEventListener('click', () =>
        togglePlay(blockNode, index),
      )
    })
  }, [videos, mainWrapperRef])

  return (
    <section className="aboutVideos" ref={containerRef}>
      <SectionWrapper>
        {videos.map((video, index) => (
          <div
            className="aboutVideos-block"
            ref={blocksRef.current[index]}
            key={index}
          >
            <div className="aboutVideos-videoWrapper">
              <video
                className="aboutVideos-video"
                autoPlay
                loop
                playsInline
                ref={videosRef.current[index]}
              >
                <source src={video.video.url} type="video/mp4" />
              </video>
              <IconPlay />
            </div>
            <p className="aboutVideos-videoPerson">{video.person}</p>
            <p className="aboutVideos-videoTitle">{video.title}</p>
          </div>
        ))}
      </SectionWrapper>
    </section>
  )
}

AboutVideos.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      video: PropTypes.shape().isRequired,
      title: PropTypes.string.isRequired,
      person: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default AboutVideos
