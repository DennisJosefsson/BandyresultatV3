import { db } from '@/db'
import { seasons, series, tables, teamgames, teamseasons } from '@/db/schema'
import { sortOrder } from '@/lib/constants'
import { and, asc, count, desc, eq, inArray, SQL, sql, sum } from 'drizzle-orm'

type FiveSeasonTableItem = {
  seasonId: number
  group: string
  category: string
  totalGames: number
  totalPoints: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalWins: number
  totalDraws: number
  totalLost: number
  serie: {
    serieName: string
  }
  season: {
    year: string
  }
}

export type FiveSeason = {
  season: string
  tables: FiveSeasonTableItem[]
}

export const getLastFiveSeasons = async ({ teamId }: { teamId: number }) => {
  const seasonIdArray = await db
    .select({ seasonId: teamseasons.seasonId })
    .from(teamseasons)
    .where(eq(teamseasons.teamId, teamId))
    .orderBy(desc(teamseasons.seasonId))
    .limit(5)
    .then((result) => result.map((season) => season.seasonId))

  const getTables = await db
    .select({
      seasonId: teamgames.seasonId,
      group: teamgames.group,
      category: teamgames.category,
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
        serieName: series.serieName,
      } as unknown as SQL<{ serieName: string }>,
      season: {
        year: seasons.year,
      } as unknown as SQL<{ year: string }>,
    })
    .from(teamgames)
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.played, true),
        inArray(teamgames.seasonId, seasonIdArray),
      ),
    )
    .groupBy(
      teamgames.seasonId,
      teamgames.group,
      seasons.seasonId,
      series.serieName,
      teamgames.category,
    )
    .orderBy(desc(teamgames.seasonId), asc(teamgames.category))

  const tableSeasons = new Set(getTables.map((season) => season.seasonId))

  const unparsedSeasons = seasonIdArray.filter((id) => !tableSeasons.has(id))

  if (unparsedSeasons.length === 0) {
    return tableSort(getTables)
  } else {
    const teamTables = await db
      .select({
        seasonId: tables.seasonId,
        group: tables.group,
        category: tables.category,
        totalGames: tables.games,
        totalWins: tables.won,
        totalDraws: tables.draw,
        totalLost: tables.lost,
        totalGoalsScored: tables.scoredGoals,
        totalGoalsConceded: tables.concededGoals,
        totalGoalDifference: tables.goalDifference,
        totalPoints: tables.points,
        serie: {
          serieName: series.serieName,
        } as unknown as SQL<{ serieName: string }>,
        season: {
          year: seasons.year,
        } as unknown as SQL<{ year: string }>,
      })
      .from(tables)
      .leftJoin(series, eq(series.serieId, tables.serieId))
      .leftJoin(seasons, eq(tables.seasonId, seasons.seasonId))
      .where(
        and(
          eq(tables.teamId, teamId),
          inArray(tables.seasonId, unparsedSeasons),
        ),
      )

    return tableSort(
      [...getTables, ...teamTables].sort((a, b) => b.seasonId - a.seasonId),
    )
  }
}

type SortedTables = {
  [key: string]: FiveSeasonTableItem[]
}

function tableSort(tableArray: FiveSeasonTableItem[]) {
  const seasonArray = tableArray.reduce((seasons, table) => {
    if (!seasons[table.season.year]) {
      seasons[table.season.year] = []
    }
    seasons[table.season.year].push(table)
    return seasons
  }, {} as SortedTables)

  const sortedTables = Object.keys(seasonArray).map((season) => {
    return {
      season,
      tables: seasonArray[season].sort(
        (a, b) => sortOrder.indexOf(a.group) - sortOrder.indexOf(b.group),
      ),
    }
  })
  return sortedTables
}
