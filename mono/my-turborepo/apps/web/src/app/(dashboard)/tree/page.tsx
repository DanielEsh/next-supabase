'use client'

import { useEffect, useMemo, useState } from 'react'

import { TreeNode } from '@repo/ui/tree'
import { useQueryClient } from '@tanstack/react-query'

import { TreeCreateForm } from '@/app/(dashboard)/tree/tree-create-form'
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
import { Input } from '@/shared/ui'
import { Form } from '@/shared/ui/form'

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
          console.log('tree', tree)
          const [actualNodes, setActualNodes] = useState([])
          const [expandedKeys, setExpandedKeys] = useState([])
          const [loadingKeys, setLoadingsKeys] = useState(new Set<number>())
          const [selectedValue, setSelectedValue] = useState()

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
          }, [tree])

          const handleClick = async (key) => {
            console.log('KEY', key)
            setSelectedValue(key)
          }

          const updateNode = (key, newChildren, nodes) => {
            return nodes.map((node) => {
              if (node.key === key) {
                return {
                  ...node,
                  children: newChildren,
                  isLeaf: false,
                }
              }
              if (node.children) {
                return {
                  ...node,
                  children: updateNode(key, newChildren, node.children),
                }
              }
              return node
            })
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

            setActualNodes((prevNodes) =>
              updateNode(key, nestedChildren, prevNodes),
            )
          }

          useEffect(() => {
            console.log('actual', actualNodes)
          }, [actualNodes])

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

          const addLoadingKey = (key: number) => {
            setLoadingsKeys((prevKeys) => {
              const newKeys = new Set(prevKeys)
              newKeys.add(key)
              return newKeys
            })
          }

          const deleteLoadingKey = (key: number) => {
            setLoadingsKeys((prevKeys) => {
              const newKeys = new Set(prevKeys)
              newKeys.delete(key)
              return newKeys
            })
          }

          const handleToggle = async (key: number, status: boolean) => {
            const expandedNodeKeyIndex = expandedKeys.findIndex(
              (v) => v === key,
            )
            const currentNode = getNode(key)
            if (expandedNodeKeyIndex >= 0) {
              collapseNode(key)
            } else {
              if (!currentNode.leaf && !currentNode.children?.length) {
                addLoadingKey(key)
                await loadChildren(key)
                deleteLoadingKey(key)
              }

              expandNode(currentNode.key)
            }
          }

          const flattedNodes = useMemo(() => {
            console.log('EXPANDED KEYS', expandedKeys)
            return getFlattenedRenderTree(actualNodes, expandedKeys)
          }, [actualNodes, expandedKeys])

          return (
            <>
              {/*<pre>*/}
              {/*  <code>{JSON.stringify(actualNodes, null, 2)}</code>*/}
              {/*</pre>*/}

              <TreeCreateForm parentId={selectedValue} />

              {flattedNodes.map((item) => {
                return (
                  <TreeNode
                    key={item.key}
                    level={item.level}
                    leaf={item.isLeaf}
                    node={item}
                    expanded={item.expanded}
                    selected={item.key === selectedValue}
                    loading={loadingKeys.has(item.key)}
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
