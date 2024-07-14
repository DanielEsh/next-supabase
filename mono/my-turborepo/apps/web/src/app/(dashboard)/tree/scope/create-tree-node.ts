import type { CreateTreeNodeOptions, TreeNode, Key } from './types'

const treeNodeMap = new Map<Key, TreeNode<any>>()
const depthTreeNodeMap = new Map<number, TreeNode<any>[]>()

export const createTreeNode = <NODE>(options: CreateTreeNodeOptions<NODE>) => {
  const {
    nodes,
    parent = null,
    depth = 0,
    getKey,
    getChildren,
    getLeaf,
  } = options
  return nodes.map((node, index) => {
    const treeNode = {} as TreeNode<NODE>
    const withChildren = getChildren(node)?.length

    treeNode.key = getKey(node)
    treeNode.data = node
    treeNode.depth = depth
    treeNode.index = index
    treeNode.parentKey = parent?.key ?? null
    treeNode.isLeaf = getLeaf(node)

    if (!treeNode.isLeaf && withChildren) {
      treeNode.isLeaf = false
      treeNode.children = createTreeNode({
        nodes: node.children,
        parent: treeNode,
        depth: depth + 1,
        getKey,
        getChildren,
        getLeaf,
      })
    }

    treeNodeMap.set(treeNode.key, treeNode)
    if (!depthTreeNodeMap.has(depth)) {
      depthTreeNodeMap.set(depth, [])
    }
    depthTreeNodeMap.get(depth)?.push(treeNode)

    return treeNode
  })
}
