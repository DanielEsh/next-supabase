import { useContext } from 'react'

import { TreeViewContext } from '@/app/(dashboard)/tree/tree-view'
import { TreeViewNodeContext } from '@/app/(dashboard)/tree/tree-view-node'
import { classNames } from '@/shared/utils'

interface TreeViewNodeIndicatorProps {
  onClick?: (value: any) => void
}

export const TreeViewNodeIndicator = (props: TreeViewNodeIndicatorProps) => {
  const { onClick } = props
  const context = useContext(TreeViewContext)
  const treeViewNodeContext = useContext(TreeViewNodeContext)
  const handleClick = () => {
    if (onClick) {
      onClick(treeViewNodeContext.value)
    }
  }

  const classes = classNames('icon w-6 h-6', {
    'rotate-90': treeViewNodeContext.expanded,
  })

  return (
    <button
      className={classes}
      onClick={handleClick}
    >
      {/*{!treeViewNodeContext.leaf && (*/}
      {/*  <svg*/}
      {/*    xmlns="http://www.w3.org/2000/svg"*/}
      {/*    viewBox="0 0 24 24"*/}
      {/*    fill="none"*/}
      {/*    stroke="currentColor"*/}
      {/*    strokeWidth="2"*/}
      {/*    strokeLinecap="round"*/}
      {/*    strokeLinejoin="round"*/}
      {/*    className="chevron-right"*/}
      {/*  >*/}
      {/*    <path d="m9 18 6-6-6-6" />*/}
      {/*  </svg>*/}
      {/*)}*/}

      <svg
        xmlns="http://www.w3.org/2000/svg"
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
