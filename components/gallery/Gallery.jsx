import React from 'react'
import PropTypes from 'prop-types'

import SectionWrapper from '../wrappers/SectionWrapper'
import GalleryItem from './GalleryItem'

const Gallery = ({ items }) => {
  return (
    <section className="gallery">
      <SectionWrapper>
        {items.map((media, index) => (
          <GalleryItem key={`gallery-${media.id}-${index}`} media={media} />
        ))}
      </SectionWrapper>
    </section>
  )
}

Gallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      alternativeText: PropTypes.string.isRequired,
    }),
  ),
}

export default Gallery
