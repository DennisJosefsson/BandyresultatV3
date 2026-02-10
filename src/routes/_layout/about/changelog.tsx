import changelog from '@/assets/markdown/changelog.md'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'

export const Route = createFileRoute('/_layout/about/changelog')({
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
