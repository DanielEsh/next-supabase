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

            if (!parentNode.leaf && !parentNode.children?.length) {
            }
          }

          const loadChildren = async (key: number) => {
            const parentNode = getNode(key)
            console.log('PARENT NODE', parentNode)

            const data = await queryClient.fetchQuery({
              queryKey: getTreeChildrenKey(key),
              queryFn: () => getTreeChildren(key),
            })

            const nestedChildren = createTreeNode({
              nodes: transformData(data),
              parent: parentNode,
              level: parentNode.level + 1,
            })

            parentNode.isLeaf = false
            parentNode.children = nestedChildren

            setActualNodes((prevElements) => {
              const newElements = [...prevElements]
              const element = newElements[parentNode.index]

              element.children = [...nestedChildren]

              return newElements
            })
          }

          const handleExpand = (key: number) => {
            setExpandedKeys((prevState) => {
              return prevState.filter((i) => i !== key)
            })
          }

          function collapseNode(key: number) {
            setExpandedKeys((prevState) => {
              return prevState.filter((item) => item !== key)
            })
          }

          function expandNode(key: number) {
            setExpandedKeys((prevState) => {
              return [...prevState, key]
            })
          }

          const handleToggle = async (key: number, status: boolean) => {
            console.log('TOGGLE', key, status)
            const expandedNodeKeyIndex = expandedKeys.findIndex(
              (v) => v === key,
            )
            const currentNode = getNode(key)
            if (expandedNodeKeyIndex >= 0) {
              collapseNode(key)
            } else {
              if (!currentNode.leaf && !currentNode.children?.length)
                await loadChildren(key)

              expandNode(currentNode.key)
            }
          }

          const flattedNodes = useMemo(() => {
            console.log('FLATTED NODES', expandedKeys)
            return getFlattenedRenderTree(actualNodes, expandedKeys)
          }, [actualNodes, expandedKeys])

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
                    node={item}
                    expanded={item.expanded}
                    onClick={() => handleClick(item.key)}
                    onToggle={handleToggle}
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
