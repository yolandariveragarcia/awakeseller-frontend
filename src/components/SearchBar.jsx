import { useState } from 'react'

export default function SearchBar ({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-4'>
          <input
            className='col-span-3 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            onChange={(event) => setSearchQuery(event.target.value)}
            type='search'
            name='search'
            value={searchQuery}
            placeholder='Haz una búsqueda'
          />
          <button type='submit' className='col-span-1 rounded-sm p-1 bg-indigo-700 text-white'>
            Buscar
          </button>
        </div>
      </form>
    </div>
  )
}
