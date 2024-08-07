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
} from '@/app/(dashboard)/tree/scope'
import { TreeCreateForm } from '@/app/(dashboard)/tree/tree-create-form'
import { TreeDeleteButton } from '@/app/(dashboard)/tree/tree-delete-button'
import { TreeUpdateForm } from '@/app/(dashboard)/tree/tree-update-form'
import { TreeView } from '@/app/(dashboard)/tree/tree-view'
import { TreeViewNode } from '@/app/(dashboard)/tree/tree-view-node'
import { TreeViewNodeIndent } from '@/app/(dashboard)/tree/tree-view-node-indent'
import { TreeViewNodeIndicator } from '@/app/(dashboard)/tree/tree-view-node-indicator'
import { useTree } from '@/app/(dashboard)/tree/use-tree'
import { ReactQuery } from '@/components/ReactQuery'
import { getTreeChildren } from '@/entities/test/repository/requests'
import {
  getTreeChildrenKey,
  useTree as useTreeQuery,
  useTreeChildren,
} from '@/entities/test/use-tree'

import classes from './tree.module.css'

const ClientPage = () => {
  const usersQuery = useTreeQuery()
  const queryClient = useQueryClient()

  const initialTreeStruct = [
    {
      id: '1',
      name: 'Node 1',
      // isLeaf: false,
      children: [
        {
          id: '1.1',
          name: 'Node 1.1',
          // isLeaf: false,
          children: [
            {
              id: '1.1.1',
              name: 'Node 1.1.1',
              // isLeaf: true,
            },
          ],
        },
        {
          id: '1.2',
          name: 'Node 1.2',
          // isLeaf: true,
        },
        {
          id: '1.3',
          name: 'Node 1.3',
          // isLeaf: true,
        },
      ],
    },
    {
      id: '2',
      name: 'Node 2',
      // isLeaf: true,
    },
    {
      id: '3',
      name: 'Node 3',
      // isLeaf: true,
    },
    {
      id: '4',
      name: 'Node 4',
      // isLeaf: false,
      children: [
        {
          id: '4.1',
          name: 'Node 4.1',
          // isLeaf: true,
        },
      ],
    },
  ]

  const { flattedTreeNodes, toggleNode } = useTree(initialTreeStruct)

  const handleNodeToggleClick = (value: any) => {
    toggleNode(value)
  }

  return (
    <div>
      <p>Users list</p>

      <TreeView expandedValue={[1, 2, 3]}>
        <div className={classes.treeRoot}>
          {flattedTreeNodes.map((node) => {
            return (
              <TreeViewNode
                key={node.key}
                depth={node.depth}
                value={node.key}
                expanded={node.expanded}
                leaf={node.isLeaf}
              >
                <TreeViewNodeIndent depth={node.depth} />
                {!node.isLeaf ? (
                  <TreeViewNodeIndicator onClick={handleNodeToggleClick} />
                ) : (
                  <div className="h-6 w-6" />
                )}

                <span>{node.data.name}</span>
              </TreeViewNode>
            )
          })}
        </div>
      </TreeView>

      <ReactQuery
        queryResult={usersQuery}
        renderLoading={<p>Getting users data...</p>}
        render={(tree) => {
          console.log('tree', tree)
          const [actualNodes, setActualNodes] = useState([])
          const [expandedKeys, setExpandedKeys] = useState([])
          const [loadingKeys, setLoadingsKeys] = useState(new Set<number>())
          const [selectedValue, setSelectedValue] = useState()

          const treeData = createTree({
            nodes: tree,
            getKey: 'id',
            getLeaf: 'leaf',
          })

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

            console.log('DATA', data)

            const nestedChildren = createTree({
              nodes: data,
              parent: parentNode,
              depth: parentNode?.depth + 1,
              getKey: 'id',
              getLeaf: 'leaf',
            })

            console.log('nestedChildren', nestedChildren)

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
              <TreeUpdateForm parentId={selectedValue} />
              {selectedValue && <TreeDeleteButton id={selectedValue} />}

              <TreeView>
                {flattedNodes.map((item) => {
                  return (
                    <TreeViewNode
                      key={item.key}
                      depth={item.depth}
                      leaf={item.isLeaf}
                      expanded={item.expanded}
                      onClick={() => handleClick(item.key)}
                    >
                      <TreeViewNodeIndent depth={item.depth} />
                      {loadingKeys.has(item.key) && <div>Loading...</div>}

                      {!item.isLeaf ? (
                        <TreeViewNodeIndicator
                          onClick={() => handleToggle(item.key, item.expanded)}
                        />
                      ) : (
                        <div className="h-6 w-6" />
                      )}
                      <span>{item.data.name}</span>
                    </TreeViewNode>
                  )
                })}
              </TreeView>
            </>
          )
        }}
      />
    </div>
  )
}

export default ClientPage
