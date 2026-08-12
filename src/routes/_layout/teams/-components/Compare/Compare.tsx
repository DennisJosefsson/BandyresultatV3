import type {
  CompareBaseTable,
  CompareCategoryData,
  CompareGameStat,
  CompareLatestWinStats,
  CompareSeasonStat,
} from '@/lib/types/compare'
import type { Team } from '@/lib/types/team'
import CompareHeader from './CompareHeader'
import FirstGames from './CompareStatsSubComponents/FirstGames'
import Golds from './CompareStatsSubComponents/Golds'
import LatestGames from './CompareStatsSubComponents/LatestGames'
import LatestWins from './CompareStatsSubComponents/LatestWins'
import Playoffs from './CompareStatsSubComponents/Playoffs'
import Seasons from './CompareStatsSubComponents/Seasons'
import CompareTables from './Tables/Table'

type CompareProps = {
  status: 200
  homeTeam: Team
  awayTeam: Team
  categoryData: CompareCategoryData
  allData: Array<CompareBaseTable>
  gameCount: number
  golds: Array<CompareSeasonStat>
  playoffs: Array<CompareSeasonStat>
  allPlayoffs: Array<CompareSeasonStat>
  firstDivisionSeasonsSince1931: Array<CompareSeasonStat>
  firstDivisionSeasons: Array<CompareSeasonStat>
  firstGames: Array<CompareGameStat>
  latestGames: Array<CompareGameStat>
  latestHomeWin: Array<CompareLatestWinStats>
  latestAwayWin: Array<CompareLatestWinStats>
  compareHeaderText: string
}

const Compare = ({
  homeTeam,
  awayTeam,
  categoryData,
  allData,
  golds,
  playoffs,
  allPlayoffs,
  firstDivisionSeasonsSince1931,
  firstDivisionSeasons,
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
        <div className="flex flex-col gap-4 @5xl:mt-16">
          <Seasons
            firstDivisionSeasons={firstDivisionSeasons}
            firstDivisionSeasonsSince1931={
              firstDivisionSeasonsSince1931
            }
          />
          <Playoffs
            allPlayoffs={allPlayoffs}
            playoffs={playoffs}
          />
          <Golds golds={golds} />
        </div>
        <div className="flex flex-col gap-4">
          <LatestWins
            latestWins={latestHomeWin}
            title="Senaste hemmavinsten"
          />
          <LatestWins
            latestWins={latestAwayWin}
            title="Senaste bortavinsten"
          />
        </div>
        <div className="flex flex-col gap-4">
          <FirstGames firstGames={firstGames} />
          <LatestGames latestGames={latestGames} />
        </div>
      </div>
    </div>
  )
}

export default Compare
