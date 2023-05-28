'use client'
import '@/src/styles/globals.css'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import Hero from '../components/Hero'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  return (
    <>
      <Hero/>
      <Contacto />
      <Footer/>
    </>
  )
}
