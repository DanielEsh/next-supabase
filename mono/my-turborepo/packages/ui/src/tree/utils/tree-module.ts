import { GetChildren } from './create'
import { ITreeNode, Key, TreeNode } from './interface'

const treeNodeMap = new Map()
const levelTreeNodeMap = new Map()

interface CreateTreeNodeOptions {
  nodes: any[]
  getChildren: GetChildren<any, any, any>
  getKey: any
  getLeaf: any
  parent?: ITreeNode | null
  level?: number
}

function defaultGetChildren<R, G, I>(
  node: R | G | I,
): Array<R | G | I> | unknown {
  return (node as any).children
}

export function defaultGetKey(node: unknown): Key {
  return (node as any).key
}

export function getDefaultLeaf(node: unknown): Key {
  return (node as any).isLeaf
}

function createTreeNode(options: CreateTreeNodeOptions) {
  const {
    nodes,
    getChildren,
    getKey,
    getLeaf,
    parent = null,
    level = 0,
  } = options

  return nodes.map((node, index) => {
    const treeNode = {} as ITreeNode
    const rawChildren = getChildren(node)

    treeNode.key = getKey(node)
    treeNode.originalData = node
    treeNode.level = level
    treeNode.index = index
    treeNode.parentKey = parent?.key ?? null
    treeNode.isLeaf = getLeaf(node)

    if (!treeNode.isLeaf && Array.isArray(rawChildren)) {
      treeNode.isLeaf = false
      treeNode.children = createTreeNode({
        nodes: rawChildren,
        getChildren,
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

interface Options {
  getKey: any
  getChildren: any
  getLeaf: any
}

export function createTree(nodes: any[], options: Options) {
  const treeNodes = createTreeNode({
    nodes,
    getChildren: defaultGetChildren,
    getKey: options.getKey ?? defaultGetKey,
    getLeaf: options.getLeaf ?? getDefaultLeaf,
  })

  console.log('RESULT', treeNodes)
  return treeNodes
}

export function getFlattenedRenderTree(
  treeNodes: ITreeNode[],
  expandedKeys?: Key[],
) {
  const expandedKeySet = expandedKeys ? new Set<Key>(expandedKeys) : undefined
  const flattenedNodes: ITreeNode[] = []
  function traverse(treeNodes: ITreeNode[]) {
    treeNodes.forEach((treeNode) => {
      flattenedNodes.push(treeNode)
      if (treeNode.isLeaf || !treeNode.children) return
      if (
        // normal non-leaf node
        expandedKeySet === undefined ||
        expandedKeySet.has(treeNode.key)
      ) {
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
