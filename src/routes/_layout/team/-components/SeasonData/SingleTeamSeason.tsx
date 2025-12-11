import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getRouteApi, Link } from '@tanstack/react-router'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import GamesList from './Games/GamesList'
import SeasonTables from './SeasonTables'

const route = getRouteApi('/_layout/team/$teamId/$seasonId')

const SingleTeamSeason = () => {
  const season = route.useLoaderData()
  return (
    <CardContent className="p-1 md:p-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <Link
            from="/team/$teamId/$seasonId"
            to="/team/$teamId/$seasonId"
            search={(prev) => ({ ...prev })}
            params={(prev) => ({
              ...prev,
              seasonId:
                season.previousSeason?.seasonId ?? season.lastSeason.seasonId,
            })}
          >
            <Button variant="ghost" aria-label="Gå till föregående säsong">
              <div className="inline-flex gap-1 items-center">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="hidden sm:block">Föregående</span>
              </div>
            </Button>
          </Link>
          <h4 className="font-semibold text-sm md:text-lg">
            {season.seasonYear}
          </h4>
          <Link
            from="/team/$teamId/$seasonId"
            to="/team/$teamId/$seasonId"
            search={(prev) => ({ ...prev })}
            params={(prev) => ({
              ...prev,
              seasonId:
                season.nextSeason?.seasonId ?? season.firstSeason.seasonId,
            })}
          >
            <Button variant="ghost" aria-label="Gå till nästa säsong">
              <div className="inline-flex gap-1 items-center">
                <span className="hidden sm:block">Nästa</span>
                <ChevronRightIcon className="h-4 w-4" />
              </div>
            </Button>
          </Link>
        </div>
        <div>
          <Tabs defaultValue="tables">
            <TabsList>
              <TabsTrigger
                className="text-[10px] md:text-sm truncate"
                value="tables"
              >
                Tabeller
              </TabsTrigger>
              <TabsTrigger
                className="text-[10px] md:text-sm truncate"
                value="games"
              >
                Matcher
              </TabsTrigger>

              <TabsTrigger
                className="text-[10px] md:text-sm truncate"
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
                hasGames={season.hasGames}
                gamesArray={season.games.playedGames}
                tab="games"
              />
            </TabsContent>

            <TabsContent value="upcoming">
              <GamesList
                hasGames={season.hasGames}
                gamesArray={season.games.unplayedGames}
                tab="upcoming"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CardContent>
  )
}

export default SingleTeamSeason
