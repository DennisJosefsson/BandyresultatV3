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
    <div className="m-0 mt-4 w-full lg:justify-self-center">
      <div className="grid gap-2 sm:gap-4">
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
                'data-[category=semi]:lg:grid-cols-5',
                'data-[category=quarter]:sm:gap-4 data-[category=quarter]:data-[twogroups=true]:sm:gap-4 lg:grid-cols-5',
                'data-[category=quarter]:data-[twogroups=false]:lg:grid-cols-4',
                'data-[category=eight]:sm:gap-4 data-[category=eight]:data-[twogroups=true]:sm:gap-4 lg:grid-cols-5',
                'data-[category=eight]:data-[twogroups=false]:lg:grid-cols-4',
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
                        'mb-2 lg:mb-6',
                        'data-[groupid=S1]:lg:col-start-2 data-[groupid=S2]:lg:col-start-4',
                        'data-[twogroups=true]:data-[groupid=Q1]:lg:col-start-2 data-[twogroups=true]:data-[groupid=Q2]:lg:col-start-4',
                        'data-[twogroups=false]:data-[groupid=Q1]:lg:col-start-1 data-[twogroups=false]:data-[groupid=Q2]:lg:col-start-2 data-[twogroups=false]:data-[groupid=Q3]:lg:col-start-3 data-[twogroups=false]:data-[groupid=Q4]:lg:col-start-4',
                        'data-[twogroups=true]:data-[groupid=E1]:lg:col-start-2 data-[twogroups=true]:data-[groupid=E2]:lg:col-start-4',
                        'data-[twogroups=false]:data-[groupid=E1]:lg:col-start-1 data-[twogroups=false]:data-[groupid=E2]:lg:col-start-2 data-[twogroups=false]:data-[groupid=E3]:lg:col-start-3 data-[twogroups=false]:data-[groupid=E4]:lg:col-start-4',
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
                      'data-[groupid=S1]:lg:col-start-2 data-[groupid=S2]:lg:col-start-4',
                      'data-[twogroups=true]:data-[groupid=Q1]:lg:col-start-2 data-[twogroups=true]:data-[groupid=Q2]:lg:col-start-4',
                      'data-[twogroups=false]:data-[groupid=Q1]:lg:col-start-1 data-[twogroups=false]:data-[groupid=Q2]:lg:col-start-2 data-[twogroups=false]:data-[groupid=Q3]:lg:col-start-3 data-[twogroups=false]:data-[groupid=Q4]:lg:col-start-4',
                      'data-[twogroups=true]:data-[groupid=E1]:lg:col-start-2 data-[twogroups=true]:data-[groupid=E2]:lg:col-start-4',
                      'data-[twogroups=false]:data-[groupid=E1]:lg:col-start-1 data-[twogroups=false]:data-[groupid=E2]:lg:col-start-2 data-[twogroups=false]:data-[groupid=E3]:lg:col-start-3 data-[twogroups=false]:data-[groupid=E4]:lg:col-start-4',
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
