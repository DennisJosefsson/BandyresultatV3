import {
  createFileRoute,
  notFound,
  Outlet,
  useChildMatches,
} from '@tanstack/react-router'
import { validateGroup } from '../-functions/validateGroup'

export const Route = createFileRoute('/_layout/season/$year/$group/')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params: { year, group }, deps: { women } }) => {
    const result = await validateGroup({ data: { year, group, women } })
    if (result.status === 404) throw notFound({ data: 'Serien finns inte.' })
    return result
  },
  component: RouteComponent,
  notFoundComponent(props) {
    if (props.data && typeof props.data === 'string') {
      return (
        <div className="mt-4 flex flex-row justify-center">
          <p>{props.data}</p>
        </div>
      )
    }
    return (
      <div className="mt-4 flex flex-row justify-center">
        <p>Något gick tyvärr fel.</p>
      </div>
    )
  },
})

function RouteComponent() {
  const matches = useChildMatches()

  if (matches.length === 0) {
    return (
      <div className="mt-4 flex flex-row justify-center">
        <p>Välj någon av alternativen i menyn.</p>
      </div>
    )
  }
  return <Outlet />
}
