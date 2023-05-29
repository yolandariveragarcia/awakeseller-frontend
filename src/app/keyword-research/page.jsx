import KeywordList from '../../components/KeywordsList'

/**
 * Página de investigación de palabras clave.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la página de investigación de palabras clave.
 */
export default async function KeywordResearchPage () {
  return (
    <main className='container mx-auto isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'> Keyword Research </h1>
      <KeywordList />
    </main>
  )
}
