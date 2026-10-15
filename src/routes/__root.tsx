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
import { useEffect } from "react";

const queryClient = new QueryClient();


export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        title: 'Lavish Treats',
      },
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'description',
        content: 'Lavish Treats is a bakery that specializes in custom cakes and pastries.',
      },
      {
        name: 'theme-color',
        content: '#2A0E33',
      },
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
    links: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'manifest',
        href: '/manifest.webmanifest',
      },
      {
        rel: 'apple-touch-icon',
        href: '/icons/icon-192.png',
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
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Service worker registration failed", error);
      });
    }
  }, []);

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
    <html lang="en-GB">
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

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__:
    import('@tanstack/query-core').QueryClient
  }
}