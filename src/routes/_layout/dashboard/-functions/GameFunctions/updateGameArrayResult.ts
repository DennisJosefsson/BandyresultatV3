import { db } from '@/db'
import { games, teamgames } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { parseGameResult } from '../dataParsers/parseGameResults'

export const gameEditArray = zd.object({
  gameArray: zd.array(parseGameResult),
})

type GameObject = zd.infer<typeof parseGameResult>

export const updateGameArrayResult = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(gameEditArray)
  .handler(async ({ data: { gameArray } }) => {
    try {
      const menCurrChampObject =
        await db.query.teamgames.findFirst({
          where: (teamgamesSchema, { and, eq: equal }) =>
            and(
              equal(teamgamesSchema.currInoffChamp, true),
              equal(teamgamesSchema.women, false),
            ),
          orderBy: (teamgamesSchema, { desc }) =>
            desc(teamgamesSchema.date),
        })

      const womenCurrChampObject =
        await db.query.teamgames.findFirst({
          where: (teamgamesSchema, { and, eq: equal }) =>
            and(
              equal(teamgamesSchema.currInoffChamp, true),
              equal(teamgamesSchema.women, true),
            ),
          orderBy: (teamgamesSchema, { desc }) =>
            desc(teamgamesSchema.date),
        })

      let menCurrInoffChamp: number | null
      let womenCurrInoffChamp: number | null
      if (!menCurrChampObject) {
        menCurrInoffChamp = null
      } else {
        menCurrInoffChamp = menCurrChampObject.teamId
      }

      if (!womenCurrChampObject) {
        womenCurrInoffChamp = null
      } else {
        womenCurrInoffChamp = womenCurrChampObject.teamId
      }

      const queries = gameArray.map((game) => {
        return updateGames({
          gameObject: game,
          menCurrInoffChamp,
          menCurrChampObject,
          womenCurrInoffChamp,
          womenCurrChampObject,
        })
      })

      const queryReturn = await Promise.all(queries)

      //   const updatedGame = await db
      //     .update(games)
      //     .set({
      //       result: data.result,
      //       otResult: data.otResult,
      //       halftimeResult: data.halftimeResult,
      //       homeGoal: data.homeGoal,
      //       awayGoal: data.awayGoal,
      //       halftimeHomeGoal: data.halftimeHomeGoal,
      //       halftimeAwayGoal: data.halftimeAwayGoal,
      //       date: data.date,
      //       played: true,
      //       penalties: data.penalties,
      //       extraTime: data.extraTime,
      //     })
      //     .where(eq(games.gameId, data.gameId))
      //     .returning({ gameId: games.gameId })

      //   if (updatedGame.length === 0) {
      //     return { status: 404, message: 'Match saknas' }
      //   }

      //   const updatedHomeTeamGame = await db
      //     .update(teamgames)
      //     .set({
      //       ...data.homeTeamTeamGame,
      //       currInoffChamp:
      //         data.homeTeamTeamGame.win &&
      //         currInoffChamp === data.awayTeamId
      //           ? true
      //           : false,
      //     })
      //     .where(
      //       eq(teamgames.teamGameId, data.homeTeamGameId),
      //     )
      //     .returning()

      //   const updatedAwayTeamGame = await db
      //     .update(teamgames)
      //     .set({
      //       ...data.awayTeamTeamGame,
      //       currInoffChamp:
      //         data.awayTeamTeamGame.win &&
      //         currInoffChamp === data.homeTeamId
      //           ? true
      //           : false,
      //     })
      //     .where(
      //       eq(teamgames.teamGameId, data.awayTeamGameId),
      //     )
      //     .returning()

      //   if (
      //     updatedHomeTeamGame.length === 0 ||
      //     updatedAwayTeamGame.length === 0
      //   ) {
      //     return { status: 404, message: 'Teamgames saknas.' }
      //   }

      //   return {
      //     status: 200,
      //     message: `Resultat ändrat till ${data.result}.`,
      //   }

      return {
        status: 200,
        message: `${gameArray.length} matcher inskickade, ${queryReturn.length} resultat uppdaterade.`,
      }
    } catch (error) {
      catchError(error)
    }
  })

type FunctionProps = {
  gameObject: GameObject
  menCurrInoffChamp: number | null
  menCurrChampObject:
    | typeof teamgames.$inferSelect
    | undefined
  womenCurrInoffChamp: number | null
  womenCurrChampObject:
    | typeof teamgames.$inferSelect
    | undefined
}

async function updateGames({
  gameObject,
  menCurrInoffChamp,
  menCurrChampObject,
  womenCurrInoffChamp,
  womenCurrChampObject,
}: FunctionProps) {
  const thisChamp = gameObject.women
    ? womenCurrInoffChamp
    : menCurrInoffChamp
  const thisInoffChampObject = gameObject.women
    ? womenCurrChampObject
    : menCurrChampObject

  const updatedGame = await db
    .update(games)
    .set({
      result: gameObject.result,
      otResult: gameObject.otResult,
      halftimeResult: gameObject.halftimeResult,
      homeGoal: gameObject.homeGoal,
      awayGoal: gameObject.awayGoal,
      halftimeHomeGoal: gameObject.halftimeHomeGoal,
      halftimeAwayGoal: gameObject.halftimeAwayGoal,
      date: gameObject.date,
      played: true,
      penalties: gameObject.penalties,
      extraTime: gameObject.extraTime,
    })
    .where(eq(games.gameId, gameObject.gameId))
    .returning({ gameId: games.gameId })

  if (updatedGame.length === 0) {
    throw new Error404({ message: 'Match saknas' })
  }

  const correctDate =
    thisInoffChampObject &&
    new Date(gameObject.date) >
      new Date(thisInoffChampObject.date)

  const updatedHomeTeamGame = await db
    .update(teamgames)
    .set({
      ...gameObject.homeTeamTeamGame,
      currInoffChamp:
        correctDate &&
        gameObject.homeTeamTeamGame.win &&
        thisChamp === gameObject.awayTeamId
          ? true
          : false,
    })
    .where(
      eq(teamgames.teamGameId, gameObject.homeTeamGameId),
    )
    .returning()

  if (updatedHomeTeamGame.length === 0) {
    throw new Error404({ message: 'homeTeamGame saknas' })
  }

  const updatedAwayTeamGame = await db
    .update(teamgames)
    .set({
      ...gameObject.awayTeamTeamGame,
      currInoffChamp:
        correctDate &&
        gameObject.awayTeamTeamGame.win &&
        thisChamp === gameObject.homeTeamId
          ? true
          : false,
    })
    .where(
      eq(teamgames.teamGameId, gameObject.awayTeamGameId),
    )
    .returning()

  if (updatedAwayTeamGame.length === 0) {
    throw new Error404({ message: 'awayTeamGame saknas' })
  }

  return { status: 200 }
}
