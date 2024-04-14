import type { ReactNode } from 'react'

export interface TypeWithChildren {
  children: ReactNode
}

export interface UiDefaultProps extends TypeWithChildren {
  className?: string
}
