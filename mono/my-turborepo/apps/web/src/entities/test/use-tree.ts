import { useMutation, useQuery } from '@tanstack/react-query'

import {
  createTreeNodeBackend,
  getTree,
  getTreeChildren,
} from '@/entities/test/repository/requests'

export const getTreeKey = () => ['tree']
export const getTreeChildrenKey = (id: number) => ['tree', id]

export const useTree = () => {
  return useQuery({
    queryKey: getTreeKey(),
    queryFn: getTree,
  })
}

export const useTreeChildren = (id: number) => {
  return useQuery({
    queryKey: getTreeChildrenKey(id),
    queryFn: () => getTreeChildren(id),
  })
}

export const useCreateTreeMutation = () => {
  return useMutation({
    mutationFn: createTreeNodeBackend,
  })
}
