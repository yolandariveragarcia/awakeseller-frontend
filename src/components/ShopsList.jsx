/**
 * Componente para listar tiendas.
 * Este componente muestra una lista de tiendas y permite buscar y paginar los resultados.
 */
'use client'
import React,{ useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import SearchBar from '@/src/components/SearchBar'
import { Pagination } from './Pagination'

/**
 * Componente ShopsList
 */
export const ShopsList = () => {

  const {data: session, status} = useSession()

  const [shops, setShops] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const totalResults = searchResults.length

  const [resultsPerPage, setResultsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)

  const lastIndex = currentPage * resultsPerPage
  const firstIndex = lastIndex - resultsPerPage

  useEffect(() => {

    const fetchShops = async () => {
    
      if (session && session.accessToken) {
  
        try {
          const res = await fetch(`http://localhost:8080/shops?name=${searchQuery}`,{
            method: 'GET',
            mode: 'cors',
            headers: {
              'access-control-allow-origin': '*',
              Authorization: `Bearer ${session.accessToken}`
            }
          })

           if (res.ok) {
            const shops = await res.json()
            console.log(res)
            setShops(shops)
            setSearchResults(shops)

          } else {
            console.log('Error al obtener los datos de la API')
          }
        } catch (error) {
          console.log('Error en la llamada a la API:', error)
      }
    }
  }
  
    fetchShops()
  }, [session, searchQuery])

  /**
   * Filtra las tiendas según la búsqueda.
   * @param {string} query - Consulta
   */
  const filterShops = (query) => {
    const filteredShops = shops.filter((shop) =>
      shop.shopName.toLowerCase().includes(query.toLowerCase())
    )
    setSearchQuery(query);
    setSearchResults(filteredShops)
  }

  return (
    <section className='container px-4 mx-auto'>
      <div className='flex flex-col mt-6'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
      <SearchBar onSearch={filterShops} />
      {searchQuery && searchResults.length > 0
        ? (
            <div className='mt-6 container grid grid-cols-1 mx-auto overflow-hidden border border-gray-200 md:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'> Tienda </th>
                      <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'> Nº de Ventas Totales </th>
                      <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'> Nº de Likes </th>
                      <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'> Nº de Reseñas </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {searchResults.map((shop) => (
                      <tr key={shop.id} className='md:mx-auto divide-y divide-gray-100 px-4 py-6'>
                        <td> {shop.shopName} </td>
                        <td> {shop.transactionSoldCount} </td>
                        <td> {shop.numFavorers} </td>
                        <td> {shop.reviewCount} </td>
                      </tr>
                    )).slice(firstIndex, lastIndex)}
                  </tbody>
                </table>
              </div>
            )
            : null}
            </div>
          </div>
      {searchResults.length === 0 && <p>No se encontraron resultados</p>}
      <div className='container grid grid-cols-1 mx-auto'>
          <Pagination
            resultsPerPage={resultsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalResults={totalResults} />
      </div>
    </section>
  )
}
export default ShopsList
