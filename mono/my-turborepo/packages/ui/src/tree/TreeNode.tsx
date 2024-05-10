import { ReactNode } from 'react'

import { NodeItem } from './types'

export interface TreeNodeProps {
  node?: NodeItem
  level: number
  children: ReactNode
}

const DEFAULT_INDENT = 4
const INDENT_MULTIPLIER = 20

export const TreeNode = (props: TreeNodeProps) => {
  const { node, level, children } = props

  const getStyles = () => ({
    paddingLeft: `${level * INDENT_MULTIPLIER || DEFAULT_INDENT}px`,
  })

  return (
    <div style={getStyles()}>
      {node?.leaf && <button>expand</button>}
      <span className="tree node">{children}</span>
    </div>
  )
}
