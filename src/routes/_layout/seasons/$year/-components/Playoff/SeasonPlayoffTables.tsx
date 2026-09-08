import type { playoffseason } from '@/db/schema'
import type { Game } from '@/lib/types/game'
import type {
  PlayoffGroupsV2,
  PlayoffSeriesTable,
} from '@/lib/types/table'
import { cn } from '@/lib/utils/utils'
import PlayoffAsSeriesTables from './PlayoffAsSeriesTables'
import DefaultComponent from './PlayoffTree/DefaultComponent'
import Final from './PlayoffTree/Final'
import NilComponent from './PlayoffTree/NilComponent'

type PlayoffTable = {
  category: string
  level: number | null
  groupArray: Array<PlayoffGroupsV2>
}

type PlayoffTableProps = {
  status: 200
  finalGames: Array<Omit<Game, 'season'>>
  bronzeGames: Array<Omit<Game, 'season'>>
  playoffTables: Array<PlayoffTable>
  playoffSeriesTables: Array<PlayoffSeriesTable> | undefined
  playoffSeason: typeof playoffseason.$inferSelect
}

const SeasonPlayoffTables = ({
  finalGames,
  bronzeGames,
  playoffSeason,
  playoffSeriesTables,
  playoffTables,
}: PlayoffTableProps) => {
  return (
    <div className="@container/playoff m-0 w-full @4xl/playoff:justify-self-center">
      <div className="grid gap-2 @5xl/playoff:gap-4">
        <Final
          finalGames={finalGames}
          title="Final"
        />
        {bronzeGames.length > 0 ? (
          <Final
            finalGames={bronzeGames}
            title="Bronsmatch"
          />
        ) : null}
        {playoffTables.map((cat) => {
          return (
            <div
              key={cat.category}
              data-category={cat.category}
              data-twogroups={
                cat.groupArray.length === 2 ? true : false
              }
              className={cn(
                'grid grid-cols-1 gap-2',
                'data-[category=semi]:@4xl/playoff:grid-cols-7',
                'data-[category=quarter]:@5xl/playoff:gap-4 data-[category=quarter]:data-[twogroups=true]:@5xl/playoff:gap-4 @4xl/playoff:grid-cols-7',
                'data-[category=quarter]:data-[twogroups=false]:@4xl/playoff:grid-cols-4',
                'data-[category=eight]:@5xl/playoff:gap-4 data-[category=eight]:data-[twogroups=true]:@5xl/playoff:gap-4 @4xl/playoff:grid-cols-7',
                'data-[category=eight]:data-[twogroups=false]:@4xl/playoff:grid-cols-4',
              )}
            >
              {cat.groupArray.map((group, _, arr) => {
                if (group.teamArray.length === 0)
                  return (
                    <div
                      key={group.group}
                      data-groupid={group.group}
                      data-twogroups={
                        arr.length === 2 ? true : false
                      }
                      className={cn(
                        'mb-2 @4xl/playoff:mb-6',
                        'data-[groupid=S1]:@4xl/playoff:col-start-2 data-[groupid=S2]:@4xl/playoff:col-start-5 data-[groupid=S1]:@4xl/playoff:col-span-2 data-[groupid=S2]:@4xl/playoff:col-span-2',
                        'data-[twogroups=true]:data-[groupid=Q1]:@4xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=Q2]:@4xl/playoff:col-start-5 data-[twogroups=true]:data-[groupid=Q1]:@4xl/playoff:col-span-2 data-[twogroups=true]:data-[groupid=Q2]:@4xl/playoff:col-span-2',
                        'data-[twogroups=false]:data-[groupid=Q1]:@4xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=Q2]:@4xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=Q3]:@4xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=Q4]:@4xl/playoff:col-start-4',
                        'data-[twogroups=true]:data-[groupid=E1]:@4xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=E2]:@4xl/playoff:col-start-5 data-[twogroups=true]:data-[groupid=E1]:@4xl/playoff:col-span-2 data-[twogroups=true]:data-[groupid=E2]:@4xl/playoff:col-span-2',
                        'data-[twogroups=false]:data-[groupid=E1]:@4xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=E2]:@4xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=E3]:@4xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=E4]:@4xl/playoff:col-start-4',
                      )}
                    >
                      <NilComponent
                        group={group.serieName}
                      />
                    </div>
                  )

                return (
                  <div
                    key={group.group}
                    data-groupid={group.group}
                    data-twogroups={
                      arr.length === 2 ? true : false
                    }
                    className={cn(
                      'mb-2 @4xl/playoff:mb-6',
                      'data-[groupid=S1]:@4xl/playoff:col-start-2 data-[groupid=S2]:@4xl/playoff:col-start-5 data-[groupid=S1]:@4xl/playoff:col-span-2 data-[groupid=S2]:@4xl/playoff:col-span-2',
                      'data-[twogroups=true]:data-[groupid=Q1]:@4xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=Q2]:@4xl/playoff:col-start-5 data-[twogroups=true]:data-[groupid=Q1]:@4xl/playoff:col-span-2 data-[twogroups=true]:data-[groupid=Q2]:@4xl/playoff:col-span-2',
                      'data-[twogroups=false]:data-[groupid=Q1]:@4xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=Q2]:@4xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=Q3]:@4xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=Q4]:@4xl/playoff:col-start-4',
                      'data-[twogroups=true]:data-[groupid=E1]:@4xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=E2]:@4xl/playoff:col-start-5 data-[twogroups=true]:data-[groupid=E1]:@4xl/playoff:col-span-2 data-[twogroups=true]:data-[groupid=E2]:@4xl/playoff:col-span-2',
                      'data-[twogroups=false]:data-[groupid=E1]:@4xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=E2]:@4xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=E3]:@4xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=E4]:@4xl/playoff:col-start-4',
                    )}
                  >
                    <DefaultComponent group={group} />
                  </div>
                )
              })}
            </div>
          )
        })}

        {playoffSeason.playoffAsSeries ? (
          <PlayoffAsSeriesTables
            playoffSeriesTables={playoffSeriesTables}
          />
        ) : null}
      </div>
    </div>
  )
}

export default SeasonPlayoffTables
