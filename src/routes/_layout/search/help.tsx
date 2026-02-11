import { createFileRoute } from '@tanstack/react-router'
import SearchHelp from './-components/SearchHelp'

export const Route = createFileRoute('/_layout/search/help')({
  staticData: { breadcrumb: 'Sök - hjälp' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Sökhjälp',
      },
      {
        name: 'description',
        content: 'Information om söktjänsten bandyresultat.se',
      },
      {
        property: 'og:title',
        content: 'Bandyresultat - Sök - Hjälp',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://www.bandyresultat.se/search/help',
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
