import { createFileRoute } from '@tanstack/react-router'
import TeamsList from './-components/TeamsList'

export const Route = createFileRoute('/_layout/teams/')({
  component: Teams,
})

function Teams() {
  return <TeamsList />
}
