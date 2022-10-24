import { useEffect, createRef, useRef, useState } from 'react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import useTranslations from '../../config/i18n/useTranslations'

import { useMainWrapper } from '../../contexts/MainWrapperContext'

import SectionWrapper from '../wrappers/SectionWrapper'
import ArrowLink from '../arrow-link/ArrowLink'

const ClientsResume = ({ clients = [] }) => {
  const containerRef = useRef(null)
  const clientsRef = clients.map(() => createRef())
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const t = useTranslations()
  const { mainWrapperRef, setIsSnap } = useMainWrapper()

  useEffect(() => {
    const reference = containerRef.current
    if (!reference) return

    const anim = ScrollTrigger.create({
      trigger: reference,
      start: 'top top',
      scroller: mainWrapperRef.current,
      onEnter: () => setIsSnap(false),
      onLeaveBack: () => setIsSnap(true),
    })

    return () => anim.kill()
  }, [mainWrapperRef, setIsSnap])

  useEffect(() => {
    clientsRef.forEach(client => {
      const clientNode = client.current
      const move = event => setTransform({ x: event.offsetX, y: event.offsetY })

      clientNode.addEventListener('mousemove', event => move(event))
      return clientNode.removeEventListener('mousemove', event => move(event))
    })
  }, [clients, clientsRef])

  return (
    <div className="clientsResume" ref={containerRef}>
      <SectionWrapper>
        <h3 className="clientsResume-title">{t('clients:some-clients')}</h3>
        <ul className="clientsResume-list">
          {clients.map(({ client, image }, index) => (
            <li ref={clientsRef[index]} key={client.name}>
              <div className="clientsResume-clientLogoWrapper">
                <img
                  className="clientsResume-clientLogo"
                  src={client.blackLogo.url}
                  alt=""
                />
              </div>
              <p className="clientsResume-clientDescription">
                {client.description}
              </p>
              <img
                className="clientsResume-clientBg"
                src={image.url}
                alt=""
                style={{
                  transform: `translateX(calc(-50% + ${transform.x}px)) translateY(calc(-50% + ${transform.y}px)) scale(1.1)`,
                }}
              />
            </li>
          ))}
        </ul>
      </SectionWrapper>
      <SectionWrapper>
        <ArrowLink text={t('view-all')} title={t('view-all')} to="/clients" />
      </SectionWrapper>
    </div>
  )
}

export default ClientsResume
