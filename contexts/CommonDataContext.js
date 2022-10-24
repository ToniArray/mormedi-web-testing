import { createContext, useContext } from 'react'

import useSingle from '../services/useSingle'
import * as ENDPOINTS from '../services/endpoints'

const CommonDataContext = createContext()

const CommonDataProvider = ({ children }) => {
  const footerData = useSingle(ENDPOINTS.FOOTER)

  const value = { footer: footerData }

  return (
    <CommonDataContext.Provider value={value}>
      {children}
    </CommonDataContext.Provider>
  )
}

const useCommonData = () => {
  const context = useContext(CommonDataContext)

  if (context === undefined) {
    throw new Error('useCommonData must be used within a CommonDataProvider')
  }

  return context
}

export { CommonDataProvider, useCommonData }
