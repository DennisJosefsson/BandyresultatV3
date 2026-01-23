import { db } from '@/db'
import { games, seasons, teamgames, teams } from '@/db/schema'
import { clientSearchParams, SearchParamsFields } from '@/lib/types/search'
import { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import dayjs from 'dayjs'
import { and, asc, desc, eq, gte, inArray, lte, sql, SQL } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { ParsedSearchRequest, parseSearchRequest } from './parseSearchRequest'

type Data = zd.infer<typeof clientSearchParams>

export async function getSearchData({ data }: { data: Data }) {
  const home = alias(teams, 'home')
  const away = alias(teams, 'away')
  const lastSeason = await db.query.seasons.findFirst({
    columns: { year: true },
    orderBy: (seasons, { desc }) => desc(seasons.seasonId),
  })

  const parsedSearchRequest = parseSearchRequest(data, lastSeason)

  if (parsedSearchRequest.success === false) {
    const paths = parsedSearchRequest.error.issues.flatMap(
      (e) => e.path,
    ) as SearchParamsFields[]
    const errorString = parsedSearchRequest.error.issues
      .map((e) => e.message)
      .join(', ')
    return { status: 400, message: errorString, paths: paths } as const
  }

  const searchRequest = parsedSearchRequest.data

  const validatedDates = valiDate(searchRequest.inputDate)

  if (typeof validatedDates === 'object' && 'message' in validatedDates) {
    return validatedDates
  }

  const whereArray = getWhere(searchRequest, validatedDates)

  const orderArray = getOrder(searchRequest)

  const cte = db.$with('cte').as(
    db
      .select({
        gameId: teamgames.gameId,
        result: games.result,
        halftimeResult: games.halftimeResult,
        date: games.date,
        qualificationGame: teamgames.qualificationGame,
        goalsScored: teamgames.goalsScored,
        goalsConceded: teamgames.goalsConceded,
        goalDifference: teamgames.goalDifference,
        totalGoals: teamgames.totalGoals,
      })
      .from(teamgames)
      .leftJoin(games, eq(games.gameId, teamgames.gameId))
      .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
      .where(and(...whereArray))
      .orderBy(...orderArray)
      .limit(100),
  )

  const filteredtCte = db
    .$with('filtered_cte')
    .as(db.with(cte).selectDistinctOn([cte.gameId]).from(cte))

  const results = await db
    .with(filteredtCte)
    .select({
      gameId: filteredtCte.gameId,
      result: filteredtCte.result,
      halftimeResult: filteredtCte.halftimeResult,
      date: filteredtCte.date,
      qualificationGame: filteredtCte.qualificationGame,
      goalsScored: filteredtCte.goalsScored,
      goalsConceded: filteredtCte.goalsConceded,
      goalDifference: filteredtCte.goalDifference,
      totalGoals: filteredtCte.totalGoals,
      home: {
        teamId: sql`home.team_id`.mapWith(Number).as('home.team_id'),
        name: sql`home.name`.mapWith(String).as('home.name'),
        casualName: sql`home.casual_name`
          .mapWith(String)
          .as('home.casual_name'),
        shortName: sql`home.short_name`.mapWith(String).as('home.short_name'),
      } as unknown as SQL<TeamBase>,
      away: {
        teamId: sql`away.team_id`.mapWith(Number).as('away.team_id'),
        name: sql`away.name`.mapWith(String).as('away.name'),
        casualName: sql`away.casual_name`
          .mapWith(String)
          .as('away.casual_name'),
        shortName: sql`away.short_name`.mapWith(String).as('away.short_name'),
      } as unknown as SQL<TeamBase>,
    })
    .from(filteredtCte)
    .leftJoin(games, eq(games.gameId, filteredtCte.gameId))
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .orderBy(...orderArray)
    .limit(searchRequest.limit)

  if (results.length === 0) {
    return {
      status: 404,
      message: 'Hittade inga matcher som matchade sökningen.',
    } as const
  }

  return results
}

function getWhere(
  searchParams: ParsedSearchRequest,
  validatedDates: SQL<unknown>[] | undefined,
) {
  const whereArray: SQL<unknown>[] = [
    eq(teamgames.played, true),
    gte(seasons.year, searchParams.startSeason),
    lte(seasons.year, searchParams.endSeason),
    inArray(teamgames.category, searchParams.categoryArray),
  ]

  if (validatedDates) whereArray.push(...validatedDates)

  if (searchParams.teamId) {
    whereArray.push(eq(teamgames.teamId, searchParams.teamId))
  }

  if (searchParams.opponentId) {
    whereArray.push(eq(teamgames.opponentId, searchParams.opponentId))
  }

  if (searchParams.goalDiff || searchParams.goalDiff === 0) {
    if (searchParams.goalDiffOperator === 'gte') {
      whereArray.push(gte(teamgames.goalDifference, searchParams.goalDiff))
    }
    if (searchParams.goalDiffOperator === 'lte') {
      whereArray.push(lte(teamgames.goalDifference, searchParams.goalDiff))
    }

    if (searchParams.goalDiffOperator === 'eq') {
      whereArray.push(eq(teamgames.goalDifference, searchParams.goalDiff))
    }
  }

  if (searchParams.goalsScored || searchParams.goalsScored === 0) {
    if (searchParams.goalsScoredOperator === 'gte') {
      whereArray.push(gte(teamgames.goalsScored, searchParams.goalsScored))
    }
    if (searchParams.goalsScoredOperator === 'lte') {
      whereArray.push(lte(teamgames.goalsScored, searchParams.goalsScored))
    }

    if (searchParams.goalsScoredOperator === 'eq') {
      whereArray.push(eq(teamgames.goalsScored, searchParams.goalsScored))
    }
  }

  if (searchParams.goalsConceded || searchParams.goalsConceded === 0) {
    if (searchParams.goalsConcededOperator === 'gte') {
      whereArray.push(gte(teamgames.goalsConceded, searchParams.goalsConceded))
    }
    if (searchParams.goalsConcededOperator === 'lte') {
      whereArray.push(lte(teamgames.goalsConceded, searchParams.goalsConceded))
    }

    if (searchParams.goalsConcededOperator === 'eq') {
      whereArray.push(eq(teamgames.goalsConceded, searchParams.goalsConceded))
    }
  }

  if (searchParams.homeGame === 'home') {
    whereArray.push(eq(teamgames.homeGame, true))
  }

  if (searchParams.homeGame === 'away') {
    whereArray.push(eq(teamgames.homeGame, false))
  }

  if (searchParams.selectedGender === 'men' && !searchParams.teamId) {
    whereArray.push(eq(teamgames.women, false))
  }

  if (searchParams.selectedGender === 'women' && !searchParams.teamId) {
    whereArray.push(eq(teamgames.women, true))
  }

  if (searchParams.gameResult === 'win') {
    whereArray.push(eq(teamgames.win, true))
  }

  if (searchParams.gameResult === 'draw') {
    whereArray.push(eq(teamgames.draw, true))
  }

  if (searchParams.gameResult === 'lost') {
    whereArray.push(eq(teamgames.lost, true))
  }

  if (searchParams.result && searchParams.teamId) {
    const goalsScored = parseInt(searchParams.result.split('-')[0])
    const goalsConceded = parseInt(searchParams.result.split('-')[1])
    whereArray.push(eq(teamgames.goalsScored, goalsScored))
    whereArray.push(eq(teamgames.goalsConceded, goalsConceded))
  } else if (searchParams.result) {
    whereArray.push(eq(games.result, searchParams.result))
  }

  return whereArray
}

function getOrder(searchParams: ParsedSearchRequest) {
  const orderArray = []

  if (searchParams.order === 'asc') {
    orderArray.push(asc(sql`"date"`))
  }

  if (searchParams.order === 'desc') {
    orderArray.push(desc(sql`"date"`))
  }

  if (searchParams.orderVar === 'goalDifference') {
    switch (searchParams.order) {
      case 'asc':
        orderArray.unshift(asc(sql`"goal_difference"`))
        break

      default:
        orderArray.unshift(desc(sql`"goal_difference"`))
        break
    }
  }

  if (searchParams.orderVar === 'goalsScored') {
    switch (searchParams.order) {
      case 'asc':
        orderArray.unshift(asc(sql`"goals_scored"`))
        break

      default:
        orderArray.unshift(desc(sql`"goals_scored"`))
        break
    }
  }

  if (searchParams.orderVar === 'goalsConceded') {
    switch (searchParams.order) {
      case 'asc':
        orderArray.unshift(asc(sql`"goals_conceded"`))
        break

      default:
        orderArray.unshift(desc(sql`"goals_conceded"`))
        break
    }
  }

  if (searchParams.orderVar === 'totalGoals') {
    switch (searchParams.order) {
      case 'asc':
        orderArray.unshift(asc(sql`"total_goals"`))
        break

      default:
        orderArray.unshift(desc(sql`"total_goals"`))
        break
    }
  }

  return orderArray
}

function valiDate(inputDate: string | null | undefined) {
  if (!inputDate) return undefined
  const month = inputDate.split('/')[1]
  const day = inputDate.split('/')[0]
  if (month === '2' && Number(day) > 29) {
    return {
      status: 400,
      message: 'Felaktigt datum: ' + inputDate,
      paths: ['inputDate'] as SearchParamsFields[],
    } as const
  } else if (['4', '6', '9', '11'].includes(month) && Number(day) > 30) {
    return {
      status: 400,
      message: 'Felaktigt datum: ' + inputDate,
      paths: ['inputDate'] as SearchParamsFields[],
    } as const
  }
  const date = '2024-' + month + '-' + day

  if (!dayjs(date, 'YYYY-M-D', true).isValid()) {
    return {
      status: 400,
      message: 'Felaktigt datum: ' + inputDate,
      paths: ['inputDate'] as SearchParamsFields[],
    } as const
  } else {
    return [
      eq(sql`extract(month from teamgames."date")`, month),
      eq(sql`extract(day from teamgames."date")`, day),
    ]
  }
}
