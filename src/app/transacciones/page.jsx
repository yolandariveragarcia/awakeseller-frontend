import { TransactionList } from '@/src/components/TransactionList'

/**
 * Página que muestra una lista de transacciones.
 * 
 * @returns {JSX.Element} - Elemento JSX que representa la página de transacciones.
 */
export default function TransactionsPage () {
  return (
    <main className='container mx-auto isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>Transacciones</h1>
      <TransactionList />
    </main>
  )
}
