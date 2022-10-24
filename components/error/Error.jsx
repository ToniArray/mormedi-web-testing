import SectionWrapper from '../wrappers/SectionWrapper.jsx'
import Link from '../link/Link'

import useTranslations from '../../config/i18n/useTranslations'

const Error = () => {
  const t = useTranslations()
  return (
    <section className="errorMessage has-negative">
      <SectionWrapper>
        <h1 className="errorMessage-code">{t('error:404')}</h1>
        <h2 className="errorMessage-title">{t('error:lost')}</h2>
        <h3 className="errorMessage-description">{t('error:not-exist')}</h3>
        <Link classes="errorMessage-link" to="/" title="">
          {t('error:back-home')}
        </Link>
      </SectionWrapper>
    </section>
  )
}

export default Error
