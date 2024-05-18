import { useQuery } from '@tanstack/react-query'

import { getTree } from '@/entities/test/repository/requests'

export const getTreeKey = () => ['tree']

export const useTree = () => {
  return useQuery({
    queryKey: getTreeKey(),
    queryFn: getTree,
  })
}
