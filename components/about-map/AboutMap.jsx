import gsap from 'gsap'
import { SlowMo } from 'gsap/dist/EasePack'
import { SplitText } from 'gsap/dist/SplitText'
import { useEffect, useRef, useState } from 'react'

import useTranslations from '../../config/i18n/useTranslations'
import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'

const AboutMap = ({ buttonText, to }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const buttonRef = useRef(null)
  const [transform, setTransform] = useState({
    x: 0,
    y: 0,
  })

  const t = useTranslations()
  const { mainWrapperRef } = useMainWrapper()

  useEffect(() => {
    const container = containerRef.current
    const title = titleRef.current
    if (!container || !title) return

    const splitTitle = new SplitText(titleRef.current)

    const anim = gsap.from(splitTitle.lines, {
      opacity: 0,
      y: '50%',
      duration: 0.6,
      stagger: 0.2,
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
    const reference = buttonRef.current
    if (!reference) return

    reference.addEventListener('mousemove', e => {
      const position = reference.getBoundingClientRect()
      const x = e.pageX - position.left - position.width / 2
      const y = e.pageY - position.top - position.height / 2

      setTransform({
        x: x * 0.4,
        y: y * 0.4,
      })
    })

    reference.addEventListener('mouseout', () =>
      setTransform({
        x: 0,
        y: 0,
      }),
    )
  }, [buttonRef])

  return (
    <section className="aboutMap" ref={containerRef}>
      <SectionWrapper>
        <h3 className="aboutMap-title" ref={titleRef}>
          {t('about:map')}
        </h3>
        <div
          className="aboutMap-button"
          style={{ transform: `translate(${transform.x}px, ${transform.y}px)` }}
          ref={buttonRef}
        >
          <a className="aboutMap-buttonLink" href={to}>
            <span className="aboutMap-buttonText">{buttonText}</span>
          </a>
        </div>
        <img className="aboutMap-map" src="/images/map.png" alt="Map" />
        <div className="aboutMap-cities">
          <ul className="aboutMap-citiesList">
            <li className="aboutMap-citiesList-title">
              {t('about:map-headquarters')}
            </li>
            <li className="aboutMap-citiesList-city">Madrid</li>
          </ul>
          <ul className="aboutMap-citiesList">
            <li className="aboutMap-citiesList-title">
              {t('about:map-branches')}
            </li>
            <li className="aboutMap-citiesList-city">{t('city:tokyo')}</li>
            {/* <li className="aboutMap-citiesList-city">{t('city:london')}</li> */}
            <li className="aboutMap-citiesList-city">{t('city:ny')}</li>
          </ul>
          <ul className="aboutMap-citiesList">
            <li className="aboutMap-citiesList-title">
              {t('about:map-partners')}
            </li>
            <li className="aboutMap-citiesList-city">Amsterdam</li>
            <li className="aboutMap-citiesList-city">San Francisco</li>
            <li className="aboutMap-citiesList-city">Boston</li>
            <li className="aboutMap-citiesList-city">{t('city:mexico')}</li>
            <li className="aboutMap-citiesList-city">Rio de Janeiro</li>
          </ul>
          <ul className="aboutMap-citiesList">
            <li className="aboutMap-citiesList-title">
              {t('about:map-projects')}
            </li>
            <li className="aboutMap-citiesList-city">San Francisco</li>
            <li className="aboutMap-citiesList-city">Los Angeles</li>
            <li className="aboutMap-citiesList-city">Boston</li>
            <li className="aboutMap-citiesList-city">Sao Paulo</li>
            <li className="aboutMap-citiesList-city">Rio de Janeiro</li>
            {/* <li className="aboutMap-citiesList-city">{t('city:london')}</li> */}
            <li className="aboutMap-citiesList-city">{t('city:paris')}</li>
            <li className="aboutMap-citiesList-city">Rochefort</li>
            <li className="aboutMap-citiesList-city">Madrid</li>
            <li className="aboutMap-citiesList-city">{t('city:munich')}</li>
            <li className="aboutMap-citiesList-city">Toulouse</li>
            <li className="aboutMap-citiesList-city">{t('city:seoul')}</li>
            <li className="aboutMap-citiesList-city">{t('city:tokyo')}</li>
            <li className="aboutMap-citiesList-city">Hong Kong</li>
            <li className="aboutMap-citiesList-city">Thailand</li>
            <li className="aboutMap-citiesList-city">{t('city:jakarta')}</li>
            <li className="aboutMap-citiesList-city">{t('city:lausanne')}</li>
            <li className="aboutMap-citiesList-city">{t('city:jeddah')}</li>
            <li className="aboutMap-citiesList-city">{t('city:mumbai')}</li>
            <li className="aboutMap-citiesList-city">{t('city:singapore')}</li>
            <li className="aboutMap-citiesList-city">{t('city:mexico')}</li>
            <li className="aboutMap-citiesList-city">{t('city:sydney')}</li>
            <li className="aboutMap-citiesList-city">Brisbane</li>
            <li className="aboutMap-citiesList-city">Quito</li>
            <li className="aboutMap-citiesList-city">{t('city:abu')}</li>
          </ul>
        </div>
      </SectionWrapper>
    </section>
  )
}

export default AboutMap
