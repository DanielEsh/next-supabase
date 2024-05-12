import { ReactNode } from 'react'

import { NodeItem } from './types'

export interface TreeNodeProps {
  node?: NodeItem
  level: number
  children: ReactNode
  expanded?: boolean
  onClick: (key: any) => void
  onExpand?: (key: number | string) => void
}

const DEFAULT_INDENT = 4
const INDENT_MULTIPLIER = 20

export const TreeNode = (props: TreeNodeProps) => {
  const { node, level, expanded, children, onClick, onExpand } = props

  const getStyles = () => ({
    paddingLeft: `${level * INDENT_MULTIPLIER || DEFAULT_INDENT}px`,
  })

  const handleClick = () => {
    onClick(node?.key)
    onExpand(node?.key)
  }

  return (
    <button
      style={getStyles()}
      className="flex gap-3"
      onClick={handleClick}
    >
      <span>{expanded ? 'expanded' : 'expand'}</span>
      <span className="tree node">{children}</span>
    </button>
  )
}
