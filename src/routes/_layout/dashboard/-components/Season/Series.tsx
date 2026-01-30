import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { sortOrder } from '@/lib/utils/constants'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/')

const Series = () => {
  const series = route.useLoaderData({ select: (s) => s.series })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="xl:text-lg">Serier</CardTitle>
          <Button
          // onClick={() => {
          //   navigate({
          //     to: '/dashboard/season/$seasonId/newseries',
          //     params: { seasonId: seasonId },
          //     search: { women: women },
          //   })
          // }}
          // size="sm"
          >
            Lägg till serie
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
                      {/* <Link
                        to="/dashboard/season/$seasonId/games/$serieId"
                        search={{ women: women }}
                        params={{
                          seasonId: seasonId,
                          serieId: serie.serieId,
                        }}
                      > */}
                      <Button size="sm" variant="outline">
                        Matcher
                      </Button>
                      {/* </Link>
                      <Link
                        to="/dashboard/season/$seasonId/info/$serieId"
                        search={{ women: women }}
                        params={{
                          seasonId: seasonId,
                          serieId: serie.serieId,
                        }}
                      > */}
                      <Button size="sm" variant="outline">
                        Info
                      </Button>
                      {/* </Link> */}
                      <Button
                        // onClick={() => {
                        //   navigate({
                        //     to: '/dashboard/season/$seasonId/games/$serieId/edit',
                        //     params: {
                        //       seasonId: seasonId,
                        //       serieId: serie.serieId,
                        //     },
                        //     search: { women: women },
                        //   })
                        // }}
                        size="sm"
                        variant="outline"
                      >
                        Ändra
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
