import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/',
)

const Series = () => {
  const series = route.useLoaderData({
    select: (s) => s.series,
  })
  const seasonId = route.useParams({
    select: (s) => s.seasonId,
  })
  const women = route.useSearch({ select: (s) => s.women })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="xl:text-lg">
            Serier
          </CardTitle>
          <Button
            render={
              <route.Link
                to="info/competition/newCompetition"
                params={{ seasonId }}
                search={{ women }}
              >
                Lägg till turnering
              </route.Link>
            }
            nativeButton={false}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            {series.map((div) => {
              return (
                <div
                  key={div.competitionName}
                  className="mb-4 flex flex-col gap-2"
                >
                  <div className="mb-2 flex flex-row justify-between">
                    <span className="text-base font-semibold">
                      {div.competitionName}
                    </span>
                    <div className="flex flex-row gap-2">
                      <Button
                        render={
                          <route.Link
                            to="info/competition/$competitionId/edit"
                            params={{
                              seasonId,
                              competitionId:
                                div.competitionId,
                            }}
                            search={{ women }}
                          >
                            Ändra
                          </route.Link>
                        }
                        nativeButton={false}
                      />
                      {div.isCup ? (
                        <Button
                          render={
                            <route.Link
                              to="info/competition/$competitionId/generateCupSerie"
                              params={{
                                seasonId,
                                competitionId:
                                  div.competitionId,
                              }}
                              search={{ women }}
                            >
                              Generera serier
                            </route.Link>
                          }
                          nativeButton={false}
                        />
                      ) : (
                        <Button
                          render={
                            <route.Link
                              to="info/competition/$competitionId/generateSerie"
                              params={{
                                seasonId,
                                competitionId:
                                  div.competitionId,
                              }}
                              search={{ women }}
                            >
                              Generera serier
                            </route.Link>
                          }
                          nativeButton={false}
                        />
                      )}
                      {div.isCup ? (
                        <Button
                          render={
                            <route.Link
                              to="info/competition/$competitionId/newCupSerie"
                              params={{
                                seasonId,
                                competitionId:
                                  div.competitionId,
                              }}
                              search={{ women }}
                            >
                              Lägg till serie
                            </route.Link>
                          }
                          nativeButton={false}
                        />
                      ) : (
                        <Button
                          render={
                            <route.Link
                              to="info/competition/$competitionId/newSerie"
                              params={{
                                seasonId,
                                competitionId:
                                  div.competitionId,
                              }}
                              search={{ women }}
                            >
                              Lägg till serie
                            </route.Link>
                          }
                          nativeButton={false}
                        />
                      )}
                    </div>
                  </div>
                  {div.series.map((serie) => {
                    return (
                      <div
                        key={serie.serieId.toString()}
                        className="flex flex-row justify-between"
                      >
                        <span className="text-sm">
                          {serie.serieName}
                        </span>
                        <div className="flex flex-row gap-4">
                          <Button
                            size="sm"
                            variant="outline"
                            render={
                              <route.Link
                                to="/dashboard/season/$seasonId/info/serie/$serieId/edit/games"
                                params={{
                                  seasonId: seasonId,
                                  serieId: serie.serieId,
                                }}
                                search={{
                                  women,
                                  form:
                                    div.isCup === true
                                      ? 'cup'
                                      : 'serie',
                                }}
                              >
                                Matcher
                              </route.Link>
                            }
                            nativeButton={false}
                          />

                          <Button
                            render={
                              <route.Link
                                to="/dashboard/season/$seasonId/info/serie/$serieId/edit"
                                params={{
                                  seasonId: seasonId,
                                  serieId: serie.serieId,
                                }}
                                search={{
                                  women,
                                  form:
                                    div.isCup === true
                                      ? 'cup'
                                      : 'serie',
                                }}
                              >
                                Ändra
                              </route.Link>
                            }
                            nativeButton={false}
                            size="sm"
                            variant="outline"
                          />
                        </div>
                      </div>
                    )
                  })}
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
