import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import {
  Outlet,
  createFileRoute,
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
  return (
    <CustomCatchBoundary id="records">
      <div className="xs:p-2 p-1 sm:p-3 @container/records">
        <Outlet />
      </div>
    </CustomCatchBoundary>
  )
}
