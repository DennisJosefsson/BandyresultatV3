import { db } from '@/db'
import { teamlogos, teamnames, teams } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import CompareRequestError from '@/lib/middlewares/errors/CompareRequestError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type {
  CompareBaseTable,
  CompareCategoryData,
  CompareStatsV2,
} from '@/lib/types/compare'
import type {
  CompareGamesBase,
  CompareGamesWithAge,
} from '@/lib/types/game'
import type {
  CompareTeam,
  TeamBaseWithLogo,
} from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import { and, eq, getTableColumns, ne } from 'drizzle-orm'
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
      message: string
      teamArray?: Array<number>
    }
  | {
      status: 400
      message: string
      teamArray?: Array<number>
    }
  | {
      status: 200
      homeTeam: CompareTeam
      awayTeam: CompareTeam
      categoryData: CompareCategoryData
      allData: Array<CompareBaseTable>
      gameCount: number
      stats: Array<CompareStatsV2>
      firstGames: Array<CompareGamesBase>
      latestGames: Array<CompareGamesBase>
      latestHomeWin: Array<CompareGamesWithAge>
      latestAwayWin: Array<CompareGamesWithAge>
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

      const compareHomeTeam = await db
        .select({
          ...getTableColumns(teams),
          team: {
            teamId: teams.teamId,
            name: teamnames.name,
            shortName: teamnames.shortName,
            casualName: teamnames.casualName,
            logo: {
              logoId: teamlogos.logoId,
              hasDark: teamlogos.hasDark,
            },
          } as unknown as SQL<TeamBaseWithLogo>,
        })
        .from(teams)
        .leftJoin(
          teamnames,
          eq(teamnames.teamnameId, teams.teamnameId),
        )
        .leftJoin(
          teamlogos,
          eq(teamnames.logoId, teamlogos.logoId),
        )
        .where(
          and(
            eq(teams.teamId, array[0]),
            ne(teams.teamId, 176),
          ),
        )
        .then((res) => res[0])

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

      const compareAwayTeam = await db
        .select({
          ...getTableColumns(teams),
          team: {
            teamId: teams.teamId,
            name: teamnames.name,
            shortName: teamnames.shortName,
            casualName: teamnames.casualName,
            logo: {
              logoId: teamlogos.logoId,
              hasDark: teamlogos.hasDark,
            },
          } as unknown as SQL<TeamBaseWithLogo>,
        })
        .from(teams)
        .leftJoin(
          teamnames,
          eq(teamnames.teamnameId, teams.teamnameId),
        )
        .leftJoin(
          teamlogos,
          eq(teamnames.logoId, teamlogos.logoId),
        )
        .where(
          and(
            eq(teams.teamId, array[1]),
            ne(teams.teamId, 176),
          ),
        )
        .then((res) => res[0])

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
        const teamStrings = `${compareHomeTeam.team.name} och ${compareAwayTeam.team.name}`
        const breadCrumb = `H2H: ${compareHomeTeam.team.name} - ${compareAwayTeam.team.name}`

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

      const statsData = await getCompareStats([
        compareHomeTeam.teamId,
        compareAwayTeam.teamId,
      ])

      const statsObject = statsData.stats.map((s) => {
        const team =
          compareHomeTeam.teamId === s.teamId
            ? {
                ...compareHomeTeam.team,
                teamId: s.teamId,
              }
            : {
                ...compareAwayTeam.team,
                teamId: s.teamId,
              }
        return { ...s, team }
      })

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
        stats: statsObject,
        latestGames: statsData.latestGames,
        firstGames: statsData.firstGames,
        latestHomeWin: statsData.latestHomeWin,
        latestAwayWin: statsData.latestAwayWin,
        compareHeaderText,
        status: 200,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errorString = error.issues
          .map((issue) => issue.message)
          .join(',')
        return {
          message: errorString,
          status: 400,
          teamArray: undefined,
        }
      } else if (error instanceof CompareRequestError) {
        const teamArray = error.teamArray
        const errorString = error.message
        const status = error.statusCode
        return {
          message: errorString,
          status,
          teamArray,
        }
      }
      {
        catchError(error)
      }
    }
  })
