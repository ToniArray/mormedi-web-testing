import convertKeysToLowercase from './convertKeysToLowercase'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
export const SWITCH_LANGS = { en: 'es', es: 'en' }

const changeUrl = url => `${STRAPI_URL}${url}`

const attachStrapiEndpointToUrls = object => {
  if (!object) {
    return object
  }

  if (!Array.isArray(object) && typeof object !== 'object') {
    return object
  }

  if (Array.isArray(object)) {
    return object.map(attachStrapiEndpointToUrls)
  }

  const newObject = {}
  for (const [key, value] of Object.entries(object)) {
    let newValue = value

    if (Array.isArray(value)) {
      newValue = value.map(attachStrapiEndpointToUrls)
    }

    if (typeof value === 'object') {
      newValue = attachStrapiEndpointToUrls(value)
    }

    newObject[key] = key === 'url' ? changeUrl(newValue) : newValue
  }

  return newObject
}

const attachStrapiEndpointToRichTextImages = object => {
  if (!object) {
    return object
  }

  if (typeof object === 'string' && !object.includes(STRAPI_URL)) {
    return object.replace(/\/uploads/g, `${STRAPI_URL}/uploads`)
  }

  if (!Array.isArray(object) && typeof object !== 'object') {
    return object
  }

  if (Array.isArray(object)) {
    return object.map(attachStrapiEndpointToRichTextImages)
  }

  const newObject = {}
  for (const [key, value] of Object.entries(object)) {
    newObject[key] = Array.isArray(value)
      ? value.map(attachStrapiEndpointToRichTextImages)
      : attachStrapiEndpointToRichTextImages(value)
  }

  return newObject
}

export const findById = async (type, id, locale = 'en') => {
  const route = `${STRAPI_URL}/${type}?id=${id}&_locale=${locale}`

  const response = await fetch(route)

  const result = await response.json()
  const items = attachStrapiEndpointToRichTextImages(
    attachStrapiEndpointToUrls(convertKeysToLowercase(result)),
  )

  if (items.length > 1) {
    throw new Error(`There are more than one ${type} with the id ${id} `)
  }
  return Array.isArray(items) ? items[0] : items
}

export const findBySlug = async (type, slug, locale = 'en') => {
  const route = `${STRAPI_URL}/${type}?Slug=${slug}&_locale=${locale}`

  const response = await fetch(route)

  const result = await response.json()
  const items = attachStrapiEndpointToRichTextImages(
    attachStrapiEndpointToUrls(convertKeysToLowercase(result)),
  )

  if (items.length > 1) {
    throw new Error(`There are more than one ${type} with the Slug ${slug} `)
  }
  return Array.isArray(items) ? items[0] : items
}

export const getSingle = async (type, locale = 'en') => {
  const response = await fetch(`${STRAPI_URL}/${type}?_locale=${locale}`)
  const data = await response.json()

  return attachStrapiEndpointToRichTextImages(
    attachStrapiEndpointToUrls(convertKeysToLowercase(data)),
  )
}

export const getCollection = async (type, locale = 'en', params) => {
  const response = await fetch(
    `${STRAPI_URL}/${type}?_locale=${locale}${params ? `&${params}` : ''}`,
  )
  const result = await response.json()

  return attachStrapiEndpointToRichTextImages(
    attachStrapiEndpointToUrls(convertKeysToLowercase(result)),
  )
}

