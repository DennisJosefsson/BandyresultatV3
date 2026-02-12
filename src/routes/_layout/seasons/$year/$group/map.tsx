import Loading from '@/components/Loading/Loading'
import { createFileRoute, notFound } from '@tanstack/react-router'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import GroupMap from '../-components/Maps/GroupMap'
import { getTeamsForGroupMap } from '../-functions/getTeamsForGroupMap'

export const Route = createFileRoute('/_layout/seasons/$year/$group/map')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    if (!params.group) throw notFound()
    const data = await getTeamsForGroupMap({
      data: { group: params.group, year: params.year, women: deps.women },
    })
    if (!data) throw new Error('Missing data')
    if (data.status === 404) {
      throw notFound({ data: data.message })
    }
    return data
  },
  component: RouteComponent,
  pendingComponent: () => <Loading page="seasonStats" />,
  notFoundComponent(props) {
    if (props.data && typeof props.data === 'string') {
      return (
        <div className="mt-4 flex flex-col justify-center text-sm">
          <div className="mb-4 flex flex-row justify-center">
            <p>{props.data}</p>
          </div>

          {props.data.includes('Välj en ny i listan') ? (
            <GroupListForErrorComponent />
          ) : null}
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
  return <GroupMap />
}
