import { Key, TreeNode } from './interface'

const createdData = [
  {
    key: '1',
    children: [
      {
        key: '1.1',
        children: [
          {
            key: '1.1.1',
            children: [
              {
                key: '1.1.1.1',
              },
            ],
          },
        ],
      },
    ],
  },
]

export type TreeNodeMap<R, G, I> = Map<Key, TreeNode<R, G, I>>

export type LevelTreeNodeMap<R, G, I> = Map<number, Array<TreeNode<R, G, I>>>

export type GetChildren<R, G, I> = (
  node: R | G | I,
) => Array<R | G | I> | unknown

export function defaultGetChildren<R, G, I>(
  node: R | G | I,
): Array<R | G | I> | unknown {
  return (node as any).children
}

function createTreeNodes<R, G, I>(
  rawNodes: Array<R | G | I>,
  treeNodeMap: TreeNodeMap<R, G, I>,
  levelTreeNodeMap: LevelTreeNodeMap<R, G, I>,
  getChildren: GetChildren<R, G, I>,
  parent: TreeNode<R, G> | null = null,
  level: number = 0,
): Array<TreeNode<R, G, I>> {
  const treeNodes: Array<TreeNode<R, G, I>> = []

  rawNodes.forEach((rawNode, index) => {
    const treeNode: TreeNode<R, G, I> = Object.create({})
    treeNode.key = rawNode.key
    treeNode.rawNode = rawNode
    treeNode.siblings = treeNodes
    treeNode.level = level
    treeNode.index = index
    treeNode.isFirstChild = index === 0
    treeNode.isLastChild = index + 1 === rawNodes.length
    treeNode.parent = parent

    if (!treeNode.ignored) {
      const rawChildren = getChildren(rawNode as R | G)
      if (Array.isArray(rawChildren)) {
        treeNode.children = createTreeNodes<R, G, I>(
          rawChildren,
          treeNodeMap,
          levelTreeNodeMap,
          getChildren,
          treeNode as unknown as TreeNode<R, G>,
          level + 1,
        )
      }
    }
    treeNodes.push(treeNode)
    treeNodeMap.set(treeNode.key, treeNode)
    if (!levelTreeNodeMap.has(level)) levelTreeNodeMap.set(level, [])
    levelTreeNodeMap.get(level)?.push(treeNode)
  })

  return treeNodes as any
}

export const create = (nodes: any[]) => {
  console.log('create')
  const treeNodeMap = new Map()
  const levelTreeNodeMap = new Map()

  const rawNodes = createdData

  const treeNodes = createTreeNodes(
    nodes,
    treeNodeMap,
    levelTreeNodeMap,
    defaultGetChildren,
  )

  console.log('TREE NODES', treeNodes)
  console.log('treeNodeMap', treeNodeMap)
  console.log('levelTreeNodeMap', levelTreeNodeMap)
  return treeNodes
}
