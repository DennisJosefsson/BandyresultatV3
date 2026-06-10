import { MessageCircleWarningIcon } from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/base/ui/card'

export const Route = createFileRoute('/_layout/unauthorized/')({
  loader: (context) => {
    return context.location.state.redirectCause
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const errorString = data ?? 'Måste vara inloggad för att se sidan.'

  return (
    <div className="mt-8 flex flex-row justify-center">
      <Card className="xs:w-80 w-60 sm:w-100">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold text-red-500 md:text-base">
              Aj då!
            </CardTitle>
            <MessageCircleWarningIcon className="animate-pulse text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <span className="mt-2 text-sm md:text-base">{errorString}</span>
        </CardContent>
      </Card>
    </div>
  )
}
