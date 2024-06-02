import { useContext } from 'react'

import { TreeViewContext } from '@/app/(dashboard)/tree/tree-view'

interface TreeViewNodeIndicatorProps {
  onClick?: () => void
}

export const TreeViewNodeIndicator = () => {
  const context = useContext(TreeViewContext)
  const handleClick = () => {
    context.onToggleNode(1)
  }

  return (
    <button onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="chevron-right"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  )
}
