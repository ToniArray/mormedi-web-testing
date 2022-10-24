import { useEffect } from 'react'
import cx from 'classnames'

import useTranslations from '../../config/i18n/useTranslations'
import ChevronIcon from '../../public/icons/icon-chevron'

import SectionWrapper from '../wrappers/SectionWrapper'

import { toggle, toggleHide, toggleModal } from './utils'

const Filters = ({
  categories = [],
  selection = {},
  onCategoryClick,
  onAllClick,
}) => {
  const t = useTranslations()

  const isAllActive = Object.values(selection).every(selected => !selected)
  const allLiStyle = cx('filters-button', { 'is-active': isAllActive })

  useEffect(() => {
    toggle()
    toggleModal()

    const handleScroll = () => {
      toggleHide()
    }

    document
      .querySelector('.snapContainer')
      ?.addEventListener('scroll', handleScroll)

    return () =>
      document
        .querySelector('.snapContainer')
        ?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="filters">
      <SectionWrapper>
        <span className="filters-title">{t('filters')}:</span>
        <ul className="filters-list">
          <li>
            <button
              className={allLiStyle}
              aria-label="All"
              onClick={onAllClick}
            >
              {t('all')}
            </button>
          </li>
          {categories.map(category => (
            <li key={category.slug}>
              <button
                className={cx('filters-button', {
                  'is-active': selection[category.slug],
                })}
                aria-label={category.title}
                onClick={() => onCategoryClick(category.slug)}
              >
                {category.title}
                <span className="filters-buttonItems">{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
        <button className="filters-toggle">
          <p className="filters-selected">{t('all')}</p>
          <ChevronIcon />
        </button>
      </SectionWrapper>
    </div>
  )
}

export default Filters
