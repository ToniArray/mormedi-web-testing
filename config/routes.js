const makePath = (path, { parent = HOME, title } = {}) => ({
  path,
  parent,
  titleI18nKey: title,
  linkTo: params => ({
    pathname: path,
    query: params,
  }),
})

export const HOME = makePath('/', {
  parent: null,
  title: 'routes:home-title',
})

export const ABOUT = makePath('/about', {
  title: 'routes:about-title',
})

export const CATEGORIES = makePath('/categories', {
  title: 'routes:categories-title',
})

export const CLIENTS = makePath('/clients', {
  title: 'routes:clients-title',
})

export const CONFIRMATION = makePath('/confirmation', {
  title: 'routes:confirmation-title',
})

export const CONTACT = makePath('/contact', {
  title: 'routes:contact-title',
})

export const DOWNLOADS = makePath('/downloads', {
  title: 'routes:download-title',
})

export const DOWNLOAD = makePath(`${DOWNLOADS.path}/[slug]`, {
  parent: DOWNLOADS,
  title: 'routes:download-title',
})

export const ERROR = makePath('/404', {
  title: 'routes:error',
})

export const INSIGHTS = makePath('/insights', {
  title: 'routes:insights-title',
})

export const INSIGHT = makePath(`${INSIGHTS.path}/[slug]`, {
  parent: INSIGHTS,
  title: 'routes:insights-title',
})

export const KEY_PROJECTS = makePath('/key-projects', {
  title: 'routes:key-projects',
})

export const LEGAL = makePath('/legal', {
  title: 'routes:legal-title',
})

export const OUR_WORK = makePath('/our-work', {
  title: 'routes:works-title',
})

export const PROJECTS = makePath('/projects', {
  title: 'routes:projects-title',
})

export const PROJECT = makePath(`${PROJECTS.path}/[slug]`, {
  parent: PROJECTS,
  title: 'routes:project-title',
})

export const TREND_TALKS = makePath('/trend-talks', {
  title: 'routes:trend-talks-title',
})

export const WHAT_WE_DO = makePath('/what-we-do', {
  title: 'routes:what-we-do-title',
})

export const WORKS = makePath('/works', {
  title: 'routes:works-title',
})
