import about from '@/assets/markdown/about.md'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import Markdown from 'react-markdown'

export const Route = createFileRoute('/_layout/about/')({
  staticData: { breadcrumb: 'Om sidan' },
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
        property: 'og:description',
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
  component: About,
})

function About() {
  return (
    <div className="text-foreground w-full p-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Om det här projektet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-xs md:text-base">
              OBS! Lista över förändringar på sidan finns{' '}
              <Link
                from="/about"
                to="/about/changelog"
                search={(prev) => ({ ...prev })}
                className="underline"
              >
                här
              </Link>
              .
            </p>

            <article className="prose prose-xs sm:prose-sm md:prose-base text-foreground dark:prose-invert">
              <Markdown>{about}</Markdown>
            </article>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
