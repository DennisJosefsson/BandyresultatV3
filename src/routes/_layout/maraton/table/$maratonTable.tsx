import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { zd } from '@/lib/utils/zod'
import {
  CatchBoundary,
  createFileRoute,
} from '@tanstack/react-router'
import MaratonTable from '../-components/Maraton/MaratonTables'
import { getMaratonMeta } from '../-functions/getMaratonMeta'
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
    const maratonMeta = await getMaratonMeta({
      data: {
        women: deps.women,
        table: params.maratonTable,
      },
    })
    const data = getMaratonTables({
      data: {
        women: deps.women,
        table: params.maratonTable,
      },
    })
    if (!data) throw new Error('Missing data')

    return { maratonMeta, data }
  },
  staticData: {
    breadcrumb: (match) => {
      return match.loaderData.breadCrumb ?? 'Maratontabell'
    },
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.maratonMeta?.meta.title ??
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
          loaderData?.maratonMeta?.meta.title ??
          'Bandyresultat - Maratontabell',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.maratonMeta?.meta.url ??
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
