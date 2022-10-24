
import React, { createContext, useContext, useRef, useState } from 'react'

const MainWrapperContext = createContext()

const MainWrapperStore = ({ children }) => {
  const [isLock, setIsLock] = useState(false)
  const [isSnap, setIsSnap] = useState(false)
  const mainWrapperRef = useRef()

  return (
    <MainWrapperContext.Provider value={{ isLock, setIsLock, isSnap, setIsSnap, mainWrapperRef }}>
      {children}
    </MainWrapperContext.Provider>
  )
}

const useMainWrapper = () => {
  const context = useContext(MainWrapperContext)

  if (context === undefined) {
    throw new Error('useMainWrapper must be used within a MainWrapperStore')
  }

  return context
}

export { MainWrapperStore, useMainWrapper }
