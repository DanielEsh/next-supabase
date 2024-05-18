/**
 * ! Example for use react query on client component
 */
'use client'

import { ReactQuery } from '@/components/ReactQuery'
import { useTree } from '@/entities/test/use-tree'

/**
 * ! Example for use react query on client component
 */

/**
 * ! Example for use react query on client component
 */

/**
 * ! Example for use react query on client component
 */

/**
 * ! Example for use react query on client component
 */

const ClientPage = () => {
  const usersQuery = useTree()

  return (
    <div>
      <p>Users list</p>

      <ReactQuery
        queryResult={usersQuery}
        renderLoading={<p>Getting users data...</p>}
        render={(tree) => (
          <pre>
            <code>{JSON.stringify(tree, null, 2)}</code>
          </pre>
        )}
      />
    </div>
  )
}

export default ClientPage
