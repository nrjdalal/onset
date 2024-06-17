import { useQuery } from '@tanstack/react-query'

export const SyncUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/db/users')
      return response.json()
    },
  })
}
