import { getRouteApi } from '@tanstack/react-router'

import StreakComponent from './StreakComponent'

const route = getRouteApi('/_layout/teams/$teamId')

const Streaks = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2">
      {data.streaks.unbeatenStreak.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Obesegrade
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.streaks.unbeatenStreak}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}

      {data.streaks.winStreak.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Vinster i rad
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.streaks.winStreak}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}

      {data.streaks.drawStreak.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Oavgjorda
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.streaks.drawStreak}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}

      {data.streaks.losingStreak.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Förluster
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.streaks.losingStreak}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}

      {data.streaks.noWinStreak.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Matcher i rad utan vinst
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.streaks.noWinStreak}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}
    </div>
  )
}

export default Streaks
