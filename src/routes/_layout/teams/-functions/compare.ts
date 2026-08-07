import { db } from '@/db'
import { catchError } from '@/lib/middlewares/errors/catchError'
import CompareRequestError from '@/lib/middlewares/errors/CompareRequestError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type {
  CompareBaseTable,
  CompareCategoryData,
  CompareGameStat,
  CompareLatestWinStats,
  CompareSeasonStat,
} from '@/lib/types/compare'
import type { Meta } from '@/lib/types/meta'
import type { Team } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { ZodError } from 'zod'
import {
  getAllGamesTables,
  getCatTables,
  getCompareStats,
} from './utils/compareQueries'
import { compareSortDivisionFunction } from './utils/compareSortFunctions'
import getCompareHeaderText from './utils/getCompareHeaderText'

type CompareReturn =
  | {
      status: 404
      meta: Meta
      breadCrumb: string
      message: string
      teamArray?: Array<number>
    }
  | {
      status: 400
      meta: Meta
      breadCrumb: string
      message: string
      teamArray?: Array<number>
    }
  | {
      status: 200
      meta: Meta
      breadCrumb: string
      homeTeam: Team
      awayTeam: Team
      categoryData: CompareCategoryData
      allData: Array<CompareBaseTable>
      gameCount: number
      golds: Array<CompareSeasonStat>
      playoffs: Array<CompareSeasonStat>
      allPlayoffs: Array<CompareSeasonStat>
      firstDivisionSeasonsSince1931: Array<CompareSeasonStat>
      firstDivisionSeasons: Array<CompareSeasonStat>
      firstGames: Array<CompareGameStat>
      latestGames: Array<CompareGameStat>
      latestHomeWin: Array<CompareLatestWinStats>
      latestAwayWin: Array<CompareLatestWinStats>
      compareHeaderText: string
    }
  | undefined

export const getCompareTeams = createServerFn({
  method: 'POST',
})
  .validator(
    zd.object({
      teamArray: zd
        .array(zd.number().int().positive())
        .optional(),

      women: zd.boolean(),
    }),
  )
  .middleware([errorMiddleware])
  .handler(async ({ data }): Promise<CompareReturn> => {
    try {
      const { teamArray, women } = data

      const array = zd
        .array(
          zd
            .int('Lag-id måste vara heltal.')
            .positive(
              'Lag-id ska vara ett positivt nummer.',
            )
            .max(10000, 'Lag-id för stort.'),
          'Fel antal lag, exakt två lag ska vara valda.',
        )
        .length(
          2,
          'Fel antal lag, exakt två lag ska vara valda.',
        )
        .parse(teamArray)

      const compareHomeTeam =
        await db.query.teams.findFirst({
          where: (teams, { and, eq, ne }) =>
            and(
              eq(teams.teamId, array[0]),
              ne(teams.teamId, 176),
            ),
        })

      if (!compareHomeTeam) {
        const item = array.at(-1)
        const newTeamArray =
          item === undefined ? [] : [item]
        throw new CompareRequestError({
          message: 'Hemmalaget finns inte i databasen.',
          code: 404,
          teamArray: newTeamArray,
        })
      }

      const compareAwayTeam =
        await db.query.teams.findFirst({
          where: (teams, { and, eq, ne }) =>
            and(
              eq(teams.teamId, array[1]),
              ne(teams.teamId, 176),
            ),
        })

      if (!compareAwayTeam) {
        const item = array.at(0)
        const newTeamArray =
          item === undefined ? [] : [item]
        throw new CompareRequestError({
          message: 'Bortalaget finns inte i databasen.',
          code: 404,
          teamArray: newTeamArray,
        })
      }

      const catTables = await getCatTables({
        homeTeamId: compareHomeTeam.teamId,
        awayTeamId: compareAwayTeam.teamId,
      })

      if (catTables.length === 0) {
        const teamStrings = `${compareHomeTeam.name} och ${compareAwayTeam.name}`
        const breadCrumb = `H2H: ${compareHomeTeam.name} - ${compareAwayTeam.name}`

        const message = `${teamStrings} har inga spelade matcher mot varandra i databasen.`
        const url = `https://bandyresultat.se/teams/compare?women=${women}&teamArray=[$${compareHomeTeam.teamId},${compareAwayTeam.teamId}]`

        throw new CompareRequestError({
          message: message,
          code: 404,
          url,
          breadCrumb,
          teamArray,
        })
      }

      const categoryData =
        compareSortDivisionFunction(catTables)

      const allData = await getAllGamesTables({
        homeTeamId: compareHomeTeam.teamId,
        awayTeamId: compareAwayTeam.teamId,
      })

      const gameCount = allData.length

      const stats = await getCompareStats([
        compareHomeTeam.teamId,
        compareAwayTeam.teamId,
      ])

      const breadCrumb = `H2H:  ${compareHomeTeam.name} - ${compareAwayTeam.name}`
      const title = `Bandyresultat - ${breadCrumb}`
      const description = `Möten mellan $${compareHomeTeam.name} och ${compareAwayTeam.name}`
      const url = `https://bandyresultat.se/teams/compare?women=${women}&teamArray=[$${compareHomeTeam.teamId},${compareAwayTeam.teamId}]`

      const compareHeaderText = getCompareHeaderText({
        homeTeam: compareHomeTeam,
        awayTeam: compareAwayTeam,
        gameCount,
      })

      return {
        homeTeam: compareHomeTeam,
        awayTeam: compareAwayTeam,
        categoryData,
        allData,
        gameCount,
        ...stats,
        compareHeaderText,
        breadCrumb,
        meta: { description, url, title },
        status: 200,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const breadCrumb = `H2H`
        const title = `Bandyresultat - ${breadCrumb}`
        const description = ``
        const url = `https://bandyresultat.se/teams?women=${data.women}`
        const errorString = error.issues
          .map((issue) => issue.message)
          .join(',')
        return {
          message: errorString,
          breadCrumb,
          meta: { title, description, url },
          status: 400,
          teamArray: undefined,
        }
      } else if (error instanceof CompareRequestError) {
        const breadCrumb = error.breadCrumb ?? `H2H`
        const title = `Bandyresultat - ${breadCrumb}`
        const description = error.message
        const teamArray = error.teamArray
        const url =
          error.url ??
          `https://bandyresultat.se/teams?women=${data.women}`
        const errorString = error.message
        const status = error.statusCode
        return {
          message: errorString,
          breadCrumb,
          meta: { title, description, url },
          status,
          teamArray,
        }
      }
      {
        catchError(error)
      }
    }
  })
