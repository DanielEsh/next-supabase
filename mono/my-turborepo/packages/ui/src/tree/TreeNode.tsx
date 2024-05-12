import { ReactNode } from 'react'

import { classNames } from '../classNames'
import { TreeIcon } from './TreeIcon'
import { NodeItem } from './types'

export interface TreeNodeProps {
  node?: NodeItem
  level: number
  children: ReactNode
  expanded?: boolean
  leaf?: boolean
  onClick: (key: any) => void
  onExpand?: (key: number | string) => void
}

const DEFAULT_INDENT = 4
const INDENT_MULTIPLIER = 20

export const TreeNode = (props: TreeNodeProps) => {
  const { node, level, leaf, expanded, children, onClick, onExpand } = props

  const getStyles = () => ({
    paddingLeft: `${level * INDENT_MULTIPLIER || DEFAULT_INDENT}px`,
  })

  const handleClick = () => {
    onClick(node?.key)
    onExpand(node?.key)
  }

  const iconClasses = classNames('icon', {
    'rotate-90': expanded,
  })

  return (
    <button
      style={getStyles()}
      className="flex gap-1"
      onClick={handleClick}
    >
      {!leaf && <span className={iconClasses}>{<TreeIcon />}</span>}
      <span className="tree node">{children}</span>
    </button>
  )
}
