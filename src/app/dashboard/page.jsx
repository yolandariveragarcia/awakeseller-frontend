import DashboardComponent from '@/src/components/DashboardComponent'

export default function Dashboard () {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      </div>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <DashboardComponent />
      </div>
    </main>
  )
}
