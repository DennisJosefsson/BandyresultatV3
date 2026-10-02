import { getRouteApi } from '@tanstack/react-router'
import StreakComponent from './StreakComponent'

const route = getRouteApi('/_layout/teams/$teamId/stats/')

const Streaks = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4 justify-start h-fit">
      {data.stats.playoffStreaks &&
      data.stats.playoffStreaks.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Slutspel i rad
          </StreakComponent.Title>
          <StreakComponent.PlayoffContent
            streak={data.stats.playoffStreaks}
          ></StreakComponent.PlayoffContent>
        </StreakComponent>
      ) : null}
      {data.stats.finalStreaks &&
      data.stats.finalStreaks.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Finaler i rad
          </StreakComponent.Title>
          <StreakComponent.PlayoffContent
            streak={data.stats.finalStreaks}
          ></StreakComponent.PlayoffContent>
        </StreakComponent>
      ) : null}
      {data.stats.finalWinStreaks &&
      data.stats.finalWinStreaks.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Finalvinster i rad
          </StreakComponent.Title>
          <StreakComponent.PlayoffContent
            streak={data.stats.finalWinStreaks}
          ></StreakComponent.PlayoffContent>
        </StreakComponent>
      ) : null}
      {data.stats.unbeatenStreaks &&
      data.stats.unbeatenStreaks.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Obesegrade matcher
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.stats.unbeatenStreaks}
          ></StreakComponent.Content>
        </StreakComponent>
      ) : null}

      {data.stats.winStreaks &&
      data.stats.winStreaks.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Vinster i rad
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.stats.winStreaks}
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

      {data.stats.losingStreaks &&
      data.stats.losingStreaks.length > 0 ? (
        <StreakComponent>
          <StreakComponent.Title>
            Förlustmatcher i rad
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={data.stats.losingStreaks}
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
