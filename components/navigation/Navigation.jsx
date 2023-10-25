import cx from 'classnames'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'

import useToggleLocales from '../../config/i18n/useToggleLocales'
import useTranslations from '../../config/i18n/useTranslations'
import { ABOUT, HOME } from '../../config/routes'
import { useMainLoader } from '../../contexts/LoaderContext'
import { useMainWrapper } from '../../contexts/MainWrapperContext'

import Link from '../link/Link'
import SectionWrapper from '../wrappers/SectionWrapper'

import IconPlace from '../../public/icons/icon-place'
import Logo from '../../public/icons/logo-mormedi'

import BREADCRUMB from './breadcrumb'

const Navigation = ({ isNegative, cities = [] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isBlend, setIsBlend] = useState(true)
  const navigationRef = useRef(null)
  const breadcrumbRef = useRef(null)

  const { pathname } = useRouter()

  const t = useTranslations()
  const { activeLocale, locales, setLocale } = useToggleLocales()
  const { isLoaded } = useMainLoader()
  const { setIsLock, mainWrapperRef } = useMainWrapper()

  const classes = cx('navigation', {
    'is-blend': isBlend,
    'is-hidden': !isLoaded,
    'is-negative': isNegative,
    'is-open': isOpen,
  })

  const toggleState = useCallback(() => {
    setIsOpen(isOpen => !isOpen)
    if (isOpen) {
      setIsLock(false)
      setTimeout(() => setIsBlend(true), 400)
    } else {
      setIsLock(true)
      setIsBlend(false)
    }
  }, [isOpen, setIsLock])

  const breadcrumbToggle = useCallback(() => {
    // TODO: refactor to avoid this queryselector?
    const pageHeading = document.querySelector('.pageHeading .sectionWrapper')

    const breadcrumb = breadcrumbRef.current
    const navigation = navigationRef.current

    if (!pageHeading || !breadcrumb || !navigation) {
      return
    }

    const reference = pageHeading.getBoundingClientRect().bottom

    if (reference < navigation.clientHeight) {
      breadcrumb.classList.add('is-visible')
    } else {
      breadcrumb.classList.remove('is-visible')
    }
  }, [])

  useEffect(() => {
    const mainWrapper = mainWrapperRef.current

    if (!mainWrapper) {
      return
    }

    const handleScroll = () => {
      breadcrumbToggle()
    }

    mainWrapper.addEventListener('scroll', handleScroll)

    return () => mainWrapper.removeEventListener('scroll', handleScroll)
  }, [breadcrumbToggle, mainWrapperRef])

  return (
    <header className={classes} ref={navigationRef}>
      <SectionWrapper isLarge>
        <div className="navigation-header">
          <div className="navigation-headerLogo">
            <Link to={HOME.path} title="Home">
              <Logo className="navigation-headerLogo" />
            </Link>
            {BREADCRUMB[pathname] && (
              <span className="navigation-headerBreadcrumb" ref={breadcrumbRef}>
                {t(BREADCRUMB[pathname])}
              </span>
            )}
          </div>
          <button
            className="navigation-headerButton"
            aria-label="Header button"
            onClick={toggleState}
          >
            <span className="navigation-headerButton-topLine"></span>
            <span className="navigation-headerButton-bottomLine"></span>
          </button>
        </div>
      </SectionWrapper>
      <div className="navigation-content">
        <SectionWrapper>
          <nav className="navigation-navbar">
            <ol>
              <li>
                <span className="navigation-navbar-caption">01</span>
                <Link
                  classes="navigation-navbar-link"
                  handleClick={toggleState}
                  title={t('about-us')}
                  to={ABOUT.path}
                >
                  {t('about-us')}
                </Link>
              </li>
              <li>
                <span className="navigation-navbar-caption">02</span>
                <Link
                  classes="navigation-navbar-link"
                  handleClick={toggleState}
                  to="/works"
                  title={t('works')}
                >
                  {t('works')}
                </Link>
              </li>
              <li>
                <span className="navigation-navbar-caption">03</span>
                <Link
                  classes="navigation-navbar-link"
                  handleClick={toggleState}
                  to="/what-we-do"
                  title={t('what-we-do')}
                >
                  {t('what-we-do')}
                </Link>
              </li>
              <li>
                <span className="navigation-navbar-caption">04</span>
                <Link
                  classes="navigation-navbar-link"
                  handleClick={toggleState}
                  to="/insights"
                  title={t('insights')}
                >
                  {t('insights')}
                </Link>
              </li>
              <li>
                <span className="navigation-navbar-caption">05</span>
                <Link
                  classes="navigation-navbar-link"
                  handleClick={toggleState}
                  to="/downloads"
                  title={t('downloads')}
                >
                  {t('downloads')}
                </Link>
              </li>
              <li>
                <span className="navigation-navbar-caption">06</span>
                <Link
                  classes="navigation-navbar-link"
                  handleClick={toggleState}
                  to="/contact"
                  title={t('contact')}
                >
                  {t('contact')}
                </Link>
              </li>
            </ol>
          </nav>
          <div className="navigation-footer">
            {cities ? (
              <ul className="navigation-footer-locations">
                {cities.map(city => (
                  <li key={city.name}>
                    <span className="navigation-footer-title">
                      <IconPlace /> {city.name}
                    </span>
                    {city.link ? (
                      <a
                        className="navigation-footer-link"
                        href={city.link}
                        title={city.name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {city.description}
                      </a>
                    ) : (
                      <span className="navigation-footer-link">
                        {city.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
            <ul className="navigation-footer-rrss">
              <li>
                <a
                  className="navigation-footer-link"
                  href="https://www.instagram.com/mormedi/"
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="navigation-footer-link"
                  href="https://www.facebook.com/mormedi"
                  title="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="navigation-footer-link"
                  href="https://es.linkedin.com/company/mormedi"
                  title="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="navigation-footer-link"
                  href="https://open.spotify.com/show/67cvAfWVFS7hnVSZYWiwpg"
                  title="Spotify"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spotify
                </a>
              </li>
            </ul>
            <ul className="navigation-footer-pages">
              <li>
                <Link
                  classes="navigation-footer-link"
                  handleClick={toggleState}
                  to="/key-projects"
                  title={t('key-projects')}
                >
                  {t('key-projects')}
                </Link>
              </li>
              <li>
                <Link
                  classes="navigation-footer-link"
                  handleClick={toggleState}
                  to="https://www.careers-page.com/mormedi"
                  title={t('jobs')}
                >
                  {t('jobs')}
                </Link>
              </li>
            </ul>
            <div className="navigation-footer-languages">
              {locales.map(locale => (
                <button
                  className={cx('navigation-footer-link', {
                    'is-active': activeLocale === locale,
                  })}
                  onClick={() => setLocale(locale)}
                  key={locale}
                >
                  {locale}
                </button>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </header>
  )
}

Navigation.propTypes = {
  isNegative: PropTypes.bool,
  breadcrumb: PropTypes.string,
}

export default Navigation
