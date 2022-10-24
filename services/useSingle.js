import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { getSingle } from './cms'

const useSingle = type => {
  if (!type || !type.length) {
    throw new Error('Cannot use this hook without a type')
  }

  const [data, setData] = useState({})
  const { locale } = useRouter()

  useEffect(() => {
    const fetchSingle = async () => {
      const data = await getSingle(type, locale)
      setData(data)
    }

    fetchSingle()
  }, [type, locale])

  return data
}

export default useSingle
