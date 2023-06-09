/**
 * Componente para listar las transacciones de la tienda del usuario.
 * Este componente muestra una lista de transacciones y permite paginar los resultados.
 */
'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Pagination } from './Pagination'


/**
 * Componente TransactionList.
 */
export const TransactionList = () => {

  const transactions = [{
    title: 'Producto 1',
    description: 'Producto número 1',
    price: 7.90,
    currency: '€'
  }] 


  const {data:session} = useSession()

  // const [transactions, setTransactions] = useState([])

  const totalResults = transactions.length

  const [resultsPerPage, setResultsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)

  const lastIndex = currentPage * resultsPerPage
  const firstIndex = lastIndex - resultsPerPage

  /*
  useEffect(() => {
    const TRANSACTIONS_BACKEND_ENDPOINT = `http://localhost:8080/transactions`
    const fetchTransaction = async () => {
    if (session && session.accessToken) {
      
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'access-control-allow-origin': '*',
        Authorization: `Bearer ${session.accessToken}`
    }}
    const data = await fetch(TRANSACTIONS_BACKEND_ENDPOINT, options)
    const transactions = await data.json()
    console.log(transactions)
    setTransactions(transactions)
  }}

    fetchTransaction()
  }, [])

  */

  return (
    <section className='container px-4 mx-auto'>
      <div className='flex flex-col mt-6'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='container grid grid-cols-1 mx-auto overflow-hidden border border-gray-200 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'>Producto</th>
                  <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'>Descripción</th>
                  <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'>Importe</th>
                  <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'>Moneda</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {transactions.map(transaction => (
                  <tr key={transaction.id} className='md:mx-auto divide-y divide-gray-100 px-4 py-6'>
                    <td>
                      <h3 className='max-w-lg mt-6 text-sm font-semibold px-4 leading-6 text-gray-700'>{transaction.title}</h3>
                    </td>
                    <td>
                      <p className='max-w-lg mt-6 text-gray-500 px-4'>{transaction.description}</p>
                    </td>
                    <td>
                      <h3 className='max-w-lg mt-6 text-sm font-semibold px-4 leading-6 text-gray-700'>{transaction.price}</h3>
                    </td>
                    <td>
                      <h3 className='max-w-lg mt-6 text-sm font-semibold px-4 leading-6 text-gray-700'>{transaction.currency}</h3>
                    </td>
                  </tr>
                )).slice(firstIndex, lastIndex)}
              </tbody>
            </table>
          </div>
          <div className='container grid grid-cols-1 mx-auto'>
            <Pagination
              resultsPerPage={resultsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalResults={totalResults}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
export default TransactionList

