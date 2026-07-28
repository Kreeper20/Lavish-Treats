// src/routes/__root.tsx
import type { ReactNode } from 'react'

import '../index.css'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { Navbar } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => (
    <RootDocument>
      <h1>404 - Not Found</h1>
    </RootDocument>
  ),
})



function RootComponent() {
  return (
    <RootDocument>
      <Navbar />
      <Outlet />
      <Footer />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}