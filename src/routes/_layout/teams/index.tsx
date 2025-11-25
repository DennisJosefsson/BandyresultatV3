import Loading from '@/components/Loading/Loading'
import { createFileRoute } from '@tanstack/react-router'
import TeamsList from './-components/TeamsList/TeamsList'

export const Route = createFileRoute('/_layout/teams/')({
  component: Teams,
  pendingComponent: () => <Loading page="teamsList" />,
})

function Teams() {
  return <TeamsList />
}
