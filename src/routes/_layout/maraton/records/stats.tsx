import {
  CatchBoundary,
  createFileRoute,
} from '@tanstack/react-router'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'

import GeneralStats from '../-components/Records/PointsGoalsEtc/GeneralStats'
import { getGeneralStats } from '../-functions/getGeneralStats'

export const Route = createFileRoute(
  '/_layout/maraton/records/stats',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getGeneralStats({
      data: { women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Statistik',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Rekord: Statistik',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Rekord: Statistik',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Rekord: Statistik',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Rekord: Statistik',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
          'https://www.bandyresultat.se/maraton/records/stats',
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
          id="generalStats"
          error={error}
          reset={reset}
        />
      )}
    >
      <GeneralStats />
    </CatchBoundary>
  )
}
