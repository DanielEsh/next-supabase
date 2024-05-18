'use client'

import { useUsers } from '@/entities/test/use-users'

export const Body = () => {
  const usersQuery = useUsers()

  return (
    <div>
      <p>Users list</p>

      {usersQuery.data?.map((user) => <p key={user.email}>{user.name}</p>)}
    </div>
  )
}
