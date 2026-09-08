import { cn } from '@/lib/utils/utils'
import { getRouteApi } from '@tanstack/react-router'
import PlayoffAsSeriesTables from '../../../-components/Playoff/PlayoffAsSeriesTables'
import DefaultComponent from './PlayoffTree/DefaultComponent'
import Final from './PlayoffTree/Final'
import NilComponent from './PlayoffTree/NilComponent'

const route = getRouteApi(
  '/_layout/seasons/$year/cup/$competitionName/playoff',
)

const CupPlayoffTables = () => {
  const data = route.useLoaderData({
    select(match) {
      if (!match) {
        throw new Error(
          'Missing data in cup playoff table component useLoaderData',
        )
      }
      return match.data
    },
  })

  if (data.status === 404) return null
  return (
    <div className="@container/playoff m-0 w-full @2xl/playoff:justify-self-center">
      <div className="grid gap-2 @5xl/playoff:gap-4">
        <Final
          finalGames={data.finalGames}
          title="Final"
        />
        {data.bronzeGames.length > 0 ? (
          <Final
            finalGames={data.bronzeGames}
            title="Bronsmatch"
          />
        ) : null}
        {data.playoffTables.map((cat) => {
          return (
            <div
              key={cat.category}
              data-category={cat.category}
              data-twogroups={
                cat.groupArray.length === 2 ? true : false
              }
              className={cn(
                'grid grid-cols-1 gap-2',
                'data-[category=cup-semi]:@2xl/playoff:grid-cols-7',
                'data-[category=cup-quarter]:@5xl/playoff:gap-4 data-[category=cup-quarter]:data-[twogroups=true]:@5xl/playoff:gap-4 @2xl/playoff:grid-cols-7',
                'data-[category=cup-quarter]:data-[twogroups=false]:@2xl/playoff:grid-cols-4',
                'data-[category=cup-eight]:@5xl/playoff:gap-4 data-[category=cup-eight]:data-[twogroups=true]:@5xl/playoff:gap-4 @2xl/playoff:grid-cols-7',
                'data-[category=cup-eight]:data-[twogroups=false]:@2xl/playoff:grid-cols-4',
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
                        'data-[groupid=cup-S1]:@4xl/playoff:col-start-2 data-[groupid=cup-S2]:@4xl/playoff:col-start-5 data-[groupid=cup-S1]:@4xl/playoff:col-span-2 data-[groupid=cup-S2]:@4xl/playoff:col-span-2',
                        'data-[twogroups=true]:data-[groupid=cup-Q1]:@4xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=cup-Q2]:@4xl/playoff:col-start-5 data-[twogroups=true]:data-[groupid=cup-Q1]:@4xl/playoff:col-span-2 data-[twogroups=true]:data-[groupid=cup-Q2]:@4xl/playoff:col-span-2',
                        'data-[twogroups=false]:data-[groupid=cup-Q1]:@4xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=cup-Q2]:@4xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=cup-Q3]:@4xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=cup-Q4]:@4xl/playoff:col-start-4',
                        'data-[twogroups=true]:data-[groupid=cup-E1]:@4xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=cup-E2]:@4xl/playoff:col-start-5 data-[twogroups=true]:data-[groupid=cup-E1]:@4xl/playoff:col-span-2 data-[twogroups=true]:data-[groupid=cup-E2]:@4xl/playoff:col-span-2',
                        'data-[twogroups=false]:data-[groupid=cup-E1]:@4xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=cup-E2]:@4xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=cup-E3]:@4xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=cup-E4]:@4xl/playoff:col-start-4',
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
                      'data-[groupid=cup-S1]:@4xl/playoff:col-start-2 data-[groupid=cup-S2]:@4xl/playoff:col-start-5 data-[groupid=cup-S1]:@4xl/playoff:col-span-2 data-[groupid=cup-S2]:@4xl/playoff:col-span-2',
                      'data-[twogroups=true]:data-[groupid=cup-Q1]:@4xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=cup-Q2]:@4xl/playoff:col-start-5 data-[twogroups=true]:data-[groupid=cup-Q1]:@4xl/playoff:col-span-2 data-[twogroups=true]:data-[groupid=cup-Q2]:@4xl/playoff:col-span-2',
                      'data-[twogroups=false]:data-[groupid=cup-Q1]:@4xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=cup-Q2]:@4xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=cup-Q3]:@4xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=cup-Q4]:@4xl/playoff:col-start-4',
                      'data-[twogroups=true]:data-[groupid=cup-E1]:@4xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=cup-E2]:@4xl/playoff:col-start-5 data-[twogroups=true]:data-[groupid=cup-E1]:@4xl/playoff:col-span-2 data-[twogroups=true]:data-[groupid=cup-E2]:@4xl/playoff:col-span-2',
                      'data-[twogroups=false]:data-[groupid=cup-E1]:@4xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=cup-E2]:@4xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=cup-E3]:@4xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=cup-E4]:@4xl/playoff:col-start-4',
                    )}
                  >
                    <DefaultComponent group={group} />
                  </div>
                )
              })}
              {data.playoffSeriesTables ? (
                <PlayoffAsSeriesTables
                  playoffSeriesTables={
                    data.playoffSeriesTables
                  }
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CupPlayoffTables
