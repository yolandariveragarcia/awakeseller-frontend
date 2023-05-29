'use client'
import '@/src/styles/globals.css'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import Hero from '../components/Hero'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'


/**
 * Aplicación principal que muestra una página de inicio con un héroe, sección de contacto y pie de página.
 * Si el usuario está autenticado, redirige al dashboard.
 * 
 * @returns {JSX.Element} - Elemento JSX que representa la aplicación principal.
 */
export default function App() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard')
    }
  }, [status, session, router])

  return (
    <main>
      <Hero/>
      <Contacto />
      <Footer/>
    </main>
  )
}
