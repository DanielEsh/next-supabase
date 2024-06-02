import type { ReactNode } from 'react'

interface TreeViewNodeProps {
  value: string | number
  children: ReactNode
}

export const TreeViewNode = (props: TreeViewNodeProps) => {
  const { children } = props
  return (
    <div
      role="button"
      className="flex items-center"
    >
      {children}
    </div>
  )
}
