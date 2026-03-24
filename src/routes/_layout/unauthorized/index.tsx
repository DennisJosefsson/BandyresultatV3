import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { MessageCircleWarningIcon } from 'lucide-react'

export const Route = createFileRoute(
  '/_layout/unauthorized/',
)({
  loader: (context) => {
    return context.location.state.redirectCause
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const errorString =
    data ?? 'Måste vara inloggad för att se sidan.'

  return (
    <div className="flex flex-row justify-center mt-8">
      <Card className="w-60 xs:w-80 sm:w-100">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle className="text-red-500 font-semibold text-sm md:text-base">
              Aj då!
            </CardTitle>
            <MessageCircleWarningIcon className="text-red-500 animate-pulse" />
          </div>
        </CardHeader>
        <CardContent>
          <span className="mt-2 text-sm md:text-base">
            {errorString}
          </span>
        </CardContent>
      </Card>
    </div>
  )
}
