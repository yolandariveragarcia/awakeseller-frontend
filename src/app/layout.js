'use client'
import '@/src/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Header from '@/src/components/header/Header'

export default function RootLayout ({ children }) {
  return (
    <SessionProvider>
      <html lang='es'>
        <body className='relative'>
            <Header />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
