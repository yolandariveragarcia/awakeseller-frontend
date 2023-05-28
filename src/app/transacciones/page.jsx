import { TransactionList } from '@/src/components/TransactionList'

export default function Page () {
  return (
    <main className='container mx-auto isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Transacciones</h1>
      <TransactionList />
    </main>
  )
}
