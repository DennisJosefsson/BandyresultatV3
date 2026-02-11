import Loading from '@/components/Loading/Loading'
import { createFileRoute } from '@tanstack/react-router'
import Search from './-components/Search'

export const Route = createFileRoute('/_layout/search/')({
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Sök',
      },
      {
        name: 'description',
        content: 'Sök resultat från bandymatcher.',
      },
      {
        property: 'og:title',
        content: 'Bandyresultat - Sök',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://www.bandyresultat.se/search',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: Search,
  pendingComponent: () => <Loading page="search" />,
})
