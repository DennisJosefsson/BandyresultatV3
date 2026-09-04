import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import {
  Navigate,
  Outlet,
  createFileRoute,
  useChildMatches,
} from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/maraton/records',
)({
  beforeLoad: () => {
    return { sidebarSection: 'maraton' }
  },
  staticData: { breadcrumb: 'Rekord' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Rekord',
      },
      {
        name: 'description',
        content:
          'Rekord för Elitserien i bandy, damer och herrar.',
      },
      {
        property: 'og:description',
        content:
          'Rekord för Elitserien i bandy, damer och herrar.',
      },
      {
        property: 'og:title',
        content: 'Bandyresultat - Rekord',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          'https://www.bandyresultat.se/maraton/records',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const matches = useChildMatches()
  if (matches.length === 0) {
    return (
      <Navigate
        from={Route.fullPath}
        to="/maraton/records/stats"
        search={(prev) => ({ ...prev })}
      />
    )
  }
  return (
    <CustomCatchBoundary id="records">
      <div className="xs:p-2 p-1 sm:p-3 @container/records">
        <Outlet />
      </div>
    </CustomCatchBoundary>
  )
}
