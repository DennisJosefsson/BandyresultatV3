import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/')

const Metadata = () => {
  const women = route.useSearch({ select: (search) => search.women })
  const seasonId = route.useParams({ select: (s) => s.seasonId })
  const metadata = route.useLoaderData({ select: (search) => search.metadata })
  if (!metadata) return null
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="xl:text-lg">Metadata</CardTitle>
          <Button asChild size="sm">
            <route.Link
              to="/dashboard/season/$seasonId/metadata"
              params={{ seasonId }}
              search={{ women }}
            >
              Ändra metadata
            </route.Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 text-sm xl:text-lg">
          <div></div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <div>Finalstad:</div> <div>{metadata.hostCity}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>Finaldatum:</div> <div>{metadata.finalDate}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>SM-Guld:</div>
              <div> {metadata.winnerName}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>Kommentar:</div> <div>{metadata.comment}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Metadata
