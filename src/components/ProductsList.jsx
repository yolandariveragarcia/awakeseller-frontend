/**
 * Componente de lista de productos.
 * Este componente muestra una lista de productos y permite buscar y paginar los resultados.
 */
'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import SearchBar from '@/src/components/SearchBar'
import { Pagination } from './Pagination'

/**
 * Componente ProductList
 */
export const ProductList = () => {
  const {data: session} = useSession()

  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const totalResults = products.length

  const [resultsPerPage, setResultsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)

  const lastIndex = currentPage * resultsPerPage
  const firstIndex = lastIndex - resultsPerPage

  /**
   * Realiza una llamada a la API para obtener los productos.
   * Solo se realiza la llamada si hay una sesión activa y se ha proporcionado un token de acceso.
   */
  const fetchProduct = async () => {
    if (session && session.accessToken) {
      console.log(session.accessToken)

      const PRODUCTS_BACKEND_ENDPOINT = `http://localhost:8080/products/?name=${searchQuery}`

      const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
          'access-control-allow-origin': '*',
          Authorization: `Bearer ${session.accessToken}`
        }
      }

      try {
        const res = await fetch(PRODUCTS_BACKEND_ENDPOINT, options)
      if (res.ok) {
        const products = await res.json()
        console.log(products)

        setProducts(products)
        setSearchResults(products)
      } else {
        console.log('Error al obtener los datos de la API')
      }
    } catch (error) {
      console.log('Error en la llamada a la API:', error)
    }
  }}

  /**
   * Filtra los productos según la consulta de búsqueda.
   * @param {string} query - Consulta de búsqueda.
   */
  useEffect(() => {
    fetchProduct()
  }, [])

  const filterProducts = (query) => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    setSearchQuery(query)
    setSearchResults(filteredProducts)
  }

  return (
    <section className='container px-4 mx-auto'>
      <SearchBar onSearch={filterProducts} />
      {searchQuery && searchResults.length > 0
        ? (
          <div>
            <table className='table-auto border-collapse border border-slate-40'>
              <thead>
                <tr>
                  <th className='border border-slate-300'> Titulo del Producto </th>
                  <th className='border border-slate-300'> Descripción </th>
                  <th className='border border-slate-300'> Cantidad </th>
                  <th className='border border-slate-300'> Tienda </th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map(product => (
                  <tr key={product.id}>
                    <td className='border border-slate-300'> {product.title} </td>
                    <td className='border border-slate-300'> {product.description} </td>
                    <td className='border border-slate-300'> {product.quantity} </td>
                    <td className='border border-slate-300'> {product.shopName} </td>
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
          totalResults={totalResults}
        />
      </div>
    </section>
  )
}
export default ProductList

