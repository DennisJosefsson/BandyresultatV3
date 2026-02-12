import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/seasons/$year/playoff')({
  staticData: { breadcrumb: 'Slutspel' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Slutspel',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="">
        <Tabs>
          <TabsList>
            <TabsTrigger value="table" asChild>
              <Link
                from="/seasons/$year/playoff"
                to="/seasons/$year/playoff/table"
                params={(prev) => ({ year: prev.year })}
                search={(prev) => ({ women: prev.women })}
                activeProps={{ 'data-state': 'active' }}
              >
                Slutspel
              </Link>
            </TabsTrigger>
            <TabsTrigger value="games" asChild>
              <Link
                from="/seasons/$year/playoff"
                to="/seasons/$year/playoff/games"
                params={(prev) => ({ year: prev.year })}
                search={(prev) => ({ women: prev.women })}
                activeProps={{ 'data-state': 'active' }}
              >
                Matcher
              </Link>
            </TabsTrigger>
            <TabsTrigger value="stats" asChild>
              <Link
                from="/seasons/$year/playoff"
                to="/seasons/$year/playoff/stats"
                params={(prev) => ({ year: prev.year })}
                search={(prev) => ({ women: prev.women })}
                activeProps={{ 'data-state': 'active' }}
              >
                Statistik
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}
