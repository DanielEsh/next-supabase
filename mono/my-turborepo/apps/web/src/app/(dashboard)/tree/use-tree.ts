import { useMemo, useState } from 'react'

import {
  createTree,
  getFlattenedRenderTree,
  getNode,
} from '@/app/(dashboard)/tree/tree-module'

export function useTree(initialData: any) {
  const [internalExpandedValue, setInternalExpandedValue] = useState<
    (string | number)[]
  >([])

  console.log('internalExpandedValue', internalExpandedValue)

  const collapseNode = (key: number | string) => {
    setInternalExpandedValue((prevState) => {
      return prevState.filter((item) => item !== key)
    })
  }

  const expandNode = (key: number | string) => {
    setInternalExpandedValue((prevState) => {
      return [...prevState, key]
    })
  }

  const toggleNode = (key: number) => {
    const expandedNodeKeyIndex = internalExpandedValue.findIndex(
      (v) => v === key,
    )
    const currentNode = getNode(key)
    if (expandedNodeKeyIndex >= 0) {
      collapseNode(key)
    } else {
      expandNode(currentNode.key)
    }
  }

  const createdTree = createTree(initialData)

  const flattedTreeNodes = useMemo(() => {
    return getFlattenedRenderTree(createdTree, internalExpandedValue)
  }, [createdTree, internalExpandedValue])

  return {
    expandedKeys: internalExpandedValue,
    flattedTreeNodes,
    collapseNode,
    expandNode,
    toggleNode,
  }
}
