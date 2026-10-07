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
import { PromoBar } from '../components/promotions/PromoBar'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();




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

      //open graph meta tags
      {
        property: 'og:title',
        content: 'Lavish Treats',
      },
      {
        property: 'og:description',
        content: 'Lavish Treats is a bakery that specializes in custom cakes and pastries.',
      },
      {
        property: 'og:image',
        content: '/favicon.svg',
      },
      {
        property: 'og:url',
        content: 'https://lavishtreats.co.uk',
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
    <QueryClientProvider client={queryClient}>
    <ShoppingCartProvider>
      <AlertProvider>
      <RootDocument>
        <Navbar />
        <PromoBar />
        <Outlet />
        <Footer />
      </RootDocument>
    </AlertProvider>
    </ShoppingCartProvider>
    </QueryClientProvider>
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