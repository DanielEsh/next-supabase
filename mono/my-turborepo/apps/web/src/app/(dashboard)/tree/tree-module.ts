import { ITreeNode, Key } from '@repo/ui/src/tree/utils/interface'

const treeNodeMap = new Map()
const levelTreeNodeMap = new Map()

interface CreateTreeNodeOptions {
  nodes: any[]
  parent?: ITreeNode | null
  level?: number
}

export const createTreeNode = (options: CreateTreeNodeOptions) => {
  const { nodes, parent = null, level = 0 } = options

  return nodes.map((node, index) => {
    const treeNode = {} as ITreeNode
    const haveChildren = node.children.length

    treeNode.key = node.id
    treeNode.originalData = node
    treeNode.level = level
    treeNode.index = index
    treeNode.parentKey = parent?.key ?? null
    treeNode.isLeaf = node.leaf

    if (!treeNode.isLeaf && haveChildren) {
      treeNode.isLeaf = false
      treeNode.children = createTreeNode({
        nodes: node.children,
        parent: treeNode,
        level: level + 1,
      })
    }

    treeNodeMap.set(treeNode.key, treeNode)
    if (!levelTreeNodeMap.has(level)) {
      levelTreeNodeMap.set(level, [])
    }
    levelTreeNodeMap.get(level)?.push(treeNode)

    return treeNode
  })
}

export function createTree(nodes: any[]) {
  return createTreeNode({
    nodes,
  })
}

export function getFlattenedRenderTree(
  treeNodes: ITreeNode[],
  expandedKeys?: Key[],
) {
  const expandedKeySet = expandedKeys ? new Set<Key>(expandedKeys) : undefined
  const flattenedNodes: ITreeNode[] = []
  function traverse(treeNodes: ITreeNode[]) {
    treeNodes.forEach((treeNode) => {
      treeNode.expanded = false
      flattenedNodes.push(treeNode)
      if (treeNode.isLeaf || !treeNode.children) return
      if (
        // normal non-leaf node
        expandedKeySet === undefined ||
        expandedKeySet.has(treeNode.key)
      ) {
        treeNode.expanded = true
        traverse(treeNode.children)
      }
    })
  }
  traverse(treeNodes)

  return flattenedNodes
}

export function getNode(key: Key) {
  return treeNodeMap.get(key) ?? null
}

export function getParent(key: Key) {
  const parentKey = getNode(key).parentKey
  return getNode(parentKey) ?? null
}
