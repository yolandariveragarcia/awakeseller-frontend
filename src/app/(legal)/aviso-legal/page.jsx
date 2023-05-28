import '@/src/styles/globals.css'

export default function Legal () {
  return (
    <main>
      <div
        className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'
        aria-hidden='true'
      >
        <div
          className='relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8d80ff] to-[#fad4a2] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-6xl text-center'> Aviso Legal </h1>
        <h2 className='font-sans text-center'>LEY DE LOS SERVICIOS DE LA SOCIEDAD DE LA INFORMACIÓN (LSSI)</h2>
        <div>
          <h2 className='font-sans'>1. DATOS IDENTIFICATIVOS</h2>
          <p className='font-sans'>Nombre comercial: Awake Seller</p>
          <p className='font-sans'>email: info@awakeseller.com</p>
        </div>
        <div>
          <h2 className='font-sans'>2. OBJETO</h2>
        </div>
        <div>
          <h2 className='font-sans'>3. PRIVACIDAD Y TRATAMIENTO DE DATOS</h2>
          <p className='font-sans'>Nombre comercial: Awake Seller</p>
          <p className='font-sans'>email: info@awakeseller.com</p>
        </div>

        <h2 className='font-sans'>4. PROPIEDAD INDUSTRIAL E INTELECTUAL</h2>
        <h2 className='font-sans'>5. OBLIGACIONES Y RESPONSABILIDADES DEL USUARIO DEL ESPACIO WEB</h2>
        <h2 className='font-sans'>6. RESPONSABILIDADES</h2>
        <h2 className='font-sans'>7. HIPERVÍNCULOS</h2>
        <h2 className='font-sans'>8. PROTECCIÓN DE DATOS</h2>
        <h2 className='font-sans'>9. COOKIES</h2>
        <h2 className='font-sans'>10. DECLARACIONES Y GARANTÍAS</h2>
        <h2 className='font-sans'>11. FUERZA MAYOR</h2>
        <h2 className='font-sans'>12. RESOLUCIÓN DE CONTROVERSIAS. LEY APLICABLE Y JURISDICCIÓN</h2>
      </div>
    </main>
  )
}
