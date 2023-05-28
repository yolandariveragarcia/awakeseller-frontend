'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Pagination } from './Pagination'

export const KeywordsList = () => {
  const {data: session} = useSession()

  const [keywords, setKeywords] = useState([])

  const totalResults = keywords.length

  const [resultsPerPage, setResultsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)

  const lastIndex = currentPage * resultsPerPage
  const firstIndex = lastIndex - resultsPerPage

  const fetchKeywords = async () => {
    
    if (session && session.accessToken) {
      console.log(session.accessToken)
      
    const KEYWORDS_BACKEND_ENDPOINT = 'https://localhost:8080/products'
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'access-control-allow-origin': '*',
        Authorization: `Bearer ${session.accessToken}`
      }
    }

    const data = await fetch(KEYWORDS_BACKEND_ENDPOINT,options)
    const keywords = await data.json()
    console.log(keywords)

    setKeywords(keywords)
  }}

  useEffect(() => {
    fetchKeywords()
  }, [])

  return (
    <section className='container px-4 mx-auto'>
      <div>
        <table className='table-auto border-collapse border border-slate-40'>
          <thead>
            <tr>
              <th className='border border-slate-300'> Palabra Clave </th>
              <th className='border border-slate-300'> Categoría </th>
              <th className='border border-slate-300'> Tags relacionados </th>
            </tr>
          </thead>
          <tbody>
            {keywords.map(keyword => (
              <tr key={keyword.id}>
                <td className='border border-slate-300'> {keyword.title} </td>
                <td className='border border-slate-300'>  </td>
                <td className='border border-slate-300'> </td>
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
    </section>
  )
}
export default KeywordsList
