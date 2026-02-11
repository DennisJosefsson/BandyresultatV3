import { createFileRoute } from '@tanstack/react-router'
import SearchHelp from './-components/SearchHelp'

export const Route = createFileRoute('/_layout/search/help')({
  staticData: { breadcrumb: 'Sök - hjälp' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Om sidan',
      },
      {
        name: 'description',
        content: 'Information om bandyresultat.se',
      },
      {
        property: 'og:title',
        content: 'Bandyresultat - Om sidan',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://www.bandyresultat.se/about',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: SearchHelp,
})
