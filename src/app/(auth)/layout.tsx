import type { ReactNode } from 'react'

import GlobalLayout from '@/app/global-layout'

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <GlobalLayout>
      <div>Auth layout</div>
      <div>{children}</div>
    </GlobalLayout>
  )
}
