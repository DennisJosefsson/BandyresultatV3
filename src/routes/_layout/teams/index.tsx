import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import { CatchBoundary, createFileRoute } from '@tanstack/react-router'
import TeamsList from './-components/TeamsList/TeamsList'

export const Route = createFileRoute('/_layout/teams/')({
  component: Teams,
  pendingComponent: () => <Loading page="teamsList" />,
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
