import {
  CatchBoundary,
  createFileRoute,
} from '@tanstack/react-router'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'

import Points from '../-components/Records/PointsGoalsEtc/Points'
import { getPointRecords } from '../-functions/getPointRecords'

export const Route = createFileRoute(
  '/_layout/maraton/records/points',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getPointRecords({
      data: { women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Poäng',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Rekord: Poäng',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Rekord: Poäng',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Rekord: Poäng',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Rekord: Poäng',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
          'https://www.bandyresultat.se/maraton/records/points',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent
          id="points"
          error={error}
          reset={reset}
        />
      )}
    >
      <Points />
    </CatchBoundary>
  )
}
