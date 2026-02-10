import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/')

const PlayoffSeason = () => {
  const women = route.useSearch({ select: (search) => search.women })
  const seasonId = route.useParams({ select: (s) => s.seasonId })
  const playoffSeason = route.useLoaderData({
    select: (search) => search.playoffSeason,
  })
  if (!playoffSeason) return null
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="xl:text-lg">PlayoffSeason</CardTitle>
          <Button asChild size="sm">
            <route.Link
              to="/dashboard/season/$seasonId/playoffseason"
              params={{ seasonId }}
              search={{ women }}
            >
              Ändra PlayoffSeason
            </route.Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 text-sm xl:text-lg">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <div>hasQuarter:</div>{' '}
              <div>{playoffSeason.hasQuarter ? 'True' : 'False'}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>hasEight:</div>{' '}
              <div>{playoffSeason.hasEight ? 'True' : 'False'}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>playoffAsSeries:</div>{' '}
              <div>{playoffSeason.playoffAsSeries ? 'True' : 'False'}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>uefaSorting:</div>{' '}
              <div>{playoffSeason.uefaSorting ? 'True' : 'False'}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PlayoffSeason
