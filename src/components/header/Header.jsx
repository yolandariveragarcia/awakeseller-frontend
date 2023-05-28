import HeaderLogin from './HeaderLogin'
import HeaderSignOut from './HeaderSignOut'
import { useSession } from 'next-auth/react'

export default function HeaderComponent () {
  const { data: session, status, token } = useSession()
  
   if (!session) {
      return (
        <HeaderLogin />
      )
   }
return (
    <header className='h-150'>
      <HeaderSignOut />
    </header>
    )
}

