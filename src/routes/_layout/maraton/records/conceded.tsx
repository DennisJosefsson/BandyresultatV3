import { CatchBoundary, createFileRoute } from '@tanstack/react-router'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'

import Conceded from '../-components/Records/PointsGoalsEtc/Conceded'
import { getConcededRecords } from '../-functions/getConcededRecords'

export const Route = createFileRoute('/_layout/maraton/records/conceded')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getConcededRecords({
      data: { women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  staticData: {
    breadcrumb: (match) => match.loaderData.breadCrumb ?? 'Insläppta mål',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.meta.title ?? 'Bandyresultat - Rekord: Insläppta mål',
      },
      {
        name: 'description',
        content: loaderData?.meta.description ?? 'Bandyresultat - Rekord: Insläppta mål',
      },
      {
        property: 'og:description',
        content: loaderData?.meta.description ?? 'Bandyresultat - Rekord: Insläppta mål',
      },
      {
        property: 'og:title',
        content: loaderData?.meta.title ?? 'Bandyresultat - Rekord: Insläppta mål',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: loaderData?.meta.url ?? 'https://www.bandyresultat.se/maraton/records/conceded',
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
        <SimpleErrorComponent id="conceded" error={error} reset={reset} />
      )}
    >
      <Conceded />
    </CatchBoundary>
  )
}
