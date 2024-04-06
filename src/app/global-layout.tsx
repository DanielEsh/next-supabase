import type { ReactNode } from 'react'

import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  children: ReactNode
}

export default async function GlobalLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-neutral-900">{children}</body>
    </html>
  )
}
