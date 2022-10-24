import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import cx from 'classnames'
import SectionWrapper from '../wrappers/SectionWrapper'
import Input from '../input/Input'
import PolicyAgreeCheckbox from '../checkbox/PolicyAgreeCheckbox'
import Button from '../button/Button.jsx'
import { ReactComponent as Arrow } from '../../../assets/icons/icon-arrow-right.svg'
import imgDetail from '../../../assets/images/insight-detail.jpg'
import imgMore from '../../../assets/images/insight-more.jpg'

const PostWysiwyg = ({
  isDownload,
  isGeneric,
  isProject,
  children,
  client,
  title,
  author,
  position,
}) => {
  const classes = cx('postWysiwyg', {
    'is-download': isDownload,
    'is-generic': isGeneric,
    'is-project': isProject,
  })

  return (
    <div className={classes}>
      <SectionWrapper>
        {client && <h2 className="postWysiwyg-client">{client}</h2>}
        {!isGeneric && (
          <div className="postWysiwyg-image">
            <img src={imgDetail} alt="" />
          </div>
        )}
        {isProject && title ? (
          <div className="postWysiwyg-info">
            <h1 className="postWysiwyg-title">{title}</h1>
            <div className="postWysiwyg-references">
              <div className="postWysiwyg-tags">
                <Link href="/" alt="">
                  Physical product design
                </Link>
              </div>
              <p className="postWysiwyg-referencesTitle">Client</p>
              <p>Torrot</p>
              <p>2017</p>
              <p className="postWysiwyg-referencesTitle">Project</p>
              <p>Velocípedo</p>
              <p className="postWysiwyg-referencesTitle">Context</p>
              <p>
                One of the world&apos;s leading e-scooter manufacturers wanted a
                brand new, innovative electric vehicle for the urban
                environment.
              </p>
              <p className="postWysiwyg-referencesTitle">Solution</p>
              <p>
                Mormedi designed the Velocípedo, a three-wheeled electric,
                connected vehicle.
              </p>
              <p className="postWysiwyg-referencesTitle">What we did</p>
              <p>
                Research & Strategy Design concepts 3D model & full-scale
                prototype CMF User validation Final design
              </p>
            </div>
          </div>
        ) : !isGeneric ? (
          <div className="postWysiwyg-info">
            {!isDownload && (
              <ul className="postWysiwyg-tags">
                <li>
                  <Link href="/" alt="">
                    Connected services,
                  </Link>
                </li>
                <li>
                  <Link href="/" alt="">
                    {' '}
                    Events,
                  </Link>
                </li>
                <li>
                  <Link href="/" alt="">
                    Insights
                  </Link>
                </li>
              </ul>
            )}
            <h1 className="postWysiwyg-title">{title}</h1>
            {!isDownload && (
              <>
                <h2 className="postWysiwyg-author">{author}</h2>
                <h3 className="postWysiwyg-position">{position}</h3>
              </>
            )}
          </div>
        ) : null}
        <div className="postWysiwyg-content">
          {children}
          {!isDownload && !isGeneric && !isProject && (
            <div className="postWysiwyg-formBlock">
              <span className="postWysiwyg-formTitle">¿Y tú qué piensas?</span>
              <span className="postWysiwyg-formIntro">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est
                auctor massa rhoncus egestas sed facilisi integer.
              </span>
              <fieldset className="contact-fieldset">
                <Input required={true} name="name" placeholder="Your name" />
                <Input required name="email" placeholder="Your email" />
                <PolicyAgreeCheckbox />
                <Button text="Send" />
              </fieldset>
            </div>
          )}
        </div>
        {!isDownload && !isGeneric && !isProject && (
          <div className="postWysiwyg-more">
            <span className="postWysiwyg-moreTitle">More reads</span>
            <div className="postWysiwyg-morePrev">
              <div className="postWysiwyg-morePost">
                <Link href="/" title="" passHref>
                  <img
                    className="postWysiwyg-morePost-image"
                    src={imgMore}
                    alt=""
                  />
                  <h4 className="postWysiwyg-morePost-title">
                    Global research: The key ingredient in insight-driven
                    innovation
                  </h4>
                </Link>
                <Link
                  className="postWysiwyg-morePost-link"
                  href="/"
                  title=""
                  passHref
                >
                  <Arrow />
                </Link>
              </div>
            </div>
            <div className="postWysiwyg-moreNext">
              <div className="postWysiwyg-morePost">
                <Link href="/" title="" passHref>
                  <img
                    className="postWysiwyg-morePost-image"
                    src={imgMore}
                    alt=""
                  />
                  <h4 className="postWysiwyg-morePost-title">
                    How can the auto industry give users want they want in the
                    post-COVID-19 world?
                  </h4>
                </Link>
                <Link
                  className="postWysiwyg-morePost-link"
                  href="/"
                  title=""
                  passHref
                >
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        )}
        {isProject && (
          <>
            <div className="postWysiwyg-image">
              <img src={imgDetail} alt="" />
            </div>
            <div className="postWysiwyg-quote">
              <h5>
                The Torrot Velocípedo: The Ultimate Urban? “The bike was
                revealed at EICMA in Milan, and has been quite a surprise. It is
                a unique three-wheeled vehicle, 100% Spanish, and is so
                original.”
              </h5>
              <p>Car & Driver</p>
              <p>17 November 2017</p>
            </div>
          </>
        )}
      </SectionWrapper>
    </div>
  )
}

PostWysiwyg.propTypes = {
  isDownload: PropTypes.bool,
  isGeneric: PropTypes.bool,
  isProject: PropTypes.bool,
  client: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  position: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default PostWysiwyg
