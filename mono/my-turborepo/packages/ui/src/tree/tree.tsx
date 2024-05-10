import { TreeNode } from './TreeNode'

export const Tree = () => {
  return (
    <div>
      <span>Tree Component from UI Kit</span>
      <TreeNode level={0}>Item1</TreeNode>
      <TreeNode level={1}>Item1.1</TreeNode>
      <TreeNode level={1}>Item1.2</TreeNode>
      <TreeNode level={1}>Item1.3</TreeNode>

      <TreeNode level={0}>Item2</TreeNode>
      <TreeNode level={1}>Item2.1</TreeNode>
      <TreeNode level={1}>Item2.2</TreeNode>
      <TreeNode level={1}>Item2.3</TreeNode>

      <TreeNode level={0}>Item3</TreeNode>
      <TreeNode level={1}>Item3.1</TreeNode>
      <TreeNode level={1}>Item3.2</TreeNode>
      <TreeNode level={1}>Item3.3</TreeNode>
    </div>
  )
}
