export const Pagination = ({ resultsPerPage, totalResults, currentPage, setCurrentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    pageNumbers.push(i)
  }

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const onNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const onSpecificPage = (n) => {
    setCurrentPage(n)
  }

  return (
    <nav className='flex items-center justify-between mt-6'>
      <a className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 border rounded-md gap-x-2 hover:bg-blue-100/60 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${currentPage === 1 ? 'bg-gray-100' : ''} `} onClick={onPreviousPage}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5 rtl:-scale-x-100'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
        </svg>
        <span>
          Anterior
        </span>
      </a>
      <ul className='items-center hidden md:flex gap-x-3'>
        {pageNumbers.map(noPage => (
          <li key={noPage}>
            <a
              className={`px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-blue-100/60 ${noPage === currentPage ? 'bg-blue-100' : ''}`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </a>
          </li>
        ))}
      </ul>
      <a className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 border rounded-md gap-x-2 hover:bg-blue-100/60 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${currentPage >= pageNumbers.length ? 'bg-gray-100' : ''} `} onClick={onNextPage}>
        <span>
          Siguiente
        </span>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5 rtl:-scale-x-100'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
        </svg>
      </a>
    </nav>
  )
}

export default Pagination
