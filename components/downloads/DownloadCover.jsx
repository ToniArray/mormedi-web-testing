import { useEffect } from 'react'

import gsap from 'gsap'

import * as ROUTES from '../../config/routes'
import { useMainWrapper } from '../../contexts/MainWrapperContext.js'

import SectionWrapper from '../wrappers/SectionWrapper'
import Button from '../button/Button'

const DownloadCover = ({ download = {} }) => {
  const { title, image, slug, downloadCategories } = download

  const { mainWrapperRef } = useMainWrapper()

  useEffect(() => {
    if (!mainWrapperRef.current) {
      return
    }

    const imageContainers = document.querySelectorAll('.downloadCover-image')

    if (imageContainers.length > 0) {
      imageContainers.forEach(imageContainer => {
        const image = imageContainer.querySelector('img')

        gsap.to(image, {
          y: '0%',
          scrollTrigger: {
            scroller: mainWrapperRef.current,
            trigger: imageContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.1,
          },
        })
      })
    }
  }, [mainWrapperRef])

  return (
    <div className="downloadCover">
      <SectionWrapper>
        <div className="downloadCover-info">
          <h3 className="downloadCover-tag">
            {`${downloadCategories.map(category => category.title)}`}
          </h3>
          <h4 className="downloadCover-title">{title}</h4>
          <Button isLink={ROUTES.DOWNLOAD.linkTo({ slug })} text="Download" />
        </div>
        <div className="downloadCover-image">
          <img src={image.url} alt="" />
        </div>
      </SectionWrapper>
    </div>
  )
}

export default DownloadCover
