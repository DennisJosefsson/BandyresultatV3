import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base/ui/accordion'
import type { CheckedState } from '@/components/base/ui/checkbox'
import { useCookies } from '@/lib/contexts/cookieContext'
import { cn } from '@/lib/utils/utils'
import { getRouteApi } from '@tanstack/react-router'
import GamesList from './Games/GamesList'
import GamePreference from './shared/games/GamePreference'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/games',
)

export const SeasonGames = () => {
  const data = route.useLoaderData()
  const { sortGames: sortPreference, setSortGames } =
    useCookies()
  const teams = route.useSearch({ select: (s) => s.teams })

  const navigate = route.useNavigate()

  if (data.status === 404)
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        {data.message}
      </div>
    )
  if (
    data.games.playedLength + data.games.unplayedLength ===
    0
  ) {
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

  return (
    <div className="mx-1 mt-2 flex flex-col gap-2">
      <Accordion className="bg-secondary border">
        <AccordionItem className="rounded-md p-0.5 sm:p-2">
          <AccordionTrigger className="text-[10px] sm:text-xs md:text-sm">
            Sidinställningar
          </AccordionTrigger>
          <AccordionContent>
            <GamePreference
              teamArray={data.teamArray}
              handleSort={handleSort}
              handleTeamArrayChange={handleTeamArrayChange}
              sort={sortPreference}
              teams={teams}
              emptyTeamSelection={emptyTeamSelection}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div
        className={cn(
          'flex gap-4 max-w-3xl',
          sortPreference === 'unplayed'
            ? 'flex-col-reverse'
            : 'flex-col',
        )}
      >
        {data.games['playedLength'] > 0 ? (
          <GamesList
            group={data.games.played}
            title="Spelade"
            teams={teams}
          />
        ) : null}
        {data.games['unplayedLength'] > 0 ? (
          <GamesList
            group={data.games.unplayed}
            title="Kommande"
            teams={teams}
          />
        ) : null}
      </div>
    </div>
  )
}
