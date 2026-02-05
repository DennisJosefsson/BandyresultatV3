import { db } from '@/db'
import { games, teams, teamseries } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { generatedGameObject } from '@/lib/types/game'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq, SQL } from 'drizzle-orm'

type GameObject = zd.infer<typeof generatedGameObject>

export const generateSchedule = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ serieId: zd.number().int().positive() })),
  )
  .handler(async ({ data: { serieId } }) => {
    try {
      const serie = await db.query.series.findFirst({
        where: (series, { eq }) => eq(series.serieId, serieId),
        with: {
          season: {
            columns: { women: true },
          },
        },
      })

      if (!serie) throw new Error('Serien finns inte.')

      const playoff = ['eight', 'quarter', 'semi', 'final'].includes(
        serie.category,
      )

      const teamArray = await db
        .select({
          teamId: teamseries.teamId,
          name: teams.name as unknown as SQL<string>,
        })
        .from(teamseries)
        .leftJoin(teams, eq(teams.teamId, teamseries.teamId))
        .where(eq(teamseries.serieId, serieId))

      const currentGames = await db
        .select()
        .from(games)
        .where(eq(games.serieId, serieId))

      const gameArray: GameObject[] = []

      teamArray.forEach((home, _, arr) => {
        arr.forEach((away) => {
          if (home.teamId === away.teamId) return

          if (
            currentGames.some(
              (g) =>
                g.homeTeamId === home.teamId && g.awayTeamId === away.teamId,
            )
          )
            return

          const gameItem: GameObject = {
            homeName: home.name,
            awayName: away.name,
            homeTeamId: home.teamId,
            awayTeamId: away.teamId,
            serieId: serie.serieId,
            seasonId: serie.seasonId,
            group: serie.group,
            category: serie.category,
            women: serie.season.women ?? false,
            played: false,
            playoff,
            date: '',
          }
          gameArray.push(gameItem)
        })
      })

      return {
        status: 200,
        games: playoff ? [...gameArray, ...gameArray, ...gameArray] : gameArray,
      }
    } catch (error) {
      catchError(error)
    }
  })
