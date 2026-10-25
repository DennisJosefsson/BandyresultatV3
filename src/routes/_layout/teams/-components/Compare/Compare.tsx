import type {
  CompareBaseTable,
  CompareCategoryData,
  CompareStatsV2,
} from '@/lib/types/compare'
import type {
  CompareGamesBase,
  CompareGamesWithAge,
} from '@/lib/types/game'
import type { CompareTeam } from '@/lib/types/team'
import CompareHeader from './CompareHeader'
import FirstGames from './CompareStatsSubComponents/FirstGames'
import LatestGames from './CompareStatsSubComponents/LatestGames'
import LatestWins from './CompareStatsSubComponents/LatestWins'
import Stats from './CompareStatsSubComponents/Stats'
import CompareTables from './Tables/Table'

type CompareProps = {
  status: 200
  homeTeam: CompareTeam
  awayTeam: CompareTeam
  categoryData: CompareCategoryData
  allData: Array<CompareBaseTable>
  gameCount: number
  stats: Array<CompareStatsV2>
  firstGames: Array<CompareGamesBase>
  latestGames: Array<CompareGamesBase>
  latestHomeWin: Array<CompareGamesWithAge>
  latestAwayWin: Array<CompareGamesWithAge>
  compareHeaderText: string
}

const Compare = ({
  homeTeam,
  awayTeam,
  categoryData,
  allData,
  stats,
  firstGames,
  latestGames,
  latestHomeWin,
  latestAwayWin,
  compareHeaderText,
}: CompareProps) => {
  return (
    <div className="mt-2 @container/compare">
      <CompareHeader
        compareHeaderText={compareHeaderText}
        allData={allData}
      />
      <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-4 mt-2 sm:mt-4">
        <CompareTables
          allData={allData}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          categoryData={categoryData}
        />
        <div className="flex flex-col gap-4 @5xl:mt-18">
          {stats.map((stat) => {
            return (
              <Stats
                stats={stat}
                key={stat.teamId.toString()}
              />
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4 @5xl:mt-0">
        <LatestWins
          latestWins={latestHomeWin}
          title="Senaste hemmavinsten"
        />
        <LatestWins
          latestWins={latestAwayWin}
          title="Senaste bortavinsten"
        />

        <FirstGames firstGames={firstGames} />
        <LatestGames latestGames={latestGames} />
      </div>
    </div>
  )
}

export default Compare
