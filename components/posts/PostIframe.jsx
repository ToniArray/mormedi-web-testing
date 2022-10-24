import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

const PostIframe = ({ next }) => {
  const router = useRouter()

  const iframeRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    setTimeout(() => {
      const doc = iframeRef.current.contentWindow.document.body

      if (!doc) return

      const navigation = doc.querySelector('.navigation')
      const mainWrapper = doc.querySelector('.mainWrapper')
      const postWysiwyg = doc.querySelector('.postWysiwyg')
      const mouse = doc.querySelector('.mouse')

      if (navigation) navigation.style.display = 'none'
      if (mainWrapper) mainWrapper.style.overflow = 'hidden'
      if (postWysiwyg) postWysiwyg.style.paddingTop = '0'
      if (mouse) mouse.style.display = 'none'
    }, 1000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, isLoaded, iframeRef.current])

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      const iFrame = document.querySelector('.postIframe')

      let redirecting = false

      if (!iFrame) {
        return
      }

      const reference = iFrame.getBoundingClientRect().bottom - 10

      const url = iFrame.getAttribute('src').replace('is-next=true', '')
      const overlay = document.querySelector('.mainLayout-transitionOverlay')

      if (reference <= window.innerHeight && !redirecting) {
        redirecting = true
        overlay.classList.remove('is-hidden')
        router.replace(url)
      }
    }

    const mainWrapper = document.querySelector('.mainWrapper')

    mainWrapper.addEventListener('scroll', handleScroll)

    return () => {
      setIsLoaded(false)

      mainWrapper.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const queryParams = useMemo(() => {
    const params = new URLSearchParams()
    params.set('filters', next.filters)
    params.set('is-next', true)
    return params
  }, [next.filters])

  return (
    <div className="postIframe-wrapper">
      <iframe
        title="postIframe"
        className="postIframe"
        src={`${router.locale === 'es' ? '/es' : ''}${
          next.path
        }?${queryParams.toString()}`}
        ref={iframeRef}
      ></iframe>
    </div>
  )
}

PostIframe.propTypes = {
  next: PropTypes.object.isRequired,
}

export default PostIframe
