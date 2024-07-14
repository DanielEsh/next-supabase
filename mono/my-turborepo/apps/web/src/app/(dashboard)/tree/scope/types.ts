export type Key = string | number

export interface TreeNode<DATA> {
  key: Key
  index: number
  depth: number
  isLeaf: boolean
  children: TreeNode<DATA>[]
  parentKey?: Key
  data: DATA
}

type GetNodeKeyFn<NODE> = (node: NODE) => Key
type GetNodeKey<NODE> = Key | GetNodeKeyFn<NODE>

type GetNodeChildrenFn<NODE> = (node: NODE) => NODE[]
type GetNodeChildren<NODE> = NODE[] | GetNodeChildrenFn<NODE>

type GetLeafFn<NODE> = (node: NODE) => boolean
type GetLeaf<NODE> = boolean | GetLeafFn<NODE>

export type TreeNodeMap<NODE> = Record<Key, TreeNode<NODE>>

export interface CreateTreeNodeOptions<NODE> {
  nodes: NODE[]
  parent?: TreeNode<NODE>
  depth?: number
  getKey: GetNodeKey<NODE>
  getChildren: GetNodeChildren<NODE>
  getLeaf: GetLeaf<NODE>
}
