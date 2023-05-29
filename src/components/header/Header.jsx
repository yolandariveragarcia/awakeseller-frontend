import HeaderLogin from './HeaderLogin'
import HeaderSignOut from './HeaderSignOut'
import { useSession } from 'next-auth/react'

/**
 * Componente de encabezado que muestra diferentes componentes según el estado de la sesión.
 *
 * @returns {JSX.Element} - Elemento JSX que representa el componente de encabezado.
 */
export default function HeaderComponent () {
  const { data: session, status } = useSession()
  
  if (status === "authenticated") {
   return(<header className='h-150'>
            <HeaderSignOut />
          </header>)
  }
  return <HeaderLogin />
}

