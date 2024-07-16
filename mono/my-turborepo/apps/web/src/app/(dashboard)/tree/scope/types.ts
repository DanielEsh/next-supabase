export type Key = string | number

export interface DataTreeNode {
  key?: Key
  isLeaf?: boolean
  children?: DataTreeNode[]
}

export interface TreeNode<DATA> {
  key: Key
  index: number
  depth: number
  isLeaf: boolean
  children: TreeNode<DATA>[]
  parentKey?: Key
  data: DATA
}

export interface RenderTreeNode<DATA> extends TreeNode<DATA> {
  expanded: boolean
}

export type GetNodeKeyFn = (node: DataTreeNode | unknown) => Key
type GetNodeKey = Key | GetNodeKeyFn

export type GetNodeChildrenFn<NODE> = (node: DataTreeNode | unknown) => NODE[]
type GetNodeChildren<NODE> = NODE[] | GetNodeChildrenFn<NODE>

type GetLeafFn = (node: DataTreeNode) => boolean
type GetLeaf = boolean | GetLeafFn

export interface CreateTreeNodeOptions<NODE> {
  nodes: NODE[]
  parent?: TreeNode<NODE>
  depth?: number
  getKey: GetNodeKey
  getChildren: GetNodeChildren<NODE>
  getLeaf: GetLeaf
}
