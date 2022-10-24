import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import gsap from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'
import { SlowMo } from 'gsap/dist/EasePack'
import showdown from 'showdown'

import useTranslations from '../../config/i18n/useTranslations'
import { useMainLoader } from '../../contexts/LoaderContext'

import SectionWrapper from '../wrappers/SectionWrapper'

const Hero = ({ title }) => {
  const titleRef = useRef(null)
  const converter = new showdown.Converter()
  const t = useTranslations()
  const { isLoaded } = useMainLoader()

  useEffect(() => {
    const reference = titleRef.current
    if (!reference) return

    const paragraphs = Array.from(reference.children)
    const splits = paragraphs.map(paragraph => new SplitText(paragraph).lines)
    let anim

    if (isLoaded) {
      anim = gsap.to(splits, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        stagger: 0.2,
        ease: new SlowMo(0.25, 0, 0.25, 1),
      })
    }

    return () => (anim ? anim.kill() : null)
  }, [isLoaded, titleRef, title])

  return (
    <section className="hero">
      <SectionWrapper>
        <h1
          className="hero-title"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(title),
          }}
          ref={titleRef}
        ></h1>
        <div className="hero-scrollIndicator">
          <p className="hero-scrollText">{t('home:scroll')}</p>
        </div>
      </SectionWrapper>
    </section>
  )
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Hero
