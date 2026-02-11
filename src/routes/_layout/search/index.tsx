import Loading from '@/components/Loading/Loading'
import { createFileRoute } from '@tanstack/react-router'
import Search from './-components/Search'

export const Route = createFileRoute('/_layout/search/')({
  staticData: { breadcrumb: 'Sök' },
  component: Search,
  pendingComponent: () => <Loading page="search" />,
})
