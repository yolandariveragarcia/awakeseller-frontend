'use client'
import '@/src/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/header/Header'

/**
 * Diseño raíz de la aplicación.
 *
 * @param {ReactNode} children - Los elementos secundarios que se renderizarán dentro del diseño raíz.
 * @returns {JSX.Element} - Elemento JSX que representa el diseño raíz de la aplicación.
 */
export default function RootLayout ({ children }) {
  return (
      <html lang='es'>
        <body className='relative'suppressHydrationWarning={true} >
          <SessionProvider>
            <Header />
            {children}
          </SessionProvider>
        </body>
      </html>
  )
}
