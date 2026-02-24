import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import { CatchBoundary, createFileRoute } from '@tanstack/react-router'
import TeamsList from './-components/TeamsList/TeamsList'

export const Route = createFileRoute('/_layout/teams/')({
  component: Teams,
  pendingComponent: () => <Loading page="teamsList" />,
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Laglista',
      },
      {
        name: 'description',
        content: 'Bandyresultat - Lista över svenska bandylag',
      },
      {
        property: 'og:description',
        content: 'Bandyresultat - Lista över svenska bandylag',
      },
      {
        property: 'og:title',
        content: 'Bandyresultat - Laglista',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://bandyresultat.se/teams',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
})

function Teams() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent id="teamslist" error={error} reset={reset} />
      )}
    >
      <TeamsList />
    </CatchBoundary>
  )
}
