import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'

import useViewportHeight from '../../hooks/useViewportHeight'

import { useCommonData } from '../../contexts/CommonDataContext'
import { useMainLoader } from '../../contexts/LoaderContext'
import { useMainWrapper } from '../../contexts/MainWrapperContext'

import Cookies from '../cookies/Cookies'
import CustomMouse from '../custom-mouse/CustomMouse'
import Footer from '../footer/Footer'
import MainLoader from '../main-loader/MainLoader'
import MainWrapper from '../main-wrapper/MainWrapper'
import Navigation from '../navigation/Navigation.jsx'
import Newsletter from '../newsletter/Newsletter'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

const MainLayout = ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState('fadeOut')

  const { isLoaded } = useMainLoader()
  const { mainWrapperRef } = useMainWrapper()
  const commonData = useCommonData()

  useViewportHeight()

  const classes = cx('mainLayout', {
    'is-fadeIn': transitionStage === 'fadeIn',
    'is-fadeOut': transitionStage === 'fadeOut',
  })

  const endTransition = () => {
    if (transitionStage === 'fadeOut') {
      setTimeout(() => {
        setDisplayChildren(children)
        setTransitionStage('fadeIn')

        mainWrapperRef.current.scrollTo(0, 0)
      }, 500)
    }
  }

  useEffect(() => {
    setTransitionStage('fadeIn')
  }, [])

  useEffect(() => {
    if (children !== displayChildren) setTransitionStage('fadeOut')
  }, [children, setDisplayChildren, displayChildren])

  return (
    <div className={classes} onTransitionEnd={endTransition}>
      <Navigation cities={commonData.footer?.cities} />
      <MainWrapper>
        {displayChildren}
        <Footer
          title={commonData.footer?.title}
          buttonLinks={commonData.footer?.buttonLinks}
          cities={commonData.footer?.cities}
        />
      </MainWrapper>
      <CustomMouse />
      <Cookies />
      <Newsletter />
      <div className="mainLayout-transitionOverlay"></div>
      {!isLoaded ? <MainLoader /> : null}
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
