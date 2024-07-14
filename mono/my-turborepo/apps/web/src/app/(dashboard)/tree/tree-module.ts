import { Key } from '@repo/ui/src/tree/utils/interface'

export type TreeNodeKey = string | number

interface Object {
  [key: string]: unknown
}

export interface ITreeNode {
  key: TreeNodeKey
  index: number
  level: number
  isLeaf: boolean
  children: Array<ITreeNode>
  parentKey: TreeNodeKey
  originalData: Object
}

type GetNodeKeyFn<I> = (node: I) => string
type GetNodeKey = string | GetNodeKeyFn<unknown>

type GetNodeChildrenFn<I> = (node: I) => string
type GetNodeChildren = string | GetNodeChildrenFn<unknown>

interface CreateTreeNodeOptions {
  nodes: any[]
  parent?: ITreeNode | null
  level?: number
  getKey: GetNodeKey
  getChildren: GetNodeChildren
  getLeaf: any
}

const treeNodeMap = new Map()
const levelTreeNodeMap = new Map()

const DEFAULT_NODE_KEY_FIELD_NAME = 'key'
const DEFAULT_NODE_CHILDREN_FIELD_NAME = 'children'

const getDefaultNodeKey = (node: Object) => {
  return node[DEFAULT_NODE_KEY_FIELD_NAME]
}

const getDefaultNodeChildren = (node: Object) => {
  return node[DEFAULT_NODE_CHILDREN_FIELD_NAME] as string
}

function getDefaultLeaf(node: unknown): Key {
  if (!getDefaultNodeChildren(node)) {
    return true
  }

  return (node as any).isLeaf
}

export const createTreeNode = (options: CreateTreeNodeOptions) => {
  const {
    nodes,
    parent = null,
    level = 0,
    getKey,
    getChildren,
    getLeaf,
  } = options
  return nodes.map((node, index) => {
    const treeNode = {} as ITreeNode
    const withChildren = getChildren(node)?.length

    treeNode.key = getKey(node)
    treeNode.originalData = node
    treeNode.level = level
    treeNode.index = index
    treeNode.parentKey = parent?.key ?? null
    treeNode.isLeaf = getLeaf(node)

    if (!treeNode.isLeaf && withChildren) {
      treeNode.isLeaf = false
      treeNode.children = createTreeNode({
        nodes: node.children,
        parent: treeNode,
        level: level + 1,
        getKey,
        getChildren,
        getLeaf,
      })
    }

    treeNodeMap.set(treeNode.key, treeNode)
    if (!levelTreeNodeMap.has(level)) {
      levelTreeNodeMap.set(level, [])
    }
    levelTreeNodeMap.get(level)?.push(treeNode)

    console.log('treeNodeMap', treeNodeMap)
    console.log('levelTreeNodeMap', levelTreeNodeMap)

    return treeNode
  })
}

export function createTree(params: CreateTreeNodeOptions) {
  const { nodes, parent, level, getKey, getChildren } = params

  const getNodeKey = (node: Object) => {
    if (!getKey) return getDefaultNodeKey(node)

    if (typeof getKey === 'string') {
      return node[params.getKey] as string
    }

    return getKey(node)
  }

  const getNodeChildren = (node: Object) => {
    if (!getChildren) return getDefaultNodeChildren(node)

    if (typeof getChildren === 'string') {
      return node[params.getChildren] as string
    }

    return getChildren(node)
  }

  return createTreeNode({
    nodes,
    parent,
    level,
    getKey: getNodeKey,
    getChildren: getNodeChildren,
    getLeaf: getDefaultLeaf,
  })
}

export function getFlattenedRenderTree(
  treeNodes: ITreeNode[],
  expandedKeys?: TreeNodeKey[],
) {
  const expandedKeySet = expandedKeys
    ? new Set<TreeNodeKey>(expandedKeys)
    : undefined
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

export function getNode(key: TreeNodeKey) {
  return treeNodeMap.get(key) ?? null
}

export function getParent(key: TreeNodeKey) {
  const parentKey = getNode(key).parentKey
  return getNode(parentKey) ?? null
}
