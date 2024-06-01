import { useInvalidateTree } from '@/entities/test/use-invalidate-tree'
import { useDeleteTreeNodeMutation } from '@/entities/test/use-tree'
import { Button } from '@/shared/ui'

interface Props {
  id: number
}

export const TreeDeleteButton = ({ id }: Props) => {
  const { mutate } = useDeleteTreeNodeMutation()
  const invalidateTree = useInvalidateTree()

  const handleDelete = () => {
    mutate(id, {
      onSuccess: async () => {
        await invalidateTree()
      },
    })
  }

  return <Button onClick={handleDelete}>Delete {id}</Button>
}
