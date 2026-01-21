import Date from '@/components/Common/Date'
import { useLoaderData } from '@tanstack/react-router'
import StreakCard from './StreakCard'

const Streaks = () => {
  const data = useLoaderData({ from: '/_layout/maraton/records/streaks' })
  return (
    <div>
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 xl:grid-cols-3">
        <StreakCard
          streak={data.unbeatenStreak}
          title="Matcher i rad utan förlust"
        />
        <StreakCard streak={data.winStreak} title="Matcher i rad med vinst" />
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

        <div className="p-2">
          <h3 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
            Inofficiella Svenska Mästare
          </h3>
          <div>
            {data.currInoffChamps.games.map((team, index) => {
              return (
                <div
                  className="mb-1 flex max-w-100 flex-row items-center justify-between p-1 text-[10px] md:mb-2 md:p-2 md:text-sm"
                  key={`${team.team.name}-${Math.random()}`}
                >
                  <span className="mr-4 w-8 text-right text-base font-bold tabular-nums md:text-2xl">
                    {index + 1}
                  </span>
                  <div className="mr-4 flex grow flex-col">
                    <div className="flex flex-row justify-between">
                      <span className="truncate font-semibold">
                        {team.team.name}
                      </span>
                      <span className="text-right">{team.result}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between text-[10px] md:text-xs">
                      <div>
                        <span className="w-48 sm:w-64">
                          <Date>{team.date}</Date>
                        </span>
                      </div>

                      <span className="text-right">
                        {team.opponent.shortName}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div>
            <p className="w-[292px] p-1 text-xs font-bold md:w-88">
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
