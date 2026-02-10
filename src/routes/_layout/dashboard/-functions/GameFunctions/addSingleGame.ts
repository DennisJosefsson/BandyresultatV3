import { db } from '@/db'
import { games, teamgames } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { parseNewGameWithResult } from '../dataParsers/parseGameResults'

export const addSingleGame = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(parseNewGameWithResult))
  .handler(async ({ data }) => {
    try {
      const { homeTeamTeamGame, awayTeamTeamGame, ...rest } = data
      const newGame = await db
        .insert(games)
        .values(rest)
        .returning({ gameId: games.gameId })
        .then((res) => res[0])

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

      const homeTeamNewCurrChamp =
        data.homeTeamTeamGame.win && currInoffChamp === data.awayTeamId
          ? true
          : false

      const homeTeamGame = {
        gameId: newGame.gameId,
        currInoffChamp: homeTeamNewCurrChamp,
        group: data.group,
        category: data.category,
        serieId: data.serieId,
        seasonId: data.seasonId,
        women: data.women,
        teamId: data.homeTeamId,
        opponentId: data.awayTeamId,
        ...data.homeTeamTeamGame,
      }
      await db.insert(teamgames).values([homeTeamGame])

      const awayTeamNewCurrChamp =
        data.awayTeamTeamGame.win && currInoffChamp === data.homeTeamId
          ? true
          : false

      const awayTeamGame = {
        gameId: newGame.gameId,
        currInoffChamp: awayTeamNewCurrChamp,
        group: data.group,
        category: data.category,
        serieId: data.serieId,
        seasonId: data.seasonId,
        women: data.women,
        teamId: data.awayTeamId,
        opponentId: data.homeTeamId,
        ...data.awayTeamTeamGame,
      }
      await db.insert(teamgames).values([awayTeamGame])

      return { status: 200, message: 'Ny match inlagd.' }
    } catch (error) {
      catchError(error)
    }
  })
