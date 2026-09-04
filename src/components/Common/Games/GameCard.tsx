import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/base/ui/card'
import { Datum } from '@/components/Common/Date'
import TeamLogo from '@/components/Common/TeamLogo'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { Game } from '@/lib/types/game'
import { Link } from '@tanstack/react-router'
import { StarIcon } from 'lucide-react'

type RoutePaths =
  | '/seasons/$year/$group/games'
  | '/seasons/$year/playoff/games'
  | '/teams/$teamId/seasons/$seasonId/'
  | '/seasons/$year/cup/$competitionName/games'
  | '/'
  | '/search'

type GamesCardProps = {
  serieName: string
  game: Omit<Game, 'season'>
  routePath: RoutePaths
}

export function GameCard({
  serieName,
  game,
  routePath,
}: GamesCardProps) {
  const { favTeams } = useCookies()
  const otHomeGoal = game.otResult
    ? game.otResult.split('-')[0]
    : undefined
  const otAwayGoal = game.otResult
    ? game.otResult.split('-')[1]
    : undefined

  return (
    <Card
      size="sm"
      className="group-data-[size=sm]/card:px-0.5 group-data-[size=sm]/card:py-1 @lg:group-data-[size=sm]/card:p-2"
    >
      <CardHeader className="group-data-[size=sm]/card:px-1 @lg:group-data-[size=sm]/card:px-2">
        <CardDescription>
          <span className="text-[10px] @xs:text-xs uppercase tracking-wide">
            {serieName}
          </span>
        </CardDescription>
        <CardContent className="group-data-[size=sm]/card:px-0.5 group-data-[size=sm]/card:py-1 @lg:group-data-[size=sm]/card:p-2">
          <div className="flex flex-row justify-between font-semibold text-[10px]/4 @xs:text-xs/5 @md:text-sm/7">
            <div className="flex flex-row gap-0.5 @sm:gap-1 @lg:gap-2 items-center w-15 @xs:w-20 @sm:w-25 @md:w-40 @xl:w-full justify-start">
              <TeamLogo
                size={32}
                teamId={game.homeTeamId}
                className="@sm:block hidden size-[1lh] object-scale-down"
                aria-label={game.home.casualName}
                title={game.home.casualName}
              />
              <span className="truncate @xs:tracking-wide">
                {game.home.name}
              </span>
              <StarIcon
                data-favteam={
                  favTeams.includes(game.homeTeamId)
                    ? true
                    : false
                }
                className="size-2.5 @xs:size-3 data-[favteam=false]:hidden"
              />
            </div>
            <div className="w-10 @xs:w-15 @md:text-base">
              {game.played ? (
                <div>
                  {game.otResult ? (
                    <div className="flex flex-row gap-0.5 @xs:gap-2 justify-center items-center">
                      <span className="text-right w-4 @xs:w-6">
                        {otHomeGoal}
                      </span>
                      <span className="w-3">-</span>
                      <span className="text-left w-4 @xs:w-6">
                        {otAwayGoal}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-row gap-0.5 @xs:gap-2 justify-center items-center">
                      <span className="text-right w-4 @xs:w-6">
                        {game.homeGoal}
                      </span>
                      <span className="w-3 text-center">
                        -
                      </span>
                      <span className="text-left w-4 @xs:w-6">
                        {game.awayGoal}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-row justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    render={
                      <Link
                        from={routePath}
                        to="/teams/compare"
                        search={(prev) => ({
                          ...prev,
                          teamArray: [
                            game.homeTeamId,
                            game.awayTeamId,
                          ],
                        })}
                      >
                        <span className="text-[8px] @xs:text-[10px] @sm:text-xs @xl:text-sm">
                          H2H
                        </span>
                      </Link>
                    }
                    nativeButton={false}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row gap-0.5 @sm:gap-1 @lg:gap-2 items-center w-15 @xs:w-20 @sm:w-25 @md:w-40 @xl:w-full justify-end">
              <StarIcon
                data-favteam={
                  favTeams.includes(game.awayTeamId)
                    ? true
                    : false
                }
                className="size-2.5 @xs:size-3 data-[favteam=false]:hidden"
              />
              <span className="truncate @xs:tracking-wide">
                {game.away.name}
              </span>
              <TeamLogo
                size={32}
                teamId={game.awayTeamId}
                className="@sm:block hidden size-[1lh] object-scale-down"
                aria-label={game.away.casualName}
                title={game.away.casualName}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t-0 w-full text-[10px] @xs:text-xs group-data-[size=sm]/card:px-0.5 group-data-[size=sm]/card:py-1 @lg:group-data-[size=sm]/card:p-2">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row justify-between items-center w-full">
              <div>
                <Datum>{game.date}</Datum>
              </div>
              <div>
                <span>
                  {game.halftimeResult
                    ? `Halvtid: ${game.halftimeResult}`
                    : null}
                </span>
              </div>
            </div>
            <div>
              {game.otResult ? (
                <span>
                  <p>
                    {game.result} vid full tid och matchen
                    avgjordes{' '}
                    {game.penalties
                      ? 'på straffar'
                      : game.extraTime
                        ? 'i förlängningen'
                        : 'på okänt vis'}
                    .
                  </p>
                </span>
              ) : null}
            </div>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  )
}
