'use client'

import { useEffect, useMemo, useState } from 'react'

import { TreeNode } from '@repo/ui/tree'
import { useQueryClient } from '@tanstack/react-query'

import {
  createTree,
  createTreeNode,
  getNode,
  getFlattenedRenderTree,
  getParent,
} from '@/app/(dashboard)/tree/tree-module'
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
          const [actualNodes, setActualNodes] = useState([])
          const [expandedKeys, setExpandedKeys] = useState([])
          const transformData = (data) => {
            return data.map((item) => {
              return {
                ...item,
                children: [],
              }
            })
          }

          const transformedData = tree.map((item) => {
            return {
              ...item,
              children: [],
            }
          })

          const treeData = createTree(transformedData)

          useEffect(() => {
            console.log('CREATE', treeData)
            setActualNodes(treeData)
          }, [])

          const handleClick = async (key) => {
            console.log('KEY', key)
            const parentNode = getNode(key)
            const data = await queryClient.fetchQuery({
              queryKey: getTreeChildrenKey(key),
              queryFn: () => getTreeChildren(key),
            })

            setExpandedKeys((prevState) => {
              return [...prevState, key]
            })

            const nestedChildren = createTreeNode({
              nodes: transformData(data),
              parent: parentNode,
              level: parentNode.level + 1,
            })

            console.log('nestedChildren', nestedChildren)

            parentNode.isLeaf = false
            parentNode.children = nestedChildren

            setActualNodes((prevElements) => {
              const newElements = [...prevElements]
              const element = newElements[parentNode.index]

              element.children = [...nestedChildren]

              return newElements
            })
          }

          const handleExpand = () => {
            console.log('expand')
          }

          const flattedNodes = useMemo(() => {
            return getFlattenedRenderTree(actualNodes, expandedKeys)
          }, [actualNodes])

          return (
            <>
              {/*<pre>*/}
              {/*  <code>{JSON.stringify(actualNodes, null, 2)}</code>*/}
              {/*</pre>*/}
              {flattedNodes.map((item) => {
                return (
                  <TreeNode
                    key={item.key}
                    level={item.level}
                    leaf={item.isLeaf}
                    onClick={() => handleClick(item.key)}
                    onExpand={handleExpand}
                  >
                    {item.originalData.name} {item.key}
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
