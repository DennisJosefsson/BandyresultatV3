import { createFileRoute } from '@tanstack/react-router'
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
    breadcrumb: (match) => match.loaderData.breadCrumb,
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.meta.title,
      },
      {
        name: 'description',
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
  component: Conceded,
})
