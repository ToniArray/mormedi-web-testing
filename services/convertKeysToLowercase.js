const convertKeysToLowercase = object => {
  if (!object) {
    return object
  }

  if (!Array.isArray(object) && typeof object !== 'object') {
    return object
  }

  if (Array.isArray(object)) {
    return object.map(convertKeysToLowercase)
  }

  const newObject = {}
  for (const [key, value] of Object.entries(object)) {
    let newValue

    if (Array.isArray(value)) {
      newValue = value.map(convertKeysToLowercase)
    }

    if (typeof value === 'object') {
      newValue = convertKeysToLowercase(value)
    }

    const newKey = key[0].toLowerCase() + key.slice(1)
    newObject[newKey] = newValue ? newValue : value
  }

  return newObject
}

export default convertKeysToLowercase
