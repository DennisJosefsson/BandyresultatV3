import { cn } from '@/lib/utils/utils'
import { getRouteApi } from '@tanstack/react-router'
import PlayoffAsSeriesTables from './PlayoffAsSeriesTables'
import DefaultComponent from './PlayoffTree/DefaultComponent'
import Final from './PlayoffTree/Final'
import NilComponent from './PlayoffTree/NilComponent'

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/table',
)

const SeasonPlayoffTables = () => {
  const data = route.useLoaderData()

  if (data.status === 404) return null

  return (
    <div className="@container/playoff m-0 w-full @2xl/playoff:justify-self-center">
      <div className="grid gap-2 @5xl/playoff:gap-4">
        <Final />
        {data.playoffTables.map((cat) => {
          return (
            <div
              key={cat.category}
              data-category={cat.category}
              data-twogroups={
                cat.groups.length === 2 ? true : false
              }
              className={cn(
                'grid grid-cols-1 gap-2',
                'data-[category=semi]:@2xl/playoff:grid-cols-5',
                'data-[category=quarter]:@5xl/playoff:gap-4 data-[category=quarter]:data-[twogroups=true]:@5xl/playoff:gap-4 @2xl/playoff:grid-cols-5',
                'data-[category=quarter]:data-[twogroups=false]:@2xl/playoff:grid-cols-4',
                'data-[category=eight]:@5xl/playoff:gap-4 data-[category=eight]:data-[twogroups=true]:@5xl/playoff:gap-4 @2xl/playoff:grid-cols-5',
                'data-[category=eight]:data-[twogroups=false]:@2xl/playoff:grid-cols-4',
              )}
            >
              {cat.groups.map((group, _, arr) => {
                if (group.table === undefined)
                  return (
                    <div
                      key={group.group}
                      data-groupid={group.group}
                      data-twogroups={
                        arr.length === 2 ? true : false
                      }
                      className={cn(
                        'mb-2 @2xl/playoff:mb-6',
                        'data-[groupid=S1]:@2xl/playoff:col-start-2 data-[groupid=S2]:@2xl/playoff:col-start-4',
                        'data-[twogroups=true]:data-[groupid=Q1]:@2xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=Q2]:@2xl/playoff:col-start-4',
                        'data-[twogroups=false]:data-[groupid=Q1]:@2xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=Q2]:@2xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=Q3]:@2xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=Q4]:@2xl/playoff:col-start-4',
                        'data-[twogroups=true]:data-[groupid=E1]:@2xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=E2]:@2xl/playoff:col-start-4',
                        'data-[twogroups=false]:data-[groupid=E1]:@2xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=E2]:@2xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=E3]:@2xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=E4]:@2xl/playoff:col-start-4',
                      )}
                    >
                      <NilComponent group={group.group} />
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
                      'data-[groupid=S1]:@2xl/playoff:col-start-2 data-[groupid=S2]:@2xl/playoff:col-start-4',
                      'data-[twogroups=true]:data-[groupid=Q1]:@2xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=Q2]:@2xl/playoff:col-start-4',
                      'data-[twogroups=false]:data-[groupid=Q1]:@2xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=Q2]:@2xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=Q3]:@2xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=Q4]:@2xl/playoff:col-start-4',
                      'data-[twogroups=true]:data-[groupid=E1]:@2xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=E2]:@2xl/playoff:col-start-4',
                      'data-[twogroups=false]:data-[groupid=E1]:@2xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=E2]:@2xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=E3]:@2xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=E4]:@2xl/playoff:col-start-4',
                    )}
                  >
                    <DefaultComponent group={group.table} />
                  </div>
                )
              })}
            </div>
          )
        })}

        {data.playoffSeason.playoffAsSeries ? (
          <PlayoffAsSeriesTables />
        ) : null}
      </div>
    </div>
  )
}

export default SeasonPlayoffTables
