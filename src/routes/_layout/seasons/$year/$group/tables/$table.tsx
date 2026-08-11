import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import { zd } from '@/lib/utils/zod'
import {
  createFileRoute,
  redirect,
} from '@tanstack/react-router'
import SeasonTables from '../../-components/SeasonTables'
import { getTableMeta } from '../../-functions/tables/getTableBreadcrumb'
import { getTables } from '../../-functions/tables/getTables'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group/tables/$table',
)({
  params: {
    parse: (params) => ({
      table: zd
        .enum(['all', 'away', 'home'])
        .catch('all')
        .parse(params.table),
    }),
    stringify: ({ table }) => ({ table: `${table}` }),
  },
  loaderDeps: ({ search: { women } }) => ({ women }),
  beforeLoad: ({ search, params }) => {
    if (
      search.women &&
      [1973, 1974].includes(params.year) &&
      params.table !== 'all'
    ) {
      throw redirect({
        to: '/seasons/$year/$group/tables/$table',
        params: {
          table: 'all',
          year: params.year,
          group: params.group,
        },
        search: { women: search.women },
      })
    }
  },
  loader: async ({ deps, params }) => {
    const tableMeta = await getTableMeta({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
        table: params.table,
      },
    })
    const data = getTables({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
        table: params.table,
      },
    })
    if (!data || !tableMeta) throw new Error('Missing data')

    return { data, tableMeta }
  },
  component: RouteComponent,

  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Tabell',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.tableMeta.meta.title ??
          'Bandyresultat - Tabell',
      },
      {
        name: 'description',
        content:
          loaderData?.tableMeta.meta.description ??
          'Bandyresultat - Tabell',
      },
      {
        property: 'og:description',
        content:
          loaderData?.tableMeta.meta.description ??
          'Bandyresultat - Tabell',
      },
      {
        property: 'og:title',
        content:
          loaderData?.tableMeta.meta.title ??
          'Bandyresultat - Tabell',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.tableMeta.meta.url ??
          'https://www.bandyresultat.se',
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
  return (
    <CustomCatchBoundary id="seasonTables">
      <SeasonTables />
    </CustomCatchBoundary>
  )
}
