import type { ReactNode } from 'react'

interface TreeViewNodeIndent {
  depth: number
}

export const TreeViewNodeIndent = ({ depth }: TreeViewNodeIndent) => {
  const list: ReactNode[] = []
  for (let i = 0; i < depth; i += 1) {
    list.push(
      <div
        key={i}
        className="w-6 h-6"
      />,
    )
  }

  return (
    <div
      aria-hidden="true"
      className="flex"
    >
      {list}
    </div>
  )
}
