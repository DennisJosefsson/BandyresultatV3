import Loading from '@/components/Loading/Loading'
import { createFileRoute, notFound } from '@tanstack/react-router'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import StatsComponent from '../-components/Stats/Stats'
import { getPlayoffStats } from '../-functions/getPlayoffStats'

export const Route = createFileRoute('/_layout/season/$year/playoff/stats')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const data = await getPlayoffStats({
      data: { year: params.year, women: deps.women },
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
  const data = Route.useLoaderData()
  return <StatsComponent stats={data} />
}
