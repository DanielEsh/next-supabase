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
  loading?: boolean
  selected?: boolean
  onClick?: (key: any) => void
  onExpand?: (key: number | string) => void
  onToggle?: (key: number | string, expanded: boolean) => void
}

const DEFAULT_INDENT = 4
const INDENT_MULTIPLIER = 20

export const TreeNode = (props: TreeNodeProps) => {
  const {
    node,
    level,
    leaf,
    expanded,
    loading,
    selected,
    children,
    onClick,
    onExpand,
    onToggle,
  } = props

  const getStyles = () => ({
    paddingLeft: `${level * INDENT_MULTIPLIER || DEFAULT_INDENT}px`,
  })

  const handleClick = () => {
    onClick && onClick(node?.key)
    // onExpand(node?.key)
  }

  const rootClasses = classNames('flex gap-1', {
    'bg-blue-500': selected,
  })

  const iconClasses = classNames('icon', {
    'rotate-90': expanded,
  })

  const classes = classNames({
    '': !expanded && leaf,
  })

  return (
    <li
      style={getStyles()}
      className={rootClasses}
      onClick={handleClick}
    >
      {loading && <div>Loading...</div>}
      {!leaf && (
        <button
          className={iconClasses}
          onClick={() => onToggle(node?.key, expanded)}
        >
          {<TreeIcon />}
        </button>
      )}
      <span className={classes}>{children}</span>
    </li>
  )
}
