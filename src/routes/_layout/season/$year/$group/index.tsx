import {
  createFileRoute,
  Outlet,
  useChildMatches,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$year/$group/')({
  component: RouteComponent,
})

function RouteComponent() {
  const matches = useChildMatches()
  if (matches.length === 0) {
    return (
      <div>
        <p>Välj någon av alternativen i menyn.</p>
      </div>
    )
  }
  return <Outlet />
}
