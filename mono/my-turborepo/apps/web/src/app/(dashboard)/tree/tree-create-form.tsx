import { useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { useInvalidateTree } from '@/entities/test/use-invalidate-tree'
import { getTreeKey, useCreateTreeMutation } from '@/entities/test/use-tree'
import { Button, Input } from '@/shared/ui'
import { Form, useForm } from '@/shared/ui/form'

const treeCreateFormSchema = z.object({
  name: z.string().min(1),
})

export type TreeCreateFormSchema = z.infer<typeof treeCreateFormSchema>

interface Props {
  parentId?: number
}

export const TreeCreateForm = ({ parentId }: Props) => {
  const formMethods = useForm(treeCreateFormSchema)
  const { mutate } = useCreateTreeMutation()
  const invalidateTree = useInvalidateTree()

  const handleSubmit = async (form: TreeCreateFormSchema) => {
    mutate(
      {
        name: form.name,
        parentId,
      },
      {
        onSuccess: async () => {
          await invalidateTree()
        },
      },
    )
  }

  return (
    <Form
      className="flex flex-col gap-6 max-w-36"
      methods={formMethods}
      onSubmit={handleSubmit}
    >
      Selected parent: {parentId}
      <Form.Field name="name">
        <Input label="name" />
      </Form.Field>
      <Button type="submit">Create</Button>
    </Form>
  )
}
