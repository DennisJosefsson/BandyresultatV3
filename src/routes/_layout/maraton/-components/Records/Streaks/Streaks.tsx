import { Datum } from '@/components/Common/Date'
import StreaksSkeleton from '@/components/Loading/Skeletons/StreaksSkeleton'
import { Await, getRouteApi } from '@tanstack/react-router'
import { H1, H3 } from '../Headers'
import StreakCard from './StreakCard'

const route = getRouteApi(
  '/_layout/maraton/records/streaks',
)

const Streaks = () => {
  const promiseData = route.useLoaderData({
    select: (s) => s.data,
  })
  return (
    <Await
      promise={promiseData}
      fallback={<StreaksSkeleton />}
    >
      {(data) => {
        if (!data) return null
        const streaks = data.streaks
        return (
          <div className="flex flex-col gap-2">
            <H1>Rekordsviter</H1>
            <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 2xl:gap-10">
              <StreakCard
                streak={streaks.unbeatenStreak}
                title="Matcher i rad utan förlust"
              />
              <StreakCard
                streak={streaks.winStreak}
                title="Matcher i rad med vinst"
              />
              <StreakCard
                streak={streaks.drawStreak}
                title="Matcher i rad med oavgjort"
              />
              <StreakCard
                streak={streaks.losingStreak}
                title="Matcher i rad med förlust"
              />
              <StreakCard
                streak={streaks.noWinStreak}
                title="Matcher i rad utan seger"
              />

              <div>
                <H3>Inofficiella Svenska Mästare</H3>
                <div className="mb-2 @3xl:mb-4 max-w-65 @xs:max-w-70 @2xl:max-w-90 @7xl:max-w-105  border shadow-xs md:shadow-sm">
                  {streaks.currInoffChamps.games.map(
                    (team, index) => {
                      return (
                        <div
                          className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6 flex w-full flex-row items-center justify-between p-1 md:p-2 border-b border-accent last:border-none"
                          key={`${team.team.name}-${Math.random()}`}
                        >
                          <span className="mr-2 @lg:mr-4 w-4 @sm:w-6 @lg:w-8 text-right text-sm @xs:text-base font-bold tabular-nums @md:text-2xl">
                            {index + 1}
                          </span>
                          <div className="mr-2 @sm:mr-4 flex grow flex-col">
                            <div className="flex flex-row justify-between">
                              <span className="truncate font-semibold">
                                {team.team.name}
                              </span>
                              <span className="text-right">
                                {team.result}
                              </span>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                              <div>
                                <span>
                                  <Datum>{team.date}</Datum>
                                </span>
                              </div>

                              <span className="text-right">
                                {team.opponent.shortName}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    },
                  )}
                </div>
                <div>
                  <p className="p-1 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
                    Totalt {streaks.currInoffChamps.count}{' '}
                    <a
                      href="https://sv.wikipedia.org/wiki/Inofficiella_v%C3%A4rldsm%C3%A4sterskapet_i_fotboll"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      &quot;mästare&quot;
                    </a>{' '}
                    sedan finalen 2000.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </Await>
  )
}

export default Streaks
