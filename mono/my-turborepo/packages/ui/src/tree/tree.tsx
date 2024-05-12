'use client'

import { useMemo, useState } from 'react'

import { TreeNode } from './TreeNode'
import { DataTree } from './utils/class'
import { create } from './utils/create'
import { flatten } from './utils/flatted'
import { createTree } from './utils/tree-module'

const tree = new DataTree()

export const Tree = () => {
  const [internalExpandedKeys, setInternalExpandedKeys] = useState([1])

  const nodes: any[] = [
    {
      key: 1,
      label: 'Node 1',
      level: 0,
      children: [
        {
          key: 2,
          label: 'Node 1.1',
          level: 1,
          children: [
            { key: 5, label: 'Node 1.1.1', level: 2 },
            { key: 6, label: 'Node 1.1.2', level: 2 },
          ],
        },
        { key: 3, isLeaf: false, label: 'Node 1.2', level: 1 },
        { key: 4, isLeaf: false, label: 'Node 1.3', level: 1 },
      ],
    },
  ]

  const getCreatedTree = () => {
    return tree.init(nodes)
  }

  console.log('getCreatedTree', getCreatedTree())
  console.log('RES [create]', createTree(nodes))

  const flattedNodes = useMemo(() => {
    return flatten(getCreatedTree(), internalExpandedKeys)
  }, [internalExpandedKeys])

  console.log('flattedNodes', flattedNodes)

  const handleExpand = (key: number) => {
    // setInternalExpandedKeys((prevState) => [key, ...prevState])
    const index = internalExpandedKeys.indexOf(key)
    if (index === -1) {
      // Если значение отсутствует в массиве, добавляем его
      setInternalExpandedKeys((prevArray) => [...prevArray, key])
    } else {
      // Если значение уже присутствует в массиве, удаляем его
      setInternalExpandedKeys((prevArray) =>
        prevArray.filter((item) => item !== key),
      )
    }

    console.log('INTERNAL', internalExpandedKeys)
  }

  const handleClick = (key: any) => {
    console.log('click', key)
    console.log('GET NODE', tree.getNode(key))
    console.log('GET PARENT', tree.getParent(key))
  }

  return (
    <div>
      <span>Tree Component from UI Kit</span>

      {flattedNodes.map((node) => (
        <TreeNode
          key={node.key}
          node={node}
          level={node.level}
          expanded={internalExpandedKeys.includes(node.key)}
          onClick={handleClick}
          onExpand={handleExpand}
        >
          {node.rawNode.label}
        </TreeNode>
      ))}

      <span>Const</span>
      <TreeNode level={0}>Item1</TreeNode>
      <TreeNode level={1}>Item1.1</TreeNode>
      <TreeNode level={1}>Item1.2</TreeNode>
      <TreeNode level={1}>Item1.3</TreeNode>

      <TreeNode level={0}>Item2</TreeNode>
      <TreeNode level={1}>Item2.1</TreeNode>
      <TreeNode level={1}>Item2.2</TreeNode>
      <TreeNode level={1}>Item2.3</TreeNode>

      <TreeNode level={0}>Item3</TreeNode>
      <TreeNode level={1}>Item3.1</TreeNode>
      <TreeNode level={1}>Item3.2</TreeNode>
      <TreeNode level={1}>Item3.3</TreeNode>
    </div>
  )
}
