import type { ReactNode, CSSProperties } from 'react'
import { createContext } from 'react'

import { classNames } from '@/shared/utils'

import styles from './tree.module.css'

interface TreViewNodeContext {
  depth: number
  leaf?: boolean
  expanded?: boolean
}

export const TreeViewNodeContext = createContext<TreViewNodeContext>({
  depth: 0,
})

interface TreeViewNodeProps {
  value: string | number
  children: ReactNode
  depth: number
  leaf?: boolean
  expanded?: boolean
}

export const TreeViewNode = (props: TreeViewNodeProps) => {
  const { children, depth, value, leaf = false, expanded = false } = props

  const classes = classNames('flex items-center', styles.tree, {
    '': leaf,
  })

  const contextValue = {
    depth,
    value,
    leaf,
    expanded,
  }

  return (
    <TreeViewNodeContext.Provider value={contextValue}>
      <div
        role="button"
        style={
          {
            '--depth': depth,
          } as CSSProperties
        }
        className={classes}
      >
        {children}
      </div>
    </TreeViewNodeContext.Provider>
  )
}
