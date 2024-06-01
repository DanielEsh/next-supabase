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
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  return response.data
}

export const getTreeChildren = async (id: number) => {
  const response = await $api.get(`/tree/${id}/children`)
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return response.data
}

export interface CreateTreeDto {
  name: string
}

export const createTreeNodeBackend = async (dto: CreateTreeDto) => {
  const response = await $api.post(`/tree`, dto)

  return response.data
}
