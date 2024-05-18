/**
 * ! Example for use react query on client component
 */
'use client'

import { TreeNode } from '@repo/ui/tree'

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
        render={(tree) => {
          const handleClick = () => {
            console.log('click')
          }

          const handleExpand = () => {
            console.log('expand')
          }

          return (
            <>
              <pre>
                <code>{JSON.stringify(tree, null, 2)}</code>
              </pre>
              {tree.map((item) => {
                return (
                  <TreeNode
                    key={item.id}
                    level={0}
                    leaf={item.leaf}
                    onClick={handleClick}
                    onExpand={handleExpand}
                  >
                    {item.name}
                  </TreeNode>
                )
              })}
            </>
          )
        }}
      />
    </div>
  )
}

export default ClientPage
