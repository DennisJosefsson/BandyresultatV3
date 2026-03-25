import {
  CatchBoundary,
  createFileRoute,
} from '@tanstack/react-router'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'

import Scored from '../-components/Records/PointsGoalsEtc/Scored'
import { getScoredRecords } from '../-functions/getScoredRecords'

export const Route = createFileRoute(
  '/_layout/maraton/records/scored',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getScoredRecords({
      data: { women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Gjorda mål',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Rekord: Gjorda mål',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Rekord: Gjorda mål',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Rekord: Gjorda mål',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Rekord: Gjorda mål',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
          'https://www.bandyresultat.se/maraton/records/scored',
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
          id="scored"
          error={error}
          reset={reset}
        />
      )}
    >
      <Scored />
    </CatchBoundary>
  )
}
