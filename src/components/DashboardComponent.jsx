'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import Link from 'next/link'

/**
 * Componente que muestra el panel de control del dashboard.
 * 
 * @returns {JSX.Element} - Elemento JSX que representa el panel de control del dashboard.
 */
export const DashboardComponents = () => {
  const { data: session, status } = useSession()

  const [transactions, setTransactions] = useState([])
  const [totalSum, setTotalSum] = useState(0)

  useEffect(() => {
       
    const fetchTransactions = async () => {
      if (session && session.accessToken) {

        const url = `http://localhost:8080/transactions`
        const options = {
          method: 'GET',
          mode: 'cors',
          headers: {
            'access-control-allow-origin': '*',
            Authorization: `Bearer ${session.accessToken}`
          }
        }

        const urlTransactions = await fetch(url, options)
        const transactions = await urlTransactions.json()
        setTransactions(transactions)

      }
    }

    fetchTransactions()
  }, [session])

  useEffect(() => {
    const totalSum = transactions.reduce((tot, row) => tot + row.price, 0)
    setTotalSum(totalSum)
  }, [session])


  return (
    <section>
      <div className='pt-6 px-4'>
        <div className='w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
          <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex-shrink-0'>
                <span className='text-2xl sm:text-3xl leading-none font-bold text-gray-900'>
                  {totalSum} €
                </span>
                <h3 className='text-base font-normal text-gray-500'>
                  Ventas totales
                </h3>
              </div>
            </div>
          </div>
          <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
            <div className='mb-4 flex items-center justify-between'>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  Últimas transacciones
                </h3>
                <span className='text-base font-normal text-gray-500'>
                 Este es un listado de las últimas transacciones
                </span>
              </div>
              <div className='flex-shrink-0'>
                <Link
                  href='/transacciones'
                  className='text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2'
                >
                  Ver todo
                </Link>
              </div>
            </div>
            <div className='flex flex-col mt-8'>
              <div className='overflow-x-auto rounded-lg'>
                <div className='align-middle inline-block min-w-full'>
                  <div className='shadow overflow-hidden sm:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Transacciones
                          </th>
                          <th
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Importe
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                          {transactions && transactions.length > 0 ? (
                            transactions.map((transaction, index) => (
                              <tr key={transaction.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                  {transaction.price >= 0 ? 'Pago ' : 'Devolución '}
                                </td>
                                <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                  {transaction.price + ' ' + transaction.currency}
                                </td>
                              </tr>
                            )).slice(0, 10)
                          ) : (
                            <tr>
                              <td colSpan="3">No hay transacciones disponibles.</td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default DashboardComponents
