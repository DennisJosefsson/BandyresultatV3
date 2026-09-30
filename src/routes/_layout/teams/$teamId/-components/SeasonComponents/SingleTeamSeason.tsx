import { Button } from '@/components/base/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/base/ui/popover'
import { getRouteApi } from '@tanstack/react-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import Games from './Games/Games'
import TableList from './Tables/TableList'

const route = getRouteApi(
  '/_layout/teams/$teamId/seasons/$seasonId/',
)

const SingleTeamSeason = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  return (
    <div className="@container flex flex-col gap-2 mt-2 sm:mt-4">
      <div className="flex flex-row items-center justify-center gap-10">
        <route.Link
          to="/teams/$teamId/seasons/$seasonId"
          search={(prev) => ({ ...prev })}
          params={(prev) => ({
            ...prev,
            seasonId:
              data.previousSeason?.seasonId ??
              data.lastSeason?.seasonId,
          })}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Gå till föregående säsong"
          >
            <ArrowLeftIcon className="size-3 lg:size-6" />
            <span className="sr-only">Tidigare säsong</span>
          </Button>
        </route.Link>
        <span className="w-24 text-center text-sm font-semibold md:text-base">
          {data.seasonYear}
        </span>
        <route.Link
          to="/teams/$teamId/seasons/$seasonId"
          search={(prev) => ({ ...prev })}
          params={(prev) => ({
            ...prev,
            seasonId:
              data.nextSeason?.seasonId ??
              data.firstSeason?.seasonId,
          })}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Gå till nästa säsong"
          >
            <ArrowRightIcon className="size-3 lg:size-6" />
            <span className="sr-only">Senare säsong</span>
          </Button>
        </route.Link>
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        {data.seasonResult.map((comp) => {
          return (
            <div
              key={comp.competitionName}
              className="mb-6 @container/teamseason"
            >
              <div>
                <h3 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
                  {comp.competitionName}
                </h3>
              </div>
              {comp.seriesArray.map((serie) => {
                return (
                  <div
                    key={`${comp.competitionName}-${serie.serieName}`}
                    className="mt-1 flex flex-col gap-2"
                  >
                    <div className="flex flex-row gap-x-12 items-center mb-2">
                      <h3 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
                        {serie.serieName}
                      </h3>
                      {serie.comment ? (
                        <Popover>
                          <PopoverTrigger
                            render={
                              <Button variant="outline">
                                Kommentar
                              </Button>
                            }
                          />
                          <PopoverContent>
                            <span className="p-2 text-xs @sm:text-sm font-semibold">
                              {serie.comment}
                            </span>
                          </PopoverContent>
                        </Popover>
                      ) : null}
                    </div>
                    <TableList
                      tableArray={serie.tableArray}
                      serieStructure={serie.serieStructure}
                    />
                    <Games
                      gameObject={serie.gameObject}
                      serieName={serie.serieName}
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleTeamSeason
