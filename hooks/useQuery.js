import { useRouter } from 'next/router'

const useQuery = () => {
  const router = useRouter()
  return new URLSearchParams(router.query)
}

export default useQuery
