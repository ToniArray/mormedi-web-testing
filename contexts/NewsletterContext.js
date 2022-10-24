import { createContext, useContext, useRef, useState } from 'react'

const NewsletterContext = createContext()

const NewsletterProvider = ({ children }) => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const close = event => {
    const newsletter = ref.current

    if (!newsletter) {
      return
    }

    const isNewsletter = newsletter.contains(event.target)

    if (isNewsletter) {
      return
    }

    setIsOpen(false)
    event.stopPropagation()
    document.removeEventListener('click', close)
  }

  const open = event => {
    setIsOpen(true)
    event.stopPropagation()
    document.addEventListener('click', close)
  }

  const value = { open, ref, isOpen }

  return (
    <NewsletterContext.Provider value={value}>
      {children}
    </NewsletterContext.Provider>
  )
}

const useNewsletter = () => {
  const context = useContext(NewsletterContext)

  if (context === undefined) {
    throw new Error('useNewsletter must be used within a NewsletterProvider')
  }

  return context
}

export { NewsletterProvider, useNewsletter }
