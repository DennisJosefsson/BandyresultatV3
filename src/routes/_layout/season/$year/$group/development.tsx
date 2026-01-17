import { zd } from '@/lib/utils/zod'
import { createFileRoute, Navigate, notFound } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import DevelopmentData from '../-components/Development/DevelopmentData'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import { getDevData } from '../-functions/getDevData'

const searchParams = zd.object({ index: zd.int().catch(0) })

export const Route = createFileRoute(
  '/_layout/season/$year/$group/development',
)({
  validateSearch: zodValidator(searchParams),
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const data = await getDevData({
      data: { group: params.group, year: params.year, women: deps.women },
    })
    if (!data) throw new Error('Missing data')
    if (data.status === 404) {
      throw notFound({
        data: data.message,
        routeId: '/_layout/season/$year/$group/',
      })
    }

    return data
  },
  component: Routecomponent,
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

function Routecomponent() {
  const data = Route.useLoaderData()
  const index = Route.useSearch({ select: (s) => s.index })
  if (index >= data.dates.length) {
    return (
      <Navigate
        to="."
        params={(prev) => ({ ...prev })}
        search={(prev) => ({ ...prev, index: 0 })}
      />
    )
  }

  return <DevelopmentData />
}
