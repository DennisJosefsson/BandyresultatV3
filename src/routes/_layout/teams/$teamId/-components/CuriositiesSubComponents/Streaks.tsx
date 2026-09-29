import { getRouteApi } from '@tanstack/react-router'
import StreakComponent from './StreakComponent'

const route = getRouteApi('/_layout/teams/$teamId/stats/')

const Streaks = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4 justify-start h-fit">
      {data.stats.playoffStreak &&
      data.stats.playoffStreak.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Slutspel i rad
          </StreakComponent.Title>
          <StreakComponent.PlayoffContent
            streak={data.stats.playoffStreak}
          ></StreakComponent.PlayoffContent>
        </StreakComponent>
      ) : null}
      {data.stats.unbeatenStreak &&
      data.stats.unbeatenStreak.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Obesegrade matcher
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.stats.unbeatenStreak}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}

      {data.stats.winStreak &&
      data.stats.winStreak.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Vinster i rad
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.stats.winStreak}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}

      {data.stats.drawStreaks &&
      data.stats.drawStreaks.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Oavgjorda matcher i rad
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.stats.drawStreaks}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}

      {data.stats.losingStreak &&
      data.stats.losingStreak.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Förlustmatcher i rad
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.stats.losingStreak}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}

      {data.stats.noWinStreaks &&
      data.stats.noWinStreaks.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Matcher i rad utan vinst
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.stats.noWinStreaks}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}
    </div>
  )
}

export default Streaks
