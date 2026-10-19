import { db } from '@/db'
import { games, teamgames } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { parseGameResult } from '../dataParsers/parseGameResults'

export const updateResult = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(parseGameResult)
  .handler(async ({ data }) => {
    try {
      const currChamp = await db.query.teamgames.findFirst({
        where: (teamgamesSchema, { and, eq: equal }) =>
          and(
            equal(teamgamesSchema.currInoffChamp, true),
            equal(teamgamesSchema.women, data.game.women),
          ),
        orderBy: (teamgamesSchema, { desc }) =>
          desc(teamgamesSchema.date),
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
          result: data.game.result,
          otResult: data.game.otResult,
          halftimeResult: data.game.halftimeResult,
          homeGoal: data.game.homeGoal,
          awayGoal: data.game.awayGoal,
          halftimeHomeGoal: data.game.halftimeHomeGoal,
          halftimeAwayGoal: data.game.halftimeAwayGoal,
          date: data.game.date,
          played: true,
          penalties: data.game.penalties,
          extraTime: data.game.extraTime,
          neutral: data.game.neutral,
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
            data.homeTeamTeamGame.win &&
            currInoffChamp === data.awayTeamId
              ? true
              : false,
        })
        .where(
          eq(teamgames.teamGameId, data.homeTeamGameId),
        )
        .returning()

      const updatedAwayTeamGame = await db
        .update(teamgames)
        .set({
          ...data.awayTeamTeamGame,
          currInoffChamp:
            data.awayTeamTeamGame.win &&
            currInoffChamp === data.homeTeamId
              ? true
              : false,
        })
        .where(
          eq(teamgames.teamGameId, data.awayTeamGameId),
        )
        .returning()

      if (
        updatedHomeTeamGame.length === 0 ||
        updatedAwayTeamGame.length === 0
      ) {
        return { status: 404, message: 'Teamgames saknas.' }
      }

      return {
        status: 200,
        message: `Resultat ändrat till ${data.game.result}.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
