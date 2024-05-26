import { $api } from '@/shared/api/api'

import type { UserDto } from './types'

export const getUsers = async (): Promise<UserDto[]> => {
  const response = await $api.get<UserDto[]>(
    'https://jsonplaceholder.typicode.com/users',
  )

  return response.data
}

export const getTree = async () => {
  const response = await $api.get('/tree')

  return response.data
}

export const getTreeChildren = async (id: number) => {
  const response = await $api.get(`/tree/${id}/children`)

  return response.data
}
