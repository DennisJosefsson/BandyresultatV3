import { createFileRoute } from '@tanstack/react-router'
import MaratonHelp from '../-components/Help/MaratonHelp'

export const Route = createFileRoute('/_layout/maraton/help/')({
  staticData: { breadcrumb: 'Hjälp' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Maratontabeller - Hjälp',
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
        content: 'Bandyresultat - Maratontabeller - Hjälp',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://www.bandyresultat.se/maraton/help',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: MaratonHelp,
})
