import React from 'react'
import cx from 'classnames'

import SectionWrapper from '../wrappers/SectionWrapper'

const LegalTabs = ({ children, titles, activeTab, onChangeTab }) => {
  return (
    <div className="legalTabs tabs">
      <SectionWrapper>
        <div className="legalTabs-buttons">
          {titles.map((title, index) => {
            const className = cx('legalTabs-button tabs-button', {
              'is-active': title === activeTab,
            })
            return (
              <button
                className={className}
                key={title}
                onClick={() => onChangeTab(title)}
              >
                {title}
              </button>
            )
          })}
        </div>
        <div className="legalTabs-contentContainer">{children}</div>
      </SectionWrapper>
    </div>
  )
}

export default LegalTabs
