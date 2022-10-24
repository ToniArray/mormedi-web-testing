import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import showdown from 'showdown'
import gsap from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'
import { SlowMo } from 'gsap/dist/EasePack'

import useTranslations from '../../config/i18n/useTranslations'
import useToggleLocales from '../../config/i18n/useToggleLocales'
import { useMainWrapper } from '../../contexts/MainWrapperContext'
import { useNewsletter } from '../../contexts/NewsletterContext'

import SectionWrapper from '../wrappers/SectionWrapper'
import Link from '../link/Link'
import ArrowLinkBig from '../arrow-link/ArrowLinkBig'

import IconPlace from '../../public/icons/icon-place'
import IconArrow from '../../public/icons/icon-arrow'

const Footer = ({ isNegative, title, buttonLinks, cities }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const converter = new showdown.Converter()
  const classes = cx('footer', { 'is-negative': isNegative })

  const t = useTranslations()
  const { activeLocale, locales, setLocale } = useToggleLocales()
  const { mainWrapperRef } = useMainWrapper()
  const { open: openNewsletter } = useNewsletter()

  useEffect(() => {
    const container = containerRef.current
    const title = titleRef.current
    if (!container || !title || title.children.length === 0) return

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
  }, [title, containerRef, titleRef, mainWrapperRef])

  return (
    <footer className={classes} ref={containerRef}>
      <SectionWrapper>
        <p
          className="footer-title"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(title),
          }}
          ref={titleRef}
        ></p>
        <div className="footer-email">
          <a
            className="footer-emailLink"
            href="mailto:hi@mormedi.com"
            title="email"
          >
            hi@mormedi.com
          </a>
        </div>
        {Array.isArray(buttonLinks) ? (
          <ul className="footer-links">
            {buttonLinks.map(buttonLink => (
              <li key={`link-${buttonLink.title}`}>
                <ArrowLinkBig
                  text={buttonLink.title}
                  to={buttonLink.link}
                  title={buttonLink.title}
                />
              </li>
            ))}
            <li>
              <button className="arrowLinkBig" onClick={openNewsletter}>
                <div className="arrowLinkBig-arrowContainer">
                  <IconArrow classes="arrowLinkBig-arrow" />
                </div>
                <span className="arrowLinkBig-text">{t('newsletter')}</span>
              </button>
            </li>
          </ul>
        ) : null}
        {cities ? (
          <ul className="footer-locations">
            {cities.map(city => (
              <li key={city.name}>
                <span className="footer-locationTitle">
                  <IconPlace /> {city.name}
                </span>
                {city.link ? (
                  <a
                    className="footer-link"
                    href={city.link}
                    title={city.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {city.description}
                  </a>
                ) : (
                  <span className="footer-link">{city.description}</span>
                )}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="footer-controls">
          <div className="footer-languages">
            {locales.map(locale => (
              <button
                className={cx('footer-link', {
                  'is-active': activeLocale === locale,
                })}
                onClick={() => setLocale(locale)}
                key={locale}
              >
                {locale}
              </button>
            ))}
          </div>
          <p className="footer-legal">
            © Mormedi 2022.
            <Link to="/legal" title="Legal">
              {t('legal')}
            </Link>
          </p>
        </div>
      </SectionWrapper>
    </footer>
  )
}

Footer.propTypes = {
  isNegative: PropTypes.bool,
}

export default Footer
