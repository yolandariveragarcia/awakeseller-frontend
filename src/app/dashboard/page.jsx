import DashboardComponent from '@/src/components/DashboardComponent'

/**
 * Página del panel de control.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la página del panel de control.
 */
export default function Dashboard () {
  return (
    <main className='container mx-auto isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Dashboard</h1>
      </div>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <DashboardComponent />
      </div>
    </main>
  )
}
