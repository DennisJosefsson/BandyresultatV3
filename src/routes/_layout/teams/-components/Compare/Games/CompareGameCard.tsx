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
import type {
  CompareGamesBase,
  CompareGamesWithAge,
} from '@/lib/types/game'
import { StarIcon } from 'lucide-react'

type GamesCardProps = {
  game:
    | { type: 'regular'; game: CompareGamesBase }
    | { type: 'latest'; game: CompareGamesWithAge }
}

export function CompareGameCard({ game }: GamesCardProps) {
  const { favTeams } = useCookies()
  const otHomeGoal = game.game.otResult
    ? game.game.otResult.split('-')[0]
    : undefined
  const otAwayGoal = game.game.otResult
    ? game.game.otResult.split('-')[1]
    : undefined

  return (
    <Card
      size="sm"
      className="group-data-[size=sm]/card:px-0.5 group-data-[size=sm]/card:py-1 @lg:group-data-[size=sm]/card:p-2"
    >
      <CardHeader className="group-data-[size=sm]/card:px-1 @lg:group-data-[size=sm]/card:px-2">
        <CardDescription>
          <div className="flex flex-row gap-2">
            <span className="text-[10px] @xs:text-xs uppercase tracking-wide">
              {game.game.serie.serieName}
            </span>
            {game.game.category.includes('cup-') ? (
              <span className="text-[10px] @xs:text-xs uppercase tracking-wide">
                {game.game.competition.competitionName}
              </span>
            ) : null}
          </div>
        </CardDescription>
        <CardContent className="group-data-[size=sm]/card:px-0.5 group-data-[size=sm]/card:py-1 @lg:group-data-[size=sm]/card:p-2">
          <div className="flex flex-row justify-between font-semibold text-xs/5 @md:text-sm/7">
            <div className="flex flex-row gap-0.5 @sm:gap-1 @lg:gap-2 items-center w-15 @xs:w-20 @sm:w-25 @md:w-40 @xl:w-full justify-start">
              <TeamLogo
                size={32}
                logoId={game.game.home.logo.logoId}
                hasDark={game.game.home.logo.hasDark}
                className="size-[1lh] object-scale-down"
                aria-label={game.game.home.casualName}
                title={game.game.home.casualName}
              />
              <span className="@md:block hidden truncate @xs:tracking-wide">
                {game.game.home.name}
              </span>
              <span className="block @md:hidden">
                {game.game.home.shortName}
              </span>
              <StarIcon
                data-favteam={
                  favTeams.includes(game.game.homeTeamId)
                    ? true
                    : false
                }
                className="size-2.5 @xs:size-3 data-[favteam=false]:hidden"
              />
            </div>
            <div className="w-10 @xs:w-15 @md:text-base">
              <div>
                {game.game.otResult ? (
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
                      {game.game.homeGoal}
                    </span>
                    <span className="w-3 text-center">
                      -
                    </span>
                    <span className="text-left w-4 @xs:w-6">
                      {game.game.awayGoal}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-0.5 @sm:gap-1 @lg:gap-2 items-center w-15 @xs:w-20 @sm:w-25 @md:w-40 @xl:w-full justify-end">
              <StarIcon
                data-favteam={
                  favTeams.includes(game.game.awayTeamId)
                    ? true
                    : false
                }
                className="size-2.5 @xs:size-3 data-[favteam=false]:hidden"
              />
              <span className="@md:block hidden truncate @xs:tracking-wide">
                {game.game.away.name}
              </span>
              <span className="block @md:hidden">
                {game.game.away.shortName}
              </span>
              <TeamLogo
                size={32}
                logoId={game.game.away.logo.logoId}
                hasDark={game.game.away.logo.hasDark}
                className="size-[1lh] object-scale-down"
                aria-label={game.game.away.casualName}
                title={game.game.away.casualName}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t-0 w-full text-[10px] @xs:text-xs group-data-[size=sm]/card:px-0.5 group-data-[size=sm]/card:py-1 @lg:group-data-[size=sm]/card:p-2">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row justify-between items-center w-full">
              <div>
                <Datum>{game.game.date}</Datum>
              </div>
              <div>
                <span>
                  {game.game.halftimeResult
                    ? `Halvtid: ${game.game.halftimeResult}`
                    : null}
                </span>
              </div>
            </div>
            <div>
              {game.game.otResult ? (
                <span>
                  <p>
                    {game.game.result} vid full tid och
                    matchen avgjordes{' '}
                    {game.game.penalties
                      ? 'på straffar'
                      : game.game.extraTime
                        ? 'i förlängningen'
                        : 'på okänt vis'}
                    .
                  </p>
                </span>
              ) : null}
            </div>
            <div>
              {game.type === 'latest' && game.game.age ? (
                <span>
                  <p>{game.game.age}</p>
                </span>
              ) : null}
            </div>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  )
}
