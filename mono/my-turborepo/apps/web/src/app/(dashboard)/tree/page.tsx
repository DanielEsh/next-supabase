'use client'

import { useState } from 'react'

import { TreeNode, createTree, getNode } from '@repo/ui/tree'
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
          const transformData = (data) => {
            return data.map((item) => {
              return {
                key: item.id,
                leaf: item.leaf || false,
                name: item.name,
                data: item,
                children: [],
              }
            })
          }

          const transformedData = tree.map((item) => {
            return {
              key: item.id,
              leaf: item.leaf || false,
              name: item.name,
              data: item,
              children: [],
            }
          })

          const createdTree = createTree(transformedData, {
            getLeaf: (node) => node.leaf,
          })

          const handleClick = async (key) => {
            console.log('KEY', key)
            const parentNode = getNode(key)
            const data = await queryClient.fetchQuery({
              queryKey: getTreeChildrenKey(key),
              queryFn: () => getTreeChildren(key),
            })

            const nestedChildren = transformData(data)

            parentNode.isLeaf = false
            parentNode.children = createTree(nestedChildren, {
              parent: parentNode,
              getKey: (node) => node.id,
              getLeaf: (node) => node.leaf,
            })
          }

          const handleExpand = () => {
            console.log('expand')
          }

          return (
            <>
              <pre>
                <code>{JSON.stringify(createdTree, null, 2)}</code>
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
