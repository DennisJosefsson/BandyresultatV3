import { db } from '@/db'
import { games, teamgames } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { generatedGameObjectArray } from '@/lib/types/game'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'

type TeamGame = typeof teamgames.$inferInsert

export const insertFromGeneratedSchedule = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(generatedGameObjectArray))
  .middleware([errorMiddleware])
  .handler(async ({ data: { gameArray } }) => {
    try {
      const newTeamGames: TeamGame[] = []

      await db
        .insert(games)
        .values(gameArray)
        .returning()
        .then((res) => {
          res.forEach((game) => {
            const homeTeamGame = {
              gameId: game.gameId,
              teamId: game.homeTeamId,
              opponentId: game.awayTeamId,
              seasonId: game.seasonId,
              group: game.group,
              category: game.category,
              date: game.date,
              women: game.women,
              serieId: game.serieId,
              played: game.played,
              playoff: game.playoff,
              homeGame: true,
            } satisfies TeamGame

            newTeamGames.push(homeTeamGame)

            const awayTeamGame = {
              gameId: game.gameId,
              teamId: game.awayTeamId,
              opponentId: game.homeTeamId,
              seasonId: game.seasonId,
              group: game.group,
              category: game.category,
              date: game.date,
              women: game.women,
              serieId: game.serieId,
              played: game.played,
              playoff: game.playoff,
              homeGame: false,
            } satisfies TeamGame

            newTeamGames.push(awayTeamGame)
          })
        })

      await db.insert(teamgames).values(newTeamGames)

      return { status: 200, message: 'Matcher inlagda.' }
    } catch (error) {
      catchError(error)
    }
  })
