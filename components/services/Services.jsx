import React, { useState } from 'react'
import PropTypes from 'prop-types'

import SectionWrapper from '../wrappers/SectionWrapper'
import ServicesTabs from './ServicesTabs'
import ServicesDropdown from './ServicesDropdown'
import useWindowSize from '../../hooks/useWindowSize'

const Services = ({ buttons, descriptions }) => {
  const [activeItem, setActiveItem] = useState(0)
  const size = useWindowSize()

  return (
    <section className="services has-negative">
      <SectionWrapper>
        {size.width >= 768 ? (
          <ServicesTabs
            buttons={buttons}
            descriptions={descriptions}
          ></ServicesTabs>
        ) : (
          buttons.map((button, index) => (
            <ServicesDropdown
              isOpen={activeItem === index}
              buttonText={button}
              buttonClick={() => setActiveItem(index)}
              description={descriptions[index]}
              key={index}
            />
          ))
        )}
      </SectionWrapper>
    </section>
  )
}

ServicesTabs.propTypes = {
  buttons: PropTypes.array.isRequired,
  descriptions: PropTypes.array.isRequired,
}

export default Services
