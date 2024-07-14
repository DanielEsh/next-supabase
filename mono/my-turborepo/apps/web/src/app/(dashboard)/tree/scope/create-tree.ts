import { createTreeNode } from './create-tree-node'
import { getDefaultLeaf } from './get-default-leaf'
import { getDefaultNodeChildren } from './get-default-node-children'
import { getDefaultNodeKey } from './get-default-node-key'
import type { CreateTreeNodeOptions } from './types'

export function createTree<DATA>(params: CreateTreeNodeOptions<DATA>) {
  const { nodes, parent, depth, getKey, getChildren } = params

  const getNodeKey = (node: any) => {
    if (!getKey) return getDefaultNodeKey(node)

    if (typeof getKey === 'string') {
      return node[params.getKey]
    }

    return getKey(node)
  }

  const getNodeChildren = (node: Object) => {
    if (!getChildren) return getDefaultNodeChildren(node)

    if (typeof getChildren === 'string') {
      return node[params.getChildren]
    }

    return getChildren(node)
  }

  return createTreeNode({
    nodes,
    parent,
    depth,
    getKey: getNodeKey,
    getChildren: getNodeChildren,
    getLeaf: getDefaultLeaf,
  })
}
