import { getDefaultNodeChildren } from './get-default-node-children'
import type { DataTreeNode } from './types'

export function getDefaultLeaf(dataTreeNode: DataTreeNode): boolean {
  if (!getDefaultNodeChildren(dataTreeNode)) {
    return true
  }

  return dataTreeNode?.isLeaf ?? false
}
