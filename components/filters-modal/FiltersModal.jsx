import { useEffect } from 'react'
import cx from 'classnames'

import useTranslations from '../../config/i18n/useTranslations'
import IconClose from '../../public/icons/icon-close'

import { toggleModal } from './utils'

const FiltersModal = ({
  categories = [],
  selection = {},
  onCategoryClick,
  onApplyFiltersClick,
  onAllClick,
}) => {
  const t = useTranslations()
  const isAllActive = Object.values(selection).every(selected => !selected)
  const allLiStyle = cx('filters-button', { 'is-active': isAllActive })

  useEffect(() => {
    toggleModal()
  }, [])

  return (
    <div className="filtersModal">
      <div className="filtersModal-overlay"></div>
      <button className="filtersModal-open" aria-label="Open filters">
        {t('to-filter')}
      </button>
      <div className="filters is-modal">
        <span className="filters-title">{t('filter-by')}:</span>
        <button className="filters-close" aria-label="Close filters">
          <IconClose />
        </button>
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
          {categories.map(category => {
            const { projects } = category
            return (
              <li key={category.title}>
                <button
                  className={cx('filters-button', {
                    'is-active': selection[category.slug],
                  })}
                  aria-label={category.title}
                  onClick={() => onCategoryClick(category.slug)}
                >
                  {category.title}
                  <span className="filters-buttonItems">{projects.length}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <button className="filters-reset" onClick={onApplyFiltersClick}>
          {t('apply-filters')}
        </button>
      </div>
    </div>
  )
}

export default FiltersModal
