export type Key = string | number

export interface RawNode {
  key?: Key
  children?: RawNode[]
  isLeaf?: boolean
  disabled?: boolean
  [key: string]: unknown
}

export interface GetPrevNextOptions {
  loop?: boolean
  includeDisabled?: boolean
}

// R=RawNode, G=GroupNode, I=IgnoredNode
export interface TreeNode<R = RawNode, G = R, I = R> {
  key: Key
  rawNode: R | G | I
  level: number
  index: number
  isFirstChild: boolean
  isLastChild: boolean
  parent: TreeNode<R, G> | null
  isLeaf: boolean
  isGroup: boolean
  ignored: boolean
  shallowLoaded: boolean
  disabled: boolean
  siblings: Array<TreeNode<R, G, I>>
  children?: Array<TreeNode<R, G, I>>
  getPrev: (options?: GetPrevNextOptions) => TreeNode<R> | null
  getNext: (options?: GetPrevNextOptions) => TreeNode<R> | null
  getParent: () => TreeNode<R> | null
  getChild: () => TreeNode<R> | null
  contains: (treeNode: TreeNode<R, G, I> | null | undefined) => boolean
}

export type TreeNodeMap<R, G, I> = Map<Key, TreeNode<R, G, I>>
export type LevelTreeNodeMap<R, G, I> = Map<number, Array<TreeNode<R, G, I>>>
