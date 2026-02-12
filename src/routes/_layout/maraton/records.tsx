import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/records')({
  staticData: { breadcrumb: 'Rekord' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Rekord',
      },
      {
        name: 'description',
        content: 'Rekord för Elitserien i bandy, damer och herrar.',
      },
      {
        property: 'og:description',
        content: 'Rekord för Elitserien i bandy, damer och herrar.',
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
        content: 'https://www.bandyresultat.se/maraton/records',
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
    <div>
      <Outlet />
    </div>
  )
}
