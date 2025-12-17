import { db } from '@/db'
import {
  seasons,
  series,
  tables,
  teamgames,
  teams,
  teamseasons,
} from '@/db/schema'
import { Game } from '@/lib/types/game'
import {
  gameSortFunction,
  leagueTableParser,
  tableSortFunction,
} from '@/lib/utils/sortFunctions'
import {
  and,
  asc,
  count,
  desc,
  eq,
  getTableColumns,
  gt,
  inArray,
  like,
  lt,
  notInArray,
  sql,
  SQL,
  sum,
} from 'drizzle-orm'

type BonusPoints = {
  [key: string]: number
}

export const getTeamSeasonStaticTables = async ({
  seasonYear,
  women,
  groupArray,
}: {
  seasonYear: string
  women: boolean
  groupArray: string[]
}) => {
  const getStaticTables = await db
    .select({
      group: tables.group,
      teamId: tables.teamId,
      women: tables.women,
      totalGames: tables.games,
      totalWins: tables.won,
      totalDraws: tables.draw,
      totalLost: tables.lost,
      totalGoalsScored: tables.scoredGoals,
      totalGoalsConceded: tables.concededGoals,
      totalGoalDifference: tables.goalDifference,
      totalPoints: tables.points,
      season: {
        year: seasons.year,
        seasonId: seasons.seasonId,
      } as unknown as SQL<{ year: string; seasonId: number }>,
      team: {
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<{
        name: string
        shortName: string
        casualName: string
      }>,
    })
    .from(tables)
    .leftJoin(seasons, eq(seasons.seasonId, tables.seasonId))
    .leftJoin(teams, eq(teams.teamId, tables.teamId))
    .leftJoin(series, eq(series.serieId, tables.serieId))
    .where(
      and(
        inArray(tables.group, groupArray),
        eq(seasons.women, women),
        eq(seasons.year, seasonYear),
      ),
    )

  const seriesData = await db
    .select({
      name: series.serieName,
      group: series.serieGroupCode,
      comment: series.comment,
      serieStructure: series.serieStructure,
      level: series.level,
    })
    .from(series)
    .leftJoin(seasons, eq(seasons.seasonId, series.seasonId))
    .where(
      and(
        inArray(series.serieGroupCode, groupArray),
        eq(seasons.year, seasonYear),
        eq(seasons.women, women),
      ),
    )

  return tableSortFunction(getStaticTables, seriesData).filter((table) =>
    groupArray.includes(table.group),
  )
}

export const getTeamSeasonTables = async ({
  seasonYear,
  women,
  groupArray,
}: {
  seasonYear: string
  women: boolean
  groupArray: string[]
}) => {
  const getTeamArray = await db
    .selectDistinct({
      teamId: teamgames.teamId,
      group: teamgames.group,
      category: teamgames.category,
      women: teamgames.women,
      season: {
        year: seasons.year,
        seasonId: seasons.seasonId,
      } as unknown as SQL<{ year: string; seasonId: number }>,
      team: {
        name: teams.name,
        teamId: teams.teamId,
        casualName: teams.casualName,
        shortName: teams.shortName,
      } as unknown as SQL<{
        name: string
        teamId: number
        casualName: string
        shortName: string
      }>,
      serie: { level: series.level } as unknown as SQL<{ level: number }>,
    })
    .from(teamgames)
    .leftJoin(seasons, eq(seasons.seasonId, teamgames.seasonId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.playoff, false),
        eq(teamgames.women, women),
        inArray(teamgames.group, groupArray),
        eq(seasons.year, seasonYear),
      ),
    )
    .groupBy(
      teamgames.group,
      teamgames.teamId,
      teamgames.category,
      teams.name,
      teams.teamId,
      teams.casualName,
      teams.shortName,
      seasons.seasonId,
      seasons.year,
      teamgames.women,
      series.level,
    )

  const getTables = await db
    .select({
      teamId: teamgames.teamId,
      group: teamgames.group,
      women: teamgames.women,
      season: {
        year: seasons.year,
        seasonId: seasons.seasonId,
      } as unknown as SQL<{ year: string; seasonId: number }>,
      team: {
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<{
        name: string
        shortName: string
        casualName: string
      }>,
      totalGames: count(teamgames.teamGameId),
      totalPoints: sum(teamgames.points).mapWith(Number).as('total_points'),
      totalGoalsScored: sum(teamgames.goalsScored)
        .mapWith(Number)
        .as('total_goals_scored') as unknown as SQL<number>,
      totalGoalsConceded: sum(teamgames.goalsConceded)
        .mapWith(Number)
        .as('total_goals_conceded') as unknown as SQL<number>,

      totalGoalDifference: sum(teamgames.goalDifference)
        .mapWith(Number)
        .as('total_goal_difference') as unknown as SQL<number>,

      totalWins: sql<number>`cast(count(*) filter (where win) as int)`.as(
        'totalWins',
      ),
      totalDraws: sql<number>`cast(count(*) filter (where draw) as int)`.as(
        'totalDraws',
      ),
      totalLost: sql<number>`cast(count(*) filter (where lost) as int)`.as(
        'totalLost',
      ),
      serie: {
        level: series.level,
      } as unknown as SQL<{ level: number }>,
    })
    .from(teamgames)
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .leftJoin(seasons, eq(seasons.seasonId, teamgames.seasonId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .where(
      and(
        eq(teamgames.playoff, false),
        eq(teamgames.played, true),
        eq(teamgames.women, women),
        inArray(teamgames.group, groupArray),
        eq(seasons.year, seasonYear),
      ),
    )
    .groupBy(
      teamgames.group,
      teamgames.teamId,
      teams.name,
      teams.teamId,
      teams.casualName,
      teams.shortName,
      seasons.seasonId,
      seasons.year,
      teamgames.women,
      series.level,
      teamgames.category,
    )
    .orderBy(
      desc(teamgames.category),
      desc(sql`total_points`),
      desc(sql`total_goal_difference`),
      desc(sql`total_goals_scored`),
    )

  const tabell = leagueTableParser(getTeamArray, getTables)

  const seriesData = await db
    .select({
      name: series.serieName,
      group: series.serieGroupCode,
      comment: series.comment,
      serieStructure: series.serieStructure,
      level: series.level,
      bonusPoints: series.bonusPoints,
      season: { women: seasons.women } as unknown as SQL<{ women: boolean }>,
    })
    .from(series)
    .leftJoin(seasons, eq(seasons.seasonId, series.seasonId))
    .where(
      and(
        inArray(series.serieGroupCode, groupArray),
        eq(seasons.year, seasonYear),
        eq(seasons.women, women),
      ),
    )

  const seriesWithBonusPoints = seriesData.find(
    (serie) => serie.bonusPoints !== null,
  )

  if (seriesWithBonusPoints && seriesWithBonusPoints.bonusPoints) {
    const bonusPointsObject = JSON.parse(
      seriesWithBonusPoints.bonusPoints,
    ) as BonusPoints

    const updatedTable = tabell.map((table) => {
      return table.group === seriesWithBonusPoints.group &&
        table.women === seriesWithBonusPoints.season.women
        ? {
            ...table,
            totalPoints:
              table.totalPoints + bonusPointsObject[table.teamId.toString()],
          }
        : table
    })

    return tableSortFunction(updatedTable, seriesData).filter((table) =>
      groupArray.includes(table.group),
    )
  }

  if (['1933', '1937'].includes(seasonYear)) {
    const gameArray = await db
      .select({
        ...getTableColumns(teamgames),
        season: {
          year: seasons.year,
          seasonId: seasons.seasonId,
        } as unknown as SQL<{ year: string; seasonId: number }>,
        team: {
          name: teams.name,
          shortName: teams.shortName,
          casualName: teams.casualName,
        } as unknown as SQL<{
          name: string
          shortName: string
          casualName: string
        }>,
      })
      .from(teamgames)
      .leftJoin(seasons, eq(seasons.seasonId, teamgames.seasonId))
      .leftJoin(series, eq(series.serieId, teamgames.serieId))
      .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
      .where(
        and(
          seasonYear === '1933'
            ? like(teamgames.group, 'Div%')
            : like(teamgames.group, 'Avd%'),
          seasonYear === '1933'
            ? notInArray(teamgames.opponentId, [5, 31, 57, 29])
            : notInArray(teamgames.opponentId, [5, 64, 57, 17]),
          eq(seasons.year, seasonYear),
          eq(series.level, 1),
        ),
      )

    gameArray.forEach((game) => {
      const tableIndex = tabell.findIndex(
        (table) =>
          table.team === game.team && table.group.includes('Nedflyttning'),
      )

      if (tableIndex === -1) return

      tabell[tableIndex].totalGames = tabell[tableIndex].totalGames + 1
      tabell[tableIndex].totalWins =
        tabell[tableIndex].totalWins + (game.win ? 1 : 0)
      tabell[tableIndex].totalDraws =
        tabell[tableIndex].totalDraws + (game.draw ? 1 : 0)
      tabell[tableIndex].totalLost =
        tabell[tableIndex].totalLost + (game.lost ? 1 : 0)
      tabell[tableIndex].totalGoalsScored =
        tabell[tableIndex].totalGoalsScored +
        (game.goalsScored ? game.goalsScored : 0)
      tabell[tableIndex].totalGoalsConceded =
        tabell[tableIndex].totalGoalsConceded +
        (game.goalsConceded ? game.goalsConceded : 0)
      tabell[tableIndex].totalGoalDifference =
        tabell[tableIndex].totalGoalDifference +
        (game.goalDifference ? game.goalDifference : 0)
      tabell[tableIndex].totalPoints =
        tabell[tableIndex].totalPoints + (game.points ? game.points : 0)
    })

    return tableSortFunction(tabell, seriesData).filter((table) =>
      groupArray.includes(table.group),
    )
  }

  return tableSortFunction(tabell, seriesData).filter((table) =>
    groupArray.includes(table.group),
  )
}

type GetSeasonGamesProps = {
  gamesArray: Game[]
  seriesArray: {
    serieCategory: string
    serieGroupCode: string
    comment: string | null
    name: string
    level: number
  }[]
}

type SeriesData = {
  group: string
  comment: string
  name: string
  level: number
  serieStructure: number[]
}

const getTime = (date?: Date): number => {
  return date != null ? date.getTime() : 0
}

export const getSeasonGames = ({
  gamesArray,
  seriesArray,
}: GetSeasonGamesProps) => {
  const seriesData = seriesArray.map((serie) => {
    return {
      group: serie.serieGroupCode,
      comment: serie.comment,
      name: serie.name,
      level: serie.level,
    }
  }) as SeriesData[]

  const unsortedPlayedGames = gamesArray
    .filter((game) => game.played === true)
    .sort((a, b) => getTime(new Date(a.date)) - getTime(new Date(b.date)))
  const unsortedUnplayedGames = gamesArray
    .filter((game) => !game.played)
    .sort((a, b) => getTime(new Date(a.date)) - getTime(new Date(b.date)))

  const playedGames = gameSortFunction(unsortedPlayedGames, seriesData, true)

  const unplayedGames = gameSortFunction(unsortedUnplayedGames, seriesData)

  return { playedGames, unplayedGames }
}

export const getSeasons = async ({
  teamId,
  seasonId,
}: {
  teamId: number
  seasonId: number
}) => {
  const firstSeason = await db
    .select({
      season: {
        year: seasons.year,
        seasonId: seasons.seasonId,
      } as unknown as SQL<{ year: string; seasonId: number }>,
    })
    .from(teamseasons)
    .leftJoin(seasons, eq(seasons.seasonId, teamseasons.seasonId))
    .where(eq(teamseasons.teamId, teamId))
    .orderBy(asc(teamseasons.seasonId))
    .limit(1)
    .then((season) => {
      if (season.length === 0) return undefined
      if (season[0].season.year.includes('/')) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(season[0].season.year.split('/')[1]),
        }
      } else if (season[0].season.year) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(season[0].season.year),
        }
      }
    })

  const lastSeason = await db
    .select({
      season: {
        year: seasons.year,
        seasonId: seasons.seasonId,
      } as unknown as SQL<{ year: string; seasonId: number }>,
    })
    .from(teamseasons)
    .leftJoin(seasons, eq(seasons.seasonId, teamseasons.seasonId))
    .where(eq(teamseasons.teamId, teamId))
    .orderBy(desc(teamseasons.seasonId))
    .limit(1)
    .then((season) => {
      if (season.length === 0) return undefined
      if (season[0].season.year.includes('/')) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(season[0].season.year.split('/')[1]),
        }
      } else if (season[0].season.year) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(season[0].season.year),
        }
      }
    })

  if (!firstSeason || !lastSeason) {
    throw new Error('Laget har inga säsonger.')
  }

  const nextSeason = await db
    .select({
      season: {
        year: seasons.year,
        seasonId: seasons.seasonId,
      } as unknown as SQL<{ year: string; seasonId: number }>,
    })
    .from(teamseasons)
    .leftJoin(seasons, eq(seasons.seasonId, teamseasons.seasonId))
    .where(
      and(eq(teamseasons.teamId, teamId), gt(teamseasons.seasonId, seasonId)),
    )
    .orderBy(asc(teamseasons.seasonId))
    .limit(1)
    .then((season) => {
      if (season.length === 0) return undefined
      if (season[0].season.year.includes('/')) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(season[0].season.year.split('/')[1]),
        }
      } else if (season[0].season.year) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(season[0].season.year),
        }
      }
    })

  const previousSeason = await db
    .select({
      season: {
        year: seasons.year,
        seasonId: seasons.seasonId,
      } as unknown as SQL<{ year: string; seasonId: number }>,
    })
    .from(teamseasons)
    .leftJoin(seasons, eq(seasons.seasonId, teamseasons.seasonId))
    .where(
      and(eq(teamseasons.teamId, teamId), lt(teamseasons.seasonId, seasonId)),
    )
    .orderBy(desc(teamseasons.seasonId))
    .limit(1)
    .then((season) => {
      if (season.length === 0) return undefined
      if (season[0].season.year.includes('/')) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(season[0].season.year.split('/')[1]),
        }
      } else if (season[0].season.year) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(season[0].season.year),
        }
      }
    })

  return { firstSeason, lastSeason, nextSeason, previousSeason }
}
