import changelog from '@/assets/markdown/changelog.md'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'

export const Route = createFileRoute('/_layout/about/changelog')({
  staticData: { breadcrumb: 'Changelog' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Changelog',
      },
      {
        property: 'og:description',
        content: 'Nyheter på bandyresultat.se',
      },
      {
        property: 'og:title',
        content: 'Bandyresultat - Changelog',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://www.bandyresultat.se/about/changelog',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: Changelog,
})

function Changelog() {
  return (
    <div className="text-foreground w-full p-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Nyheter</CardTitle>
        </CardHeader>
        <CardContent>
          <article className="prose prose-xs sm:prose-sm md:prose-base text-foreground dark:prose-invert">
            <Markdown>{changelog}</Markdown>
          </article>
        </CardContent>
      </Card>
    </div>
  )
}
