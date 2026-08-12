import type { Game, GameGroupBase } from '@/lib/types/game'
import { GamesCard } from '../shared/games/GameCard'
type GameListProps = {
  group: GameGroupBase<Array<Omit<Game, 'season'>>>
  title: string
  teams: Array<number> | undefined
}

const GamesList = ({
  group,
  title,
  teams,
}: GameListProps) => {
  if (group.dates.length === 0) return null
  return (
    <div className="font-inter mb-6 w-full">
      <h1 className="text-primary text-xs font-semibold tracking-wider @md/games:text-sm @xl/games:text-base">
        {title}
      </h1>

      <div>
        {group.comment && (
          <p className="bg-background my-2 max-w-xl p-1 text-[10px] font-bold @3xl/games:text-xs @5xl/games:text-sm">
            {group.comment}
          </p>
        )}
        <div>
          {group.dates.map((date) => {
            const games = date.games.filter((g) => {
              if (!teams || teams.length === 0) return true
              if (teams.length === 1) {
                if (
                  teams.includes(g.homeTeamId) ||
                  teams.includes(g.awayTeamId)
                )
                  return true
              } else if (teams.length > 1) {
                if (
                  teams.includes(g.homeTeamId) &&
                  teams.includes(g.awayTeamId)
                )
                  return true
                return false
              } else return false
            })

            if (games.length === 0) return null

            return (
              <div key={date.date}>
                {games.map((game) => (
                  <GamesCard
                    key={`${game.homeTeamId}-${game.awayTeamId}-${date.date}`}
                    game={game}
                    serieName={group.name}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GamesList
