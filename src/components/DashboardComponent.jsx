'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import Image from 'next/image'
import Link from 'next/link'

export const DashboardComponents = () => {
  const {data: session, status} = useSession()

  const [transactions, setTransactions] = useState([])
  const [totalSum, setTotalSum] = useState(0)

  const url = {
    transactions: '',
  }

  const fetchTransactions = async () => {
    console.log('Entrando na movida '+JSON.stringify(session))

    if (session && session.accessToken) {
      console.log(session.accessToken)
   
        const options = {
          method: 'GET',
          mode: 'cors',
          headers: {
            'access-control-allow-origin': '*',
            Authorization: `Bearer ${session.accessToken}`
          }
        }
  
        const urlTransactions = await fetch(url.transactions,options)
        const transactions = await urlTransactions.json()
        setTransactions(transactions)
        console.log(transactions)
      }
  }

  useEffect(() => {
    fetchTransactions()
  }, [session])


  const total = transactions.reduce((tot, row) => tot + row.price, 0)

  useEffect(() => {
    setTotalSum(total)
  }, [total])

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
                  Ventas de esta semana
                </h3>
              </div>
              <div className='flex items-center justify-end flex-1 text-green-500 text-base font-bold'>
                12.5%
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  >
                    {' '}
                  </path>
                </svg>
              </div>
            </div>
            <div id='main-chart'> </div>
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
                  href='/'
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
                            Fecha
                          </th>
                          <th
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Importe
                          </th>
                        </tr>
                      </thead>
                      {transactions.map((transaction, index) => (
                        <tbody key={transaction.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <tr className='bg-gray-50'>
                            <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                              {transaction.amount >= 0 ? 'Pagos de ' : 'Devolución de '}
                              <span className='font-semibold'>{transaction.customer}</span>
                            </td>
                            <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-500'>
                              {transaction.date}
                            </td>
                            <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                              {transaction.price+' '+transaction.currency}
                            </td>
                          </tr>
                        </tbody>
                      )).slice(0,10)}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <span className='text-2xl sm:text-3xl leading-none font-bold text-gray-900'>
                  2,340
                </span>
                <h3 className='text-base font-normal text-gray-500'>
                  New products this week
                </h3>
              </div>
              <div className='ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold'>
                14.6%
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  >
                    {' '}
                  </path>
                </svg>
              </div>
            </div>
          </div>
          <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <span className='text-2xl sm:text-3xl leading-none font-bold text-gray-900'>
                  5,355
                </span>
                <h3 className='text-base font-normal text-gray-500'>
                  Visitors this week
                </h3>
              </div>
              <div className='ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold'>
                32.9%
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <span className='text-2xl sm:text-3xl leading-none font-bold text-gray-900'>
                  385
                </span>
                <h3 className='text-base font-normal text-gray-500'>
                  User signups this week
                </h3>
              </div>
              <div className='ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold'>
                -2.7%
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4'>
          <div className='bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-bold leading-none text-gray-900'>
                Últimos clientes
              </h3>
              <Link
                href='/'
                className='text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2'
              >
                Ver todo
              </Link>
            </div>
            <div className='flow-root'>
              <ul role='application' className='divide-y divide-gray-200'>
                <li className='py-3 sm:py-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <Image
                        className='h-8 w-8 rounded-full'
                        src=''
                        alt='Neil image'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        Neil Sims
                      </p>
                      <p className='text-sm text-gray-500 truncate'>
                        <Link
                          href='/cdn-cgi/l/email-protection'
                          className='__cf_email__'
                          data-cfemail='17727a767e7b57607e7973646372653974787a'
                        >
                          [email&#160;protected]
                        </Link>
                      </p>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-gray-900'>
                      $320
                    </div>
                  </div>
                </li>
                <li className='py-3 sm:py-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <Image
                        className='h-8 w-8 rounded-full'
                        src=''
                        alt='Neil image'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        Bonnie Green
                      </p>
                      <p className='text-sm text-gray-500 truncate'>
                        <Link
                          href='/cdn-cgi/l/email-protection'
                          className='__cf_email__'
                          data-cfemail='d4b1b9b5bdb894a3bdbab0a7a0b1a6fab7bbb9'
                        >
                          [email&#160;protected]
                        </Link>
                      </p>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-gray-900'>
                      $3467
                    </div>
                  </div>
                </li>
                <li className='py-3 sm:py-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        Michael Gough
                      </p>
                      <p className='text-sm text-gray-500 truncate'>
                        <Link
                          href='/cdn-cgi/l/email-protection'
                          className='__cf_email__'
                          data-cfemail='"57323a363e3b17203e3933242332257934383a'
                        >
                          [email&#160;protected]
                        </Link>
                      </p>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-gray-900'>
                      $67
                    </div>
                  </div>
                </li>
                <li className='py-3 sm:py-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        Thomes Lean
                      </p>
                      <p className='text-sm text-gray-500 truncate'>
                        <Link
                          href='/cdn-cgi/l/email-protection'
                          className='__cf_email__'
                          data-cfemail='284d45494144685f41464c5b5c4d5a064b4745'
                        >
                          [email&#160;protected]
                        </Link>
                      </p>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-gray-900'>
                      $2367
                    </div>
                  </div>
                </li>
                <li className='pt-3 sm:pt-4 pb-0'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        Lana Byrd
                      </p>
                      <p className='text-sm text-gray-500 truncate'>
                        <Link
                          href='/cdn-cgi/l/email-protection'
                          className='-left-8__cf_email__'
                          data-cfemail='a2c7cfc3cbcee2d5cbccc6d1d6c7d08cc1cdcf'
                        >
                          [email&#160;protected]
                        </Link>
                      </p>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-gray-900'>
                      $367
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default DashboardComponents
