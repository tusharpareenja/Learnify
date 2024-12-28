'use client'

import Header from '@/app/components/Header'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <Header />
        {children}
      
    </SessionProvider>
  )
}
