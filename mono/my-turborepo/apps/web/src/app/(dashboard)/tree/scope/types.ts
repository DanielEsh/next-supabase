type Key = string | number

export interface TreeNode<DATA> {
  key: Key
  index: number
  depth: number
  isLeaf: boolean
  children: TreeNode<DATA>[]
  parentKey?: Key
  data: DATA
}

type GetNodeKeyFn<NODE> = (node: NODE) => string
type GetNodeKey<NODE> = string | GetNodeKeyFn<NODE>

type GetNodeChildrenFn<NODE> = (node: NODE) => string
type GetNodeChildren<NODE> = string | GetNodeChildrenFn<NODE>
