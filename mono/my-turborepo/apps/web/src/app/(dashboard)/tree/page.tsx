'use client'

import { TreeNode, createTree } from '@repo/ui/tree'
import { useQueryClient } from '@tanstack/react-query'

import { ReactQuery } from '@/components/ReactQuery'
import { getTreeChildren } from '@/entities/test/repository/requests'
import {
  getTreeChildrenKey,
  useTree,
  useTreeChildren,
} from '@/entities/test/use-tree'

const ClientPage = () => {
  const usersQuery = useTree()
  const queryClient = useQueryClient()

  return (
    <div>
      <p>Users list</p>

      <ReactQuery
        queryResult={usersQuery}
        renderLoading={<p>Getting users data...</p>}
        render={(tree) => {
          const createdTree = createTree(tree, {
            getKey: (node) => node.id,
            getLeaf: (node) => node.leaf,
          })

          const handleClick = async (key) => {
            console.log('KEY', key)
            const data = await queryClient.fetchQuery({
              queryKey: getTreeChildrenKey(key),
              queryFn: () => getTreeChildren(key),
            })

            console.log('DATA', data)
          }

          const handleExpand = () => {
            console.log('expand')
          }

          return (
            <>
              <pre>
                <code>{JSON.stringify(tree, null, 2)}</code>
              </pre>
              {createdTree.map((item) => {
                return (
                  <TreeNode
                    key={item.key}
                    level={0}
                    leaf={item.isLeaf}
                    onClick={() => handleClick(item.key)}
                    onExpand={handleExpand}
                  >
                    {item.originalData.name}
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
