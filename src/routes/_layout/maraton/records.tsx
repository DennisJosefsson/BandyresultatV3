import { CatchBoundary, Outlet, createFileRoute } from '@tanstack/react-router'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'

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
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent id="records" error={error} reset={reset} />
      )}
    >
      <Outlet />
    </CatchBoundary>
  )
}
