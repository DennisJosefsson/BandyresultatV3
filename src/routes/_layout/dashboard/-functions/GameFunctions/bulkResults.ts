import { db } from '@/db'
import { games, teamgames } from '@/db/schema'
import { mvSeriesStats } from '@/db/views/seasonStatsViews'
import { mvSeriesGames } from '@/db/views/seriesGamesViews'
import { mvSeriesTablesV2 } from '@/db/views/seriesTablesViews'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { bulkResultsArray } from '@/lib/types/game'
import { createServerFn } from '@tanstack/react-start'

type InsertTeamGame = typeof teamgames.$inferInsert

export const bulkResults = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(bulkResultsArray)
  .handler(async ({ data }) => {
    try {
      const gameArray = data.gameObjectsArray.map((g) => {
        return {
          ...g.game,
          seasonId: g.seasonId,
          serieId: g.serieId,
          homeTeamId: g.homeTeamId,
          awayTeamId: g.awayTeamId,
        }
      })

      const homeTeamGames = data.gameObjectsArray.map(
        (gob) => {
          return {
            ...gob.homeTeamTeamGame,
            seasonId: gob.seasonId,
            serieId: gob.serieId,
            women: gob.game.women,
            result: gob.game.result,
            otResult: gob.game.otResult,
          }
        },
      )

      const awayTeamGames = data.gameObjectsArray.map(
        (gob) => {
          return {
            ...gob.awayTeamTeamGame,
            seasonId: gob.seasonId,
            serieId: gob.serieId,
            women: gob.game.women,
            result: gob.game.result,
            otResult: gob.game.otResult,
          }
        },
      )

      const gameNums = await db.transaction(async (tx) => {
        const returnGameObjects = await tx
          .insert(games)
          .values(gameArray)
          .returning({
            gameId: games.gameId,
            homeTeamId: games.homeTeamId,
            awayTeamId: games.awayTeamId,
            result: games.result,
            otResult: games.otResult,
            date: games.date,
          })

        const teamGameArray: Array<InsertTeamGame> = []

        homeTeamGames.forEach((g) => {
          const gameObj = returnGameObjects.find(
            (t) =>
              t.homeTeamId === g.teamId &&
              t.awayTeamId === g.opponentId &&
              t.date === g.date &&
              t.result === g.result &&
              t.otResult === g.otResult,
          )
          if (!gameObj) {
            throw new Error(
              'Ingen gameObject som matchar homeTeamGame',
            )
          }

          teamGameArray.push({
            ...g,
            gameId: gameObj.gameId,
          })
        })

        awayTeamGames.forEach((g) => {
          const gameObj = returnGameObjects.find(
            (t) =>
              t.awayTeamId === g.teamId &&
              t.homeTeamId === g.opponentId &&
              t.date === g.date &&
              t.result === g.result &&
              t.otResult === g.otResult,
          )
          if (!gameObj) {
            throw new Error(
              'Ingen gameObject som matchar awayTeamGame',
            )
          }

          teamGameArray.push({
            ...g,
            gameId: gameObj.gameId,
          })
        })

        await tx.insert(teamgames).values(teamGameArray)

        return returnGameObjects.length
      })

      await db.transaction(async (tx) => {
        await tx
          .refreshMaterializedView(mvSeriesGames)
          .concurrently()
        await tx
          .refreshMaterializedView(mvSeriesTablesV2)
          .concurrently()
        await tx
          .refreshMaterializedView(mvSeriesStats)
          .concurrently()
      })

      return {
        status: 200,
        message: `${gameNums} nya matcher med resultat inlagda.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
