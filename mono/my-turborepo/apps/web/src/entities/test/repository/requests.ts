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
  parentId?: number
}

export const createTreeNodeBackend = async (dto: CreateTreeDto) => {
  const response = await $api.post(`/tree`, dto)

  return response.data
}

export interface UpdateTreeDto {
  name: string
}

export const updateTreeById = async (dto: UpdateTreeDto, id: number) => {
  return (await $api.put<UpdateTreeDto>(`/tree/${id}`, dto)).data
}
