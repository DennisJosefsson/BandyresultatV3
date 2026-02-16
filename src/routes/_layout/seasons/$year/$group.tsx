import {
  createFileRoute,
  Outlet,
  useChildMatches,
} from '@tanstack/react-router'
import { validateGroup } from './-functions/validateGroup'

export const Route = createFileRoute('/_layout/seasons/$year/$group')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params: { year, group }, deps: { women } }) => {
    const data = await validateGroup({ data: { year, group, women } })

    return data
  },
  staticData: { breadcrumb: (match) => match.loaderData.breadCrumb },
  component: RouteComponent,
})

function RouteComponent() {
  const childMatches = useChildMatches()
  if (childMatches.length === 0) return <div>Lite info</div>

  return <Outlet />
}
