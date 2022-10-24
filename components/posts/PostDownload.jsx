import React from 'react'
import PropTypes from 'prop-types'

import SectionWrapper from '../wrappers/SectionWrapper'
import Button from '../button/Button.jsx'

const PostDownload = ({ title }) => {
  return (
    <section className="postDownload has-negative">
      <SectionWrapper>
        <img
          className="postDownload-image"
          src="/images/insights-download.jpg"
          alt="Post cover"
        />
        <div className="postDownload-info">
          <span className="postDownload-tag">Download</span>
          <h3 className="postDownload-title">{title}</h3>
          <Button isLink={'/downloads'} text="Download" />
        </div>
      </SectionWrapper>
    </section>
  )
}

PostDownload.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PostDownload
