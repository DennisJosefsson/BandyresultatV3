import { createFileRoute } from '@tanstack/react-router'

import Loading from '@/components/Loading/Loading'

import Team from './-components/Team'

export const Route = createFileRoute('/_layout/teams/$teamId/')({
  component: Team,
  pendingComponent: () => <Loading page="default" />,
})
