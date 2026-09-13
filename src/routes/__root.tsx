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
import { ShoppingCartProvider } from '../components/context/ShoppingCartContext'
import { AlertProvider } from '../components/cart/Toast'




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
        title: 'Lavish Treats',
        description: 'Lavish Treats is a bakery that specializes in custom cakes and pastries.',
        links: [
          { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        ],
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
    <ShoppingCartProvider>
      <AlertProvider>
      <RootDocument>
        <Navbar />
        <Outlet />
        <Footer />
      </RootDocument>
    </AlertProvider>
    </ShoppingCartProvider>
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