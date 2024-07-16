import type { TreeNode, Key, RenderTreeNode } from './types'

export function getFlattenedRenderTree<DATA>(
  treeNodes: TreeNode<DATA>[],
  expandedKeys?: Key[],
): RenderTreeNode<DATA>[] {
  const expandedKeySet = expandedKeys ? new Set<Key>(expandedKeys) : undefined
  const flattenedNodes: RenderTreeNode<DATA>[] = []

  function traverse(treeNodes: TreeNode<DATA>[]): RenderTreeNode<DATA>[] {
    return treeNodes.map((treeNode) => {
      const renderTreeNode: RenderTreeNode<DATA> = {
        ...treeNode,
        expanded: false,
      }
      flattenedNodes.push(renderTreeNode)

      if (!renderTreeNode.isLeaf && renderTreeNode.children) {
        if (
          expandedKeySet === undefined ||
          expandedKeySet.has(renderTreeNode.key)
        ) {
          renderTreeNode.expanded = true
          traverse(renderTreeNode.children)
        }
      }

      return renderTreeNode
    })
  }

  traverse(treeNodes)
  return flattenedNodes
}
