import { createTreeNode } from './create-tree-node'
import { getDefaultLeaf } from './get-default-leaf'
import { getDefaultNodeChildren } from './get-default-node-children'
import { getDefaultNodeKey } from './get-default-node-key'
import type {
  Key,
  CreateTreeNodeOptions,
  GetNodeKeyFn,
  GetNodeChildrenFn,
} from './types'
import { isObject } from './utils/isObject'

export function createTree<DATA>(params: CreateTreeNodeOptions<DATA>) {
  const { nodes, parent, depth, getKey, getChildren } = params

  const getNodeKey: GetNodeKeyFn = (node: unknown): Key => {
    if (!isObject(node)) {
      throw new Error('Node should be object')
    }

    if (!getKey) {
      return getDefaultNodeKey(node)
    }

    if (typeof getKey === 'string') {
      return node[getKey] as Key
    }

    if (typeof getKey === 'function') {
      return getKey(node)
    }

    throw new Error('getKey should be either a string or a function')
  }

  const getNodeChildren: GetNodeChildrenFn<DATA> = (node: unknown) => {
    if (!isObject(node)) {
      throw new Error('Node should be object')
    }

    if (!getChildren) {
      return getDefaultNodeChildren(node) as DATA[]
    }

    if (typeof getChildren === 'string') {
      return node[getChildren] as DATA[]
    }

    if (typeof getChildren === 'function') {
      return getChildren(node)
    }

    throw new Error('getChildren should be either a string or a function')
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
