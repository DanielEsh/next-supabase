import { DEFAULT_NODE_CHILDREN_FIELD_NAME } from './constants'
import type { DataTreeNode } from './types'

export const getDefaultNodeChildren = (node: DataTreeNode) => {
  return node[DEFAULT_NODE_CHILDREN_FIELD_NAME] as DataTreeNode[]
}
