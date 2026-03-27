import { createServerFn } from '@tanstack/react-start'
import { ZodError } from 'zod'

import { db } from '@/db'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'

import type {
  CompareAllTableRow,
  CompareBaseTable,
  CompareCategoryData,
  CompareGameStat,
  CompareLatestWinStats,
  CompareSeasonStat,
} from '@/lib/types/compare'
import type { Meta } from '@/lib/types/meta'
import type { Team } from '@/lib/types/team'
import {
  getAllDbSeasons,
  getAllGamesTables,
  getAllPlayoffs,
  getCatTables,
  getFirstAndLastGames,
  getFirstDivisionSeasons,
  getFirstDivisionSeasonsSince1931,
  getGolds,
  getLatestAwayWin,
  getLatestHomeWin,
  getPlayoffs,
} from './utils/compareQueries'
import {
  compareAllTeamData,
  compareSortLevelFunction,
} from './utils/compareSortFunctions'
import getCompareHeaderText from './utils/getCompareHeaderText'

type CompareReturn =
  | {
      status: 404
      meta: Meta
      breadCrumb: string
      message: string
    }
  | {
      status: 400
      meta: Meta
      breadCrumb: string
      message: string
    }
  | {
      status: 200
      meta: Meta
      breadCrumb: string
      compareTeams: Array<Team>
      categoryData: CompareCategoryData
      allData: Array<CompareAllTableRow>
      sortedData: Array<CompareBaseTable>
      gameCount: number
      golds: Array<CompareSeasonStat>
      playoffs: Array<CompareSeasonStat>
      allPlayoffs: Array<CompareSeasonStat>
      firstDivisionSeasonsSince1931: Array<CompareSeasonStat>
      allDbSeasons: Array<CompareSeasonStat>
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
  .inputValidator(
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

      if (!teamArray) {
        const breadCrumb = `H2H`
        const title = `Bandyresultat - ${breadCrumb}`
        const description = `Lag måste väljas.`
        const url = `https://bandyresultat.se/teams?women=${data.women}`

        return {
          message: 'Lag måste väljas.',
          breadCrumb,
          meta: { title, description, url },
          status: 400,
        }
      }

      if (teamArray.length !== 2) {
        const breadCrumb = `H2H`
        const title = `Bandyresultat - ${breadCrumb}`
        const description = `Två lag ska väljas.`
        const url = `https://bandyresultat.se/teams?women=${data.women}`

        return {
          message: 'Välj två lag.',
          breadCrumb,
          meta: { title, description, url },
          status: 400,
        }
      }

      const compareTeams = await db.query.teams.findMany({
        where: (teams, { inArray }) =>
          inArray(teams.teamId, teamArray),
      })

      const catTables = await getCatTables({
        teamArray,
      })

      if (catTables.length === 0) {
        const teamStrings = compareTeams
          .map((team) => team.name)
          .join(' och ')
        const breadCrumb = `H2H`
        const title = `Bandyresultat - ${breadCrumb}`
        const description = `${teamStrings} har inga spelade matcher mot varandra i databasen.`
        const url = `https://bandyresultat.se/teams/compare?women=${women}&teamArray=[${compareTeams.map((team) => team.teamId).join(',')}]`

        return {
          message: description,
          breadCrumb,
          meta: { title, description, url },
          status: 404,
        }
      }

      const categoryData =
        compareSortLevelFunction(catTables)

      const allData = await getAllGamesTables({
        teamArray,
      })

      const gameCount = allData.length

      const sortedData = compareAllTeamData(allData)

      const golds = await getGolds(teamArray)

      const playoffs = await getPlayoffs(teamArray)

      const allPlayoffs = await getAllPlayoffs(teamArray)

      const firstDivisionSeasonsSince1931 =
        await getFirstDivisionSeasonsSince1931(teamArray)

      const allDbSeasons = await getAllDbSeasons(teamArray)

      const firstDivisionSeasons =
        await getFirstDivisionSeasons(teamArray)

      const { firstGames, latestGames } =
        await getFirstAndLastGames(teamArray)

      const latestHomeWin =
        await getLatestHomeWin(teamArray)
      const latestAwayWin =
        await getLatestAwayWin(teamArray)

      const breadCrumb = `H2H:  ${compareTeams.map((team) => team.name).join(' - ')}`
      const title = `Bandyresultat - ${breadCrumb}`
      const description = `Möten mellan ${compareTeams.map((team) => team.name).join(' och ')}`
      const url = `https://bandyresultat.se/teams/compare?women=${women}&teamArray=[${compareTeams.map((team) => team.teamId).join(',')}]`

      const compareHeaderText = getCompareHeaderText({
        teams: compareTeams,
        gameCount,
      })

      return {
        compareTeams,
        categoryData,
        allData,
        sortedData,
        gameCount,
        golds,
        playoffs,
        allPlayoffs,
        firstDivisionSeasonsSince1931,
        allDbSeasons,
        firstDivisionSeasons,
        firstGames,
        latestGames,
        latestHomeWin,
        latestAwayWin,
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
        }
      } else {
        catchError(error)
      }
    }
  })
