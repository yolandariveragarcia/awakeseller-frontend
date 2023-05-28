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

/**
 * Maneja la búsqueda de tiendas.
 */
  const handleSearch = async () => {
  
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
          setShops(shops)
        } else {
          console.log('Error al obtener los datos de la API')
        }
      } catch (error) {
        console.log('Error en la llamada a la API:', error)
      }
   }
  }

useEffect(() => {
    handleSearch();
  }, [session]);

  /**
   * Filtra las tiendas según la búsqueda.
   * @param {string} query - Consulta
   */
  const filterShops = (query) => {
    setSearchQuery(query)
  }

  const filteredShops = shops.filter((shop) =>
  shop.shopName && shop.shopName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    setSearchResults(filteredShops);
  }, [searchQuery, shops]);

  return (
    <section className='container px-4 mx-auto'>
      <SearchBar onSearch={filterShops} />
      {searchQuery && searchResults.length > 0
        ? (
          <div className='container grid grid-cols-1 mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg'>
            <table className='table-auto border-collapse border border-slate-40'>
              <thead>
                <tr>
                  <th className='border border-slate-300'> Tienda </th>
                  <th className='border border-slate-300'> Nº de Ventas Totales </th>
                  <th className='border border-slate-300'> Nº de Likes </th>
                  <th className='border border-slate-300'> Nº de Reseñas </th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((shop) => (
                  <tr key={shop.id} className='md:mx-auto divide-y divide-gray-100 px-4 py-6'>
                    <td className='border border-slate-300'> {shop.shopName} </td>
                    <td className='border border-slate-300'> {shop.shoptransactionSoldCount} </td>
                    <td className='border border-slate-300'> {shop.shopNumFavorers} </td>
                    <td className='border border-slate-300'> {shop.reviewCount} </td>
                  </tr>
                )).slice(firstIndex, lastIndex)}
              </tbody>
            </table>
          </div>
            )
            : null}
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
