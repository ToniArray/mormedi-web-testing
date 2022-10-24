import React, { useEffect, createRef } from 'react'

import useTranslations from '../../config/i18n/useTranslations'

import SectionWrapper from '../wrappers/SectionWrapper'
import Carousel from '../carousel/Carousel'
import Services from '../services/Services'

import IconPlay from '../../public/icons/icon-play'
import IconChevron from '../../public/icons/icon-chevron'

const WhatWeDo = ({
  people = [],
  videoLanguage,
  onChangeVideoLanguage,
  services = [],
}) => {
  const wrappersRef = people.map(() => createRef())
  const videosRef = people.map(() => createRef())
  const servicesButtons = services.map(service => service.buttonText)
  const servicesDescriptions = services.map(service => service.description)

  const t = useTranslations()

  useEffect(() => {
    const pauseAll = () => {
      wrappersRef.forEach(wrapper =>
        wrapper.current.classList.remove('is-playing'),
      )
      videosRef.forEach(video => video.current.pause())
    }
    pauseAll()

    const togglePlay = (wrapper, index) => {
      if (wrapper.current.classList.contains('is-playing')) {
        if (!window.glideRunnig) pauseAll()
      } else {
        if (!window.glideRunnig) {
          pauseAll()
          wrapper.current.classList.add('is-playing')
          videosRef[index].current.play()
        }
      }
    }

    wrappersRef.forEach((wrapper, index) => {
      wrapper.current.addEventListener('click', () =>
        togglePlay(wrapper, index),
      )
      return wrapper.current.removeEventListener('click', () =>
        togglePlay(wrapper, index),
      )
    })
  }, [people, wrappersRef, videosRef])

  return (
    <section className="whatWeDo">
      <SectionWrapper>
        <div className="whatWeDo-languages">
          <div className="whatWeDo-languageSelect">
            <label htmlFor="subtitles">{t('what-we-do:subtitles')}</label>
            <select
              name="subtitles"
              id="subtitles"
              value={videoLanguage}
              onChange={ev => {
                onChangeVideoLanguage(ev.target.value)
              }}
            >
              <option value="spanish">{t('what-we-do:spanish')}</option>
              <option value="english">{t('what-we-do:english')}</option>
            </select>
            <IconChevron />
          </div>
        </div>
        <Carousel>
          {people.map(
            ({ person, englishVideo, spanishVideo, topic }, index) => (
              <div className="whatWeDo-slide" key={person.id + videoLanguage}>
                <div className="whatWeDo-videoWrapper" ref={wrappersRef[index]}>
                  <video
                    className="whatWeDo-video"
                    autoPlay
                    loop
                    playsInline
                    ref={videosRef[index]}
                  >
                    <source
                      src={
                        videoLanguage === 'spanish'
                          ? spanishVideo.url
                          : englishVideo.url
                      }
                      type="video/mp4"
                    />
                  </video>
                  <IconPlay />
                </div>
                <span className="whatWeDo-name">{person.name}</span>
                <p className="whatWeDo-rol">{topic}</p>
              </div>
            ),
          )}
        </Carousel>
      </SectionWrapper>
      {services.length > 0 ? (
        <Services
          buttons={servicesButtons}
          descriptions={servicesDescriptions}
        />
      ) : null}
    </section>
  )
}

export default WhatWeDo
