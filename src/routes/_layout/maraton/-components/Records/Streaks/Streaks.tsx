import { Datum } from '@/components/Common/Date'
import { getRouteApi } from '@tanstack/react-router'
import { H1, H3 } from '../Headers'
import StreakCard from './StreakCard'

const route = getRouteApi(
  '/_layout/maraton/records/streaks',
)

const Streaks = () => {
  const data = route.useLoaderData({
    select: (s) => s.streaks,
  })
  return (
    <div className="flex flex-col gap-2">
      <H1>Rekordsviter</H1>
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 2xl:gap-10">
        <StreakCard
          streak={data.unbeatenStreak}
          title="Matcher i rad utan förlust"
        />
        <StreakCard
          streak={data.winStreak}
          title="Matcher i rad med vinst"
        />
        <StreakCard
          streak={data.drawStreak}
          title="Matcher i rad med oavgjort"
        />
        <StreakCard
          streak={data.losingStreak}
          title="Matcher i rad med förlust"
        />
        <StreakCard
          streak={data.noWinStreak}
          title="Matcher i rad utan seger"
        />

        <div>
          <H3>Inofficiella Svenska Mästare</H3>
          <div className="mb-2 max-w-105 border shadow-xs md:shadow-sm">
            {data.currInoffChamps.games.map(
              (team, index) => {
                return (
                  <div
                    className="mb-1 flex max-w-100 flex-row items-center justify-between p-1 text-[8px] msm:text-[10px] md:mb-2 md:p-2 md:text-sm"
                    key={`${team.team.name}-${Math.random()}`}
                  >
                    <span className="mr-2 msm:mr-4 w-6 msm:w-8 text-right text-base font-bold tabular-nums md:text-2xl">
                      {index + 1}
                    </span>
                    <div className="mr-4 flex grow flex-col">
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
                          <span className="w-48 sm:w-64">
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
            <p className="w-73 p-1 text-xs font-bold md:w-88">
              Totalt {data.currInoffChamps.count}{' '}
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
}

export default Streaks
