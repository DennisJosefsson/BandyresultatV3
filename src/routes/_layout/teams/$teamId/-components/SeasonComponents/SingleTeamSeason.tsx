import { Link, getRouteApi } from '@tanstack/react-router'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'

import { Button } from '@/components/base/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/base/ui/tabs'

import GamesList from './Games/GamesList'
import SeasonTables from './SeasonTables'

const route = getRouteApi(
  '/_layout/teams/$teamId/$seasonId',
)

const SingleTeamSeason = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Link
            from="/teams/$teamId/$seasonId"
            to="/teams/$teamId/$seasonId"
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
              aria-label="Gå till föregående säsong"
            >
              <div className="inline-flex items-center gap-1">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="hidden sm:block">
                  Föregående
                </span>
              </div>
            </Button>
          </Link>
          <h4 className="text-xs sm:text-sm font-semibold md:text-base">
            {data.seasonYear}
          </h4>
          <Link
            from="/teams/$teamId/$seasonId"
            to="/teams/$teamId/$seasonId"
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
              aria-label="Gå till nästa säsong"
            >
              <div className="inline-flex items-center gap-1">
                <span className="hidden sm:block">
                  Nästa
                </span>
                <ChevronRightIcon className="h-4 w-4" />
              </div>
            </Button>
          </Link>
        </div>
        <div>
          <Tabs
            defaultValue="tables"
            className="flex flex-col"
          >
            <TabsList>
              <TabsTrigger
                className="text-[10px] md:text-sm"
                value="tables"
              >
                Tabeller
              </TabsTrigger>
              <TabsTrigger
                className="text-[10px] md:text-sm"
                value="games"
              >
                Matcher
              </TabsTrigger>

              <TabsTrigger
                className="text-[10px] md:text-sm"
                value="upcoming"
              >
                Ospelade matcher
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tables">
              <SeasonTables />
            </TabsContent>
            <TabsContent value="games">
              <GamesList
                hasGames={data.hasGames}
                gamesArray={data.games.playedGames}
                tab="games"
              />
            </TabsContent>

            <TabsContent value="upcoming">
              <GamesList
                hasGames={data.hasGames}
                gamesArray={data.games.unplayedGames}
                tab="upcoming"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SingleTeamSeason
