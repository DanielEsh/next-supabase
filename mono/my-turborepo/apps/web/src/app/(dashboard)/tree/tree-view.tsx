import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

interface TreeViewContent {}

export const TreeViewContext = createContext<TreeViewContent>({})

interface TreeViewProps {
  expandedValue: (string | number)[]
  children: ReactNode
}

export const TreeView = (props: TreeViewProps) => {
  const { children, expandedValue } = props
  const [internalExpandedValue, setInternalExpandedValue] = useState<
    (string | number)[]
  >([])

  console.log('internalExpandedValue', internalExpandedValue)

  const collapseNode = (key: number | string) => {
    setInternalExpandedValue((prevState) => {
      return prevState.filter((item) => item !== key)
    })
  }

  const expandNode = (key: number | string) => {
    setInternalExpandedValue((prevState) => {
      return [...prevState, key]
    })
  }

  const handleToggleNode = (key: number | string) => {
    const expandedNodeKeyIndex = internalExpandedValue.findIndex(
      (v) => v === key,
    )

    expandedNodeKeyIndex >= 0 ? collapseNode(key) : expandNode(key)
    console.log('TOGGLE', key)
  }

  const value = {
    expandedValue,
    onToggleNode: handleToggleNode,
  }

  return (
    <TreeViewContext.Provider value={value}>
      {children}
    </TreeViewContext.Provider>
  )
}
