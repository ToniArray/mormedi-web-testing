import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'isLoaded'
const EXPIRATION_TIME = 86400000 // 1 day

const MainLoaderContext = createContext()

const MainLoaderProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    setIsLoaded(getLoadedLocalStorageValue())
  }, [])

  const persistIsLoaded = value => {
    try {
      const valueToStore = value instanceof Function ? value(isLoaded) : value

      setIsLoaded(valueToStore)

      if (typeof window !== 'undefined') {
        const now = new Date()

        const item = {
          value: value,
          expiry: now.getTime() + EXPIRATION_TIME,
        }

        window.localStorage.setItem(KEY, JSON.stringify(item))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const value = { isLoaded, setIsLoaded: persistIsLoaded }

  return (
    <MainLoaderContext.Provider value={value}>
      {children}
    </MainLoaderContext.Provider>
  )
}

const getLoadedLocalStorageValue = () => {
  if (typeof window === 'undefined') {
    return true
  }
  try {
    const itemStr = window.localStorage.getItem(KEY)
    const item = JSON.parse(itemStr)

    const now = new Date()

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(KEY)
      return null
    }

    return item ? item.value : false
  } catch (error) {
    console.log(error)
    return false
  }
}

const useMainLoader = () => {
  const context = useContext(MainLoaderContext)

  if (context === undefined) {
    throw new Error('useMainLoader must be used within a MainLoaderContext')
  }

  return context
}

export { MainLoaderProvider, useMainLoader }
