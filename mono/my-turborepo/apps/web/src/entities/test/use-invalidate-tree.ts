import { useQueryClient } from '@tanstack/react-query'

export const useInvalidateTree = () => {
  const queryClient = useQueryClient()

  return async () => {
    await queryClient.invalidateQueries({ queryKey: ['tree'] })
  }
}
