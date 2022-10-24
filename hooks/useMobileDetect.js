import { useEffect, useState } from 'react'

const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(/android.+mobile|ip(hone|[oa]d)/i.test(navigator.userAgent))
  }, [])

  return isMobile
}

export default useMobileDetect
