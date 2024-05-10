'use client'

import { useMemo, useState } from 'react'

import { TreeNode } from './TreeNode'
import { flatten } from './utils/flatted'
import { RawNode } from './utils/interface'

export const Tree = () => {
  const [internalExpandedKeys, setInternalExpandedKeys] = useState([])

  const nodes: RawNode[] = [
    {
      key: 1,
      children: [
        { key: 2, isLeaf: false },
        { key: 3, isLeaf: false },
      ],
    },
  ]

  const flattedNodes = useMemo(() => {
    return flatten(nodes, internalExpandedKeys)
  }, [internalExpandedKeys])

  return (
    <div>
      <span>Tree Component from UI Kit</span>

      {flattedNodes.map((node) => (
        <TreeNode
          key={node.key}
          node={node.rawNode}
          level={node.level}
        >
          label
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
