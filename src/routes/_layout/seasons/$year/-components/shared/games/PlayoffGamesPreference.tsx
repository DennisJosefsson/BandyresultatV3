import RadioBadges from '@/components/Common/RadioBadge'
import { useCookies } from '@/lib/contexts/cookieContext'

const sortPreferenceOrder = [
  { value: 'played', label: 'Spelade först' },
  { value: 'unplayed', label: 'Kommande först' },
]

// const playedOrder = [
//   { value: 'asc', label: 'Stigande' },
//   { value: 'desc', label: 'Fallande' },
// ]

// type GamePreferenceProps = {
//   teamArray: Array<{ teamId: number; casualName: string }>
//   teams: Array<number> | undefined
//   handleTeamArrayChange: (
//     checked: CheckedState,
//     teamId: number,
//   ) => void
//   sort: 'played' | 'unplayed'
//   handleSort: (value: 'played' | 'unplayed') => void
//   emptyTeamSelection: () => void
// }

// const route = getRouteApi(
//   '/_layout/seasons/$year/playoff/games',
// )

const PlayoffGamesPreference = () => {
  const {
    sortPlayoffGames: sortPreference,
    setSortPlayoffGames,
  } = useCookies()
  //   const teams = route.useSearch({ select: (s) => s.teams })

  //   const navigate = route.useNavigate()

  const handleSortPreference = (
    value: 'played' | 'unplayed',
  ) => {
    setSortPlayoffGames(
      value,
      '/_layout/seasons/$year/playoff/games',
    )
  }

  // const handleSortPlayedGames = (value: 'asc' | 'desc') => {
  //   setSortPlayedGames(
  //     value,
  //     '/_layout/seasons/$year/$group/games',
  //   )
  // }

  // const handleSortUnplayedGames = (
  //   value: 'asc' | 'desc',
  // ) => {
  //   setSortUnplayedGames(
  //     value,
  //     '/_layout/seasons/$year/$group/games',
  //   )
  // }

  //   const handleTeamArrayChange = (
  //     checked: CheckedState,
  //     teamId: number,
  //   ) => {
  //     if (checked) {
  //       navigate({
  //         resetScroll: false,
  //         search: (prev) => {
  //           if (prev.teams) {
  //             return {
  //               ...prev,
  //               teams: [...prev.teams, teamId],
  //             }
  //           } else {
  //             return {
  //               ...prev,
  //               teams: [teamId],
  //             }
  //           }
  //         },
  //       })
  //     } else {
  //       navigate({
  //         resetScroll: false,
  //         search: (prev) => {
  //           if (prev.teams && prev.teams.includes(teamId)) {
  //             if (prev.teams.length === 1)
  //               return { ...prev, teams: undefined }
  //             return {
  //               ...prev,
  //               teams: [
  //                 ...prev.teams.filter((t) => t !== teamId),
  //               ],
  //             }
  //           } else return { ...prev }
  //         },
  //       })
  //     }
  //   }

  //   const emptyTeamSelection = () => {
  //     navigate({
  //       resetScroll: false,
  //       search: (prev) => {
  //         return {
  //           ...prev,
  //           teams: undefined,
  //         }
  //       },
  //     })
  //   }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-y-2 md:gap-y-4 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
        <div className="max-w-sm flex flex-col gap-y-0.5">
          <div className="mb-1">
            <span className="font-semibold text-[10] xs:text-xs md:text-sm">
              Sortera spelade/ospelade
            </span>
          </div>
          <RadioBadges
            array={sortPreferenceOrder}
            orientation="horizontal"
            name="sort"
            onValueChange={handleSortPreference}
            defaultValue="unplayed"
            value={sortPreference ?? 'unplayed'}
            className="dark:bg-muted bg-card flex flex-row gap-2"
          />
        </div>
        {/* <div className="max-w-sm flex flex-col gap-y-0.5">
          <div>
            <span className="font-semibold text-[10] xs:text-xs md:text-sm">
              Sortera spelade matcher
            </span>
          </div>
          <RadioBadges
            array={playedOrder}
            orientation="horizontal"
            name="playedGames"
            onValueChange={handleSortPlayedGames}
            defaultValue="desc"
            value={sortPlayedGames ?? 'desc'}
            className="dark:bg-muted bg-card flex flex-row gap-2"
          />
        </div>
        <div className="max-w-sm flex flex-col gap-y-0.5">
          <div>
            <span className="font-semibold text-[10] xs:text-xs md:text-sm">
              Sortera ospelade matcher
            </span>
          </div>
          <RadioBadges
            array={playedOrder}
            orientation="horizontal"
            name="unplayedGames"
            onValueChange={handleSortUnplayedGames}
            defaultValue="desc"
            value={sortUnplayedGames ?? 'desc'}
            className="dark:bg-muted bg-card flex flex-row gap-2"
          />
        </div> */}
      </div>
      {/* <div>
        <div className="flex flex-col gap-y-0.5">
          <span className="font-semibold text-[10] xs:text-xs md:text-sm">
            Välj lag
          </span>
        </div>
        <div className="msm:grid-cols-2 msm:gap-4 grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-6 xl:grid-cols-6">
          {teamArray.map((t) => {
            return (
              <CheckboxBadge
                key={t.teamId.toString()}
                name="teams"
                id={t.teamId.toString()}
                checked={
                  teams ? teams.includes(t.teamId) : false
                }
                onCheckedChange={(checked) =>
                  handleTeamArrayChange(checked, t.teamId)
                }
                title={t.casualName}
                orientation="horizontal"
                className="dark:bg-muted bg-card"
              />
            )
          })}
          <Button
            onClick={emptyTeamSelection}
            className="h-full"
          >
            Ta bort val
          </Button>
        </div>
      </div> */}
    </div>
  )
}

export default PlayoffGamesPreference
