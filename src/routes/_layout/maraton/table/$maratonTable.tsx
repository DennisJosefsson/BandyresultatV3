import {
  CatchBoundary,
  createFileRoute,
} from '@tanstack/react-router'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { zd } from '@/lib/utils/zod'

import MaratonTable from '../-components/Maraton/MaratonTables'
import { getMaratonTables } from '../-functions/getMaratonTable'

export const Route = createFileRoute(
  '/_layout/maraton/table/$maratonTable',
)({
  params: {
    parse: (params) => ({
      maratonTable: zd
        .enum(['all', 'away', 'home'])
        .catch('all')
        .parse(params.maratonTable),
    }),
    stringify: ({ maratonTable }) => ({
      maratonTable: `${maratonTable}`,
    }),
  },
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const data = await getMaratonTables({
      data: {
        women: deps.women,
        table: params.maratonTable,
      },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Maratontabell',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Maratontabell',
      },
      {
        name: 'description',
        content: 'Information om maratontabeller.',
      },
      {
        property: 'og:description',
        content: 'Information om maratontabeller.',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Maratontabell',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
          'https://www.bandyresultat.se/maraton/table/all',
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
          id="maratonTable"
          error={error}
          reset={reset}
        />
      )}
    >
      <MaratonTable />
    </CatchBoundary>
  )
}
