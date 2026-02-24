import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { CatchBoundary, createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/table')({
  staticData: { breadcrumb: 'Maratontabeller' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Maratontabeller',
      },
      {
        name: 'description',
        content: 'Maratontabeller för Elitserien i bandy, damer och herrar.',
      },
      {
        property: 'og:description',
        content: 'Maratontabeller för Elitserien i bandy, damer och herrar.',
      },
      {
        property: 'og:title',
        content: 'Bandyresultat - Maratontabeller',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://www.bandyresultat.se/maraton/',
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
        <SimpleErrorComponent id="maratontable" error={error} reset={reset} />
      )}
    >
      <Outlet />
    </CatchBoundary>
  )
}
