import { DEFAULT_NODE_KEY_FIELD_NAME } from './constants'
import type { Key, DataTreeNode } from './types'

export const getDefaultNodeKey = (dataTreeNode: DataTreeNode): Key => {
  return dataTreeNode[DEFAULT_NODE_KEY_FIELD_NAME] as Key
}
