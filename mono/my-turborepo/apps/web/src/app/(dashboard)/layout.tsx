import type { ReactNode } from 'react'

import { Inter } from 'next/font/google'

import Login from '../../components/login'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-900">
        <div className="flex min-h-screen p-4">
          <aside className="w-[260px] flex flex-col text-white">
            aside
            <ul>
              <li>Home</li>
              <li>Recent</li>
              <li>Favorites</li>
              <li>Archive</li>
            </ul>
            <ul>
              <li>Settings</li>
              <li>Documentation</li>
            </ul>
            <div className="flex mt-auto">
              <div className="w-12 h-12 rounded-full bg-neutral-600"></div>
              <div className="px-4">
                <div className="flex gap-2">
                  <span>First Name</span>
                  <span>Last Name</span>
                </div>
                <div>username</div>
              </div>
            </div>
          </aside>
          <div className="bg-neutral-950 flex-auto text-white px-10 py-8 rounded-lg">
            <span>Breadcrumbs</span>
            <h1 className="text-3xl">Workspace</h1>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
