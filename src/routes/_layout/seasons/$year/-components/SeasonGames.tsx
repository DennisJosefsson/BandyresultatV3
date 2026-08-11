import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base/ui/accordion'
import { Button } from '@/components/base/ui/button'
import type { CheckedState } from '@/components/base/ui/checkbox'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { Games } from '@/lib/types/game'
import { cn } from '@/lib/utils/utils'
import { getRouteApi } from '@tanstack/react-router'
import GamesList from './Games/GamesList'
import GamePreference from './shared/games/GamePreference'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/games',
)

type SeasonGamesProps = {
  games: Games
  teamArray: Array<{
    teamId: number
    casualName: string
  }>
}

export const SeasonGames = ({
  games,
  teamArray,
}: SeasonGamesProps) => {
  const { sortGames: sortPreference, setSortGames } =
    useCookies()
  const teams = route.useSearch({ select: (s) => s.teams })

  const navigate = route.useNavigate()

  if (games.playedLength + games.unplayedLength === 0) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        Inga matcher än denna säsong.
      </div>
    )
  }
  const handleSort = (value: 'played' | 'unplayed') => {
    setSortGames(
      value,
      '/_layout/seasons/$year/$group/games',
    )
  }

  const handleTeamArrayChange = (
    checked: CheckedState,
    teamId: number,
  ) => {
    if (checked) {
      navigate({
        resetScroll: false,
        search: (prev) => {
          if (prev.teams) {
            return {
              ...prev,
              teams: [...prev.teams, teamId],
            }
          } else {
            return {
              ...prev,
              teams: [teamId],
            }
          }
        },
      })
    } else {
      navigate({
        resetScroll: false,
        search: (prev) => {
          if (prev.teams && prev.teams.includes(teamId)) {
            if (prev.teams.length === 1)
              return { ...prev, teams: undefined }
            return {
              ...prev,
              teams: [
                ...prev.teams.filter((t) => t !== teamId),
              ],
            }
          } else return { ...prev }
        },
      })
    }
  }

  const emptyTeamSelection = () => {
    navigate({
      resetScroll: false,
      search: (prev) => {
        return {
          ...prev,
          teams: undefined,
        }
      },
    })
  }

  const removeLeftOver = () => {
    const leftoverTeams = teams?.filter(
      (team) =>
        !teamArray.map((t) => t.teamId).includes(team),
    )

    if (!leftoverTeams || leftoverTeams.length === 0) return
    const newTeamSelection = teams?.filter(
      (t) => !leftoverTeams.includes(t),
    )

    navigate({
      resetScroll: false,
      search: (prev) => {
        return {
          ...prev,
          teams:
            newTeamSelection?.length === 0
              ? undefined
              : newTeamSelection,
        }
      },
    })
  }

  const leftoverTeams = teams?.filter(
    (team) =>
      !teamArray.map((t) => t.teamId).includes(team),
  )

  return (
    <div className="@container/games mx-1 flex flex-col gap-2 @sm/playoff:gap-4">
      <Accordion className="bg-secondary border">
        <AccordionItem className="rounded-md p-0.5 @sm/games:p-2">
          <AccordionTrigger className="text-[10px] @sm/games:text-xs @md/games:text-sm">
            Sidinställningar
          </AccordionTrigger>
          <AccordionContent>
            <GamePreference
              teamArray={teamArray}
              handleSort={handleSort}
              handleTeamArrayChange={handleTeamArrayChange}
              sort={sortPreference}
              teams={teams}
              emptyTeamSelection={emptyTeamSelection}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {leftoverTeams && leftoverTeams.length > 0 ? (
        <div className="flex flex-col gap-1 sm:gap-2 w-full bg-accent-foreground py-1 px-2 ">
          <p className="text-red-600 text-[8px] xs:text-xs md:text-sm text-center font-semibold">
            Valt lag ingår inte i serien.
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <Button
              onClick={emptyTeamSelection}
              size="sm"
              className="text-[8px] xs:text-xs md:text-sm"
            >
              Rensa val
            </Button>

            <Button
              onClick={removeLeftOver}
              size="sm"
              className="text-[8px] xs:text-xs md:text-sm"
            >
              Ta bort överskjutande
            </Button>
          </div>
        </div>
      ) : null}

      {leftoverTeams && leftoverTeams.length > 0 ? null : (
        <div
          className={cn(
            'flex gap-4 max-w-3xl',
            sortPreference === 'unplayed'
              ? 'flex-col-reverse'
              : 'flex-col',
          )}
        >
          {games['playedLength'] > 0 ? (
            <GamesList
              group={games.played}
              title="Spelade"
              teams={teams}
            />
          ) : null}
          {games['unplayedLength'] > 0 ? (
            <GamesList
              group={games.unplayed}
              title="Kommande"
              teams={teams}
            />
          ) : null}
        </div>
      )}
    </div>
  )
}
