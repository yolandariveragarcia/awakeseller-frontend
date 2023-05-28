import '@/src/styles/globals.css'

import KeywordList from '../../components/KeywordsList'

export default async function KeywordResearchPage () {
  return (
    <main className='container mx-auto isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <h1 className='text-4xl font-bold tracking-tight sm:text-6xl text-center'> Keyword Research </h1>

      <div className='container mx-auto'>
        <KeywordList />
      </div>

    </main>
  )
}
