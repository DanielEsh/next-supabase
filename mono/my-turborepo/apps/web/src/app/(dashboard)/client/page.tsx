/**
 * ! Example for use react query on client component
 */
'use client'

import { ReactQuery } from '@/components/ReactQuery'
import { useUsers } from '@/entities/test/use-users'

/**
 * ! Example for use react query on client component
 */

const ClientPage = () => {
  const usersQuery = useUsers()

  return (
    <div>
      <p>Users list</p>

      <ReactQuery
        queryResult={usersQuery}
        renderLoading={<p>Getting users data...</p>}
        render={(users) => (
          <>
            {users.map((user) => (
              <p key={user.email}>{user.name}</p>
            ))}
          </>
        )}
      />
    </div>
  )
}

export default ClientPage
