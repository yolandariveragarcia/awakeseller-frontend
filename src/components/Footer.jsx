import Link from 'next/link'

const links = [{
  label: 'Aviso Legal',
  route: '/aviso-legal'
}, {
  label: 'Política de Privacidad',
  route: '/politica-de-privacidad'
}, {
  label: 'Política de Cookies',
  route: '/politica-de-cookies'
}]

export default function Footer () {
  return (
    <footer className='flex bottom-0 w-full'>
      <p className='flex h-14 justify-left align-items-center m-auto'>© 2023 Awake Seller</p>
      <ul className='flex h-14 justify-center space-x-4 align-items-center m-auto'>
        {links.map(({ label, route }) => (
          <li key={route} className=' h-14 grow'>
            <Link href={route}>{label}</Link>
          </li>
        ))}
      </ul>

    </footer>
  )
}
