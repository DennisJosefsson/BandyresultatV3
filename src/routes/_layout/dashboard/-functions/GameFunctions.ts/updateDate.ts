import { db } from '@/db'
import { games, teamgames } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'
import { parseUpdateDate } from '../dataParsers/parseUpdateDate'

export const updateDate = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(parseUpdateDate))
  .handler(async ({ data }) => {
    try {
      const updatedGame = await db
        .update(games)
        .set({
          date: data.date,
        })
        .where(eq(games.gameId, data.gameId))
        .returning({ gameId: games.gameId })

      if (updatedGame.length === 0) {
        return { status: 404, message: 'Match saknas' }
      }

      const updatedHomeTeamGame = await db
        .update(teamgames)
        .set({
          date: data.date,
        })
        .where(eq(teamgames.teamGameId, data.homeTeamGameId))
        .returning()

      const updatedAwayTeamGame = await db
        .update(teamgames)
        .set({
          date: data.date,
        })
        .where(eq(teamgames.teamGameId, data.awayTeamGameId))
        .returning()

      if (
        updatedHomeTeamGame.length === 0 ||
        updatedAwayTeamGame.length === 0
      ) {
        return { status: 404, message: 'Teamgames saknas.' }
      }

      return { status: 200, message: `Matchdatum ändrat till ${data.date}` }
    } catch (error) {
      catchError(error)
    }
  })
