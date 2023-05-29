import Shops from '@/src/components/ShopsList'

/**
 * Página de investigación de tiendas.
 * 
 * @returns {JSX.Element} - Elemento JSX que representa la página de investigación de tiendas.
 */
export default function ShopsPage () {
  return (
    <main className='container mx-auto isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'> Shops Research </h1>
      <Shops />
    </main>
  )
}
