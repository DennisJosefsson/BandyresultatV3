import { db } from '@/db'
import CompareRequestError from '@/lib/middlewares/errors/CompareRequestError'
import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
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
import { parseCompareRequest } from './utils/parseCompareRequest'

export const compareTeams = createServerFn({ method: 'POST' })
  .inputValidator(async (data: unknown) => {
    const { women } = zd
      .object({ women: zd.boolean().catch(false) })
      .parse(data)
    const season = await db.query.seasons.findFirst({
      where: (seasons, { eq }) => eq(seasons.women, women),
      orderBy: (seasons, { desc }) => desc(seasons.seasonId),
    })
    const parsedData = parseCompareRequest(data, season)
    if (!parsedData.success) {
      const errorStrings = parsedData.error.issues
        .map((error) => error.message)
        .join(', ')
      // const pretty = zd.prettifyError(parsedData.error)
      throw new CompareRequestError({ message: errorStrings })
    }
    return parsedData.data
  })
  .middleware([errorMiddleware])
  .handler(async ({ data }) => {
    const { startSeason, endSeason, teamArray, categoryArray } = await data

    const seasonNames = await db.query.seasons.findMany({
      where: (seasons, { inArray }) =>
        inArray(seasons.seasonId, [startSeason, endSeason]),
    })

    const compareTeams = await db.query.teams.findMany({
      where: (teams, { inArray }) => inArray(teams.teamId, teamArray),
    })

    const catTables = await getCatTables({
      teamArray,
      categoryArray,
      startSeason,
      endSeason,
    })

    if (!getCatTables || getCatTables.length === 0) {
      throw notFound()
    }

    const categoryData = compareSortLevelFunction(catTables)

    const allData = await getAllGamesTables({
      teamArray,
      categoryArray,
      startSeason,
      endSeason,
    })

    const gameCount = allData.length

    const sortedData = compareAllTeamData(allData)

    const golds = await getGolds(teamArray)

    const playoffs = await getPlayoffs(teamArray)

    const allPlayoffs = await getAllPlayoffs(teamArray)

    const firstDivisionSeasonsSince1931 =
      await getFirstDivisionSeasonsSince1931(teamArray)

    const allDbSeasons = await getAllDbSeasons(teamArray)

    const firstDivisionSeasons = await getFirstDivisionSeasons(teamArray)

    const { firstGames, latestGames } = await getFirstAndLastGames(teamArray)

    const latestHomeWin = await getLatestHomeWin(teamArray)
    const latestAwayWin = await getLatestAwayWin(teamArray)

    const compareHeaderText = getCompareHeaderText({
      seasonNames,
      teams: compareTeams,
      gameCount,
      categoryArray,
    })

    return {
      seasonNames,
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
    }
  })
