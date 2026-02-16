import { zd } from '@/lib/utils/zod'
import { createFileRoute, Navigate, notFound } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import RangeData from '../-components/Interval/RangeData'
import { getDevData } from '../-functions/getDevData'

const searchParams = zd.object({
  start: zd.int().nonnegative().catch(0),
  end: zd.int().nonnegative().optional(),
})

export const Route = createFileRoute('/_layout/seasons/$year/$group/interval')({
  validateSearch: zodValidator(searchParams),
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const data = await getDevData({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
        origin: 'interval',
      },
    })
    if (!data) throw new Error('Missing data')
    if (data.status === 404) {
      throw notFound({
        data: data.message,
        routeId: '/_layout/seasons/$year/$group/',
      })
    }

    return data
  },
  component: RouteComponent,
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
  staticData: { breadcrumb: (match) => match.loaderData.breadCrumb },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.meta.title,
      },
      {
        property: 'og:description',
        content: loaderData?.meta.description,
      },
      {
        property: 'og:title',
        content: loaderData?.meta.title,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: loaderData?.meta.url,
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const start = Route.useSearch({ select: (s) => s.start })
  const end = Route.useSearch({ select: (s) => s.end })

  if (
    (end && end >= data.dates.length) ||
    start >= data.dates.length ||
    (end && start >= end)
  ) {
    return (
      <Navigate
        to="."
        params={(prev) => ({ ...prev })}
        search={(prev) => ({ ...prev, start: 0, end: data.dates.length - 1 })}
      />
    )
  }

  return <RangeData />
}
