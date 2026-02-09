import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { sortOrder } from '@/lib/utils/constants'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/')

const Series = () => {
  const series = route.useLoaderData({ select: (s) => s.series })
  const seasonId = route.useParams({ select: (s) => s.seasonId })
  const women = route.useSearch({ select: (s) => s.women })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="xl:text-lg">Serier</CardTitle>
          <Button asChild>
            <route.Link
              to="info/newSerie"
              params={{ seasonId }}
              search={{ women }}
            >
              Lägg till serie
            </route.Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            {series
              .sort((a, b) => {
                if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
                  return 1
                } else if (
                  sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)
                ) {
                  return -1
                } else {
                  return 0
                }
              })
              .map((serie) => {
                if (!serie.serieId) return null
                return (
                  <div
                    key={serie.serieId}
                    className="mb-1 flex flex-row justify-between"
                  >
                    <div className="xl:text-lg">{serie.serieName}</div>
                    <div className="flex flex-row gap-1">
                      <Button size="sm" variant="outline" asChild>
                        <route.Link
                          to="/dashboard/season/$seasonId/info/$serieId/edit/games"
                          params={{
                            seasonId: seasonId,
                            serieId: serie.serieId,
                          }}
                          search={{ women }}
                        >
                          Matcher
                        </route.Link>
                      </Button>

                      <Button asChild size="sm" variant="outline">
                        <route.Link
                          to="/dashboard/season/$seasonId/info/$serieId/edit"
                          params={{
                            seasonId: seasonId,
                            serieId: serie.serieId,
                          }}
                          search={{ women }}
                        >
                          Ändra
                        </route.Link>
                      </Button>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Series
