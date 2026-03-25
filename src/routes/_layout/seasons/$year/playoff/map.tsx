import {
  createFileRoute,
  notFound,
} from '@tanstack/react-router'

import Loading from '@/components/Loading/Loading'

import PlayoffMap from '../-components/Maps/PlayoffMap'
import { getTeamsForPlayoffMap } from '../-functions/getTeamForPlayoffMap'

export const Route = createFileRoute(
  '/_layout/seasons/$year/playoff/map',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const data = await getTeamsForPlayoffMap({
      data: { year: params.year, women: deps.women },
    })
    if (!data) throw new Error('Missing data')
    if (data.status === 404) {
      throw notFound({ data: data.message })
    }
    return data
  },
  staticData: { breadcrumb: 'Karta' },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ?? 'Bandyresultat - Karta',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Karta',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Karta',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ?? 'Bandyresultat - Karta',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
          'https://www.bandyresultat.se',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: PlayoffMap,
  pendingComponent: () => <Loading page="seasonStats" />,
  notFoundComponent(props) {
    if (props.data && typeof props.data === 'string') {
      return (
        <div className="mt-4 flex flex-col justify-center text-sm">
          <div className="mb-4 flex flex-row justify-center">
            <p>{props.data}</p>
          </div>
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
