import PropTypes from 'prop-types'

import useTranslations from '../../config/i18n/useTranslations'

import SectionWrapper from '../wrappers/SectionWrapper'
import Carousel from '../carousel/Carousel.jsx'

const AboutSuccess = ({ list, people, onPersonClick }) => {
  const t = useTranslations()

  return (
    <section className="aboutSuccess has-negative">
      <SectionWrapper>
        <h4 className="aboutSuccess-title">{t('about:success')}</h4>
        <ul className="aboutSuccess-list">
          {list.map((item, key) => (
            <li key={key}>
              <img
                className="aboutSuccess-listImage"
                src={item.image.url}
                alt=""
              />
              <p className="aboutSuccess-listTitle">{item.title}</p>
              <p className="aboutSuccess-listDescription">{item.description}</p>
            </li>
          ))}
        </ul>
        <Carousel>
          {people.map(person => (
            <div className="aboutSuccess-person" key={person.name}>
              <button
                className="aboutSuccess-modalButton"
                aria-label="Modal button"
                onClick={() => !window.glideRunnig && onPersonClick(person)}
              >
                <img
                  className="aboutSuccess-personImage"
                  src={person.picture.url}
                  alt=""
                />
                <span className="aboutSuccess-personRol">{person.role}</span>
                <p className="aboutSuccess-personName">{person.name}</p>
              </button>
            </div>
          ))}
        </Carousel>
      </SectionWrapper>
    </section>
  )
}

AboutSuccess.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape({
      picture: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default AboutSuccess
