import { db } from '@/db'
import { games, teamgames } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'
import { parseGameResult } from '../dataParsers/parseGameResults'

export const updateResult = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(parseGameResult))
  .handler(async ({ data }) => {
    try {
      const currChamp = await db.query.teamgames.findFirst({
        where: (teamgames, { and, eq }) =>
          and(
            eq(teamgames.currInoffChamp, true),
            eq(teamgames.women, data.women),
          ),
        orderBy: (teamgames, { desc }) => desc(teamgames.date),
      })

      let currInoffChamp: number | null
      if (!currChamp) {
        currInoffChamp = null
      } else {
        currInoffChamp = currChamp.teamId
      }

      const updatedGame = await db
        .update(games)
        .set({
          result: data.result,
          otResult: data.otResult,
          halftimeResult: data.halftimeResult,
          homeGoal: data.homeGoal,
          awayGoal: data.awayGoal,
          halftimeHomeGoal: data.halftimeHomeGoal,
          halftimeAwayGoal: data.halftimeAwayGoal,
          date: data.date,
          played: true,
          penalties: data.penalties,
          extraTime: data.extraTime,
        })
        .where(eq(games.gameId, data.gameId))
        .returning({ gameId: games.gameId })

      if (updatedGame.length === 0) {
        return { status: 404, message: 'Match saknas' }
      }

      const updatedHomeTeamGame = await db
        .update(teamgames)
        .set({
          ...data.homeTeamTeamGame,
          currInoffChamp:
            data.homeTeamTeamGame.win && currInoffChamp === data.awayTeamId
              ? true
              : false,
        })
        .where(eq(teamgames.teamGameId, data.homeTeamGameId))
        .returning()

      const updatedAwayTeamGame = await db
        .update(teamgames)
        .set({
          ...data.awayTeamTeamGame,
          currInoffChamp:
            data.awayTeamTeamGame.win && currInoffChamp === data.homeTeamId
              ? true
              : false,
        })
        .where(eq(teamgames.teamGameId, data.awayTeamGameId))
        .returning()

      if (
        updatedHomeTeamGame.length === 0 ||
        updatedAwayTeamGame.length === 0
      ) {
        return { status: 404, message: 'Teamgames saknas.' }
      }

      return { status: 200, message: `Resultat ändrat till ${data.result}.` }
    } catch (error) {
      catchError(error)
    }
  })
