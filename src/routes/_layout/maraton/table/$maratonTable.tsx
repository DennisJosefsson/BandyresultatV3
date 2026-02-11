import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'
import MaratonTable from '../-components/Maraton/MaratonTables'
import { getMaratonTables } from '../-functions/getMaratonTable'

export const Route = createFileRoute('/_layout/maraton/table/$maratonTable')({
  params: {
    parse: (params) => ({
      maratonTable: zd
        .enum(['all', 'away', 'home'])
        .catch('all')
        .parse(params.maratonTable),
    }),
    stringify: ({ maratonTable }) => ({ maratonTable: `${maratonTable}` }),
  },
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const data = await getMaratonTables({
      data: { women: deps.women, table: params.maratonTable },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  staticData: {
    breadcrumb: (match) => match.loaderData.breadCrumb,
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.meta.title,
      },
      {
        name: 'description',
        content: 'Information om maratontabeller.',
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
  component: MaratonTable,
})
