import {
  defaultGetChildren,
  GetChildren,
  LevelTreeNodeMap,
  TreeNodeMap,
} from './create'
import { Key, TreeNode } from './interface'

export class DataTree {
  treeNodeMap = new Map()
  levelTreeNodeMap = new Map()

  // constructor(nodes: any) {
  //   this.init(nodes)
  // }

  defaultGetChildren<R, G, I>(node: R | G | I): Array<R | G | I> | unknown {
    return (node as any).children
  }

  init(nodes: any) {
    console.log('INIT')
    const treeNodes = this.createDataTreeNodes(nodes, this.defaultGetChildren)

    console.log('TREE NODES', treeNodes)
    console.log('treeNodeMap', this.treeNodeMap)
    console.log('levelTreeNodeMap', this.levelTreeNodeMap)
    return treeNodes
  }

  createDataTreeNodes<R, G, I>(
    rawNodes: Array<R | G | I>,
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
          treeNode.children = this.createDataTreeNodes<R, G, I>(
            rawChildren,
            getChildren,
            treeNode as unknown as TreeNode<R, G>,
            level + 1,
          )
        }
      }
      treeNodes.push(treeNode)
      this.treeNodeMap.set(treeNode.key, treeNode)
      if (!this.levelTreeNodeMap.has(level))
        this.levelTreeNodeMap.set(level, [])
      this.levelTreeNodeMap.get(level)?.push(treeNode)
    })

    return treeNodes as any
  }

  getNode(key: Key | null | undefined) {
    if (key === null || key === undefined) return null
    const tmNode = this.treeNodeMap.get(key)
    if (tmNode && !tmNode.isGroup && !tmNode.ignored) {
      return tmNode
    }
    return null
  }
}
