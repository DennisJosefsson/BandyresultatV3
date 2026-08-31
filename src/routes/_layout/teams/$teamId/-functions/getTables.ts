import { db } from '@/db'
import {
  competitions,
  series,
  tables,
  teamgames,
  teamseries,
} from '@/db/schema'
import { groupConstant } from '@/lib/utils/constants'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  count,
  eq,
  inArray,
  sql,
  sum,
} from 'drizzle-orm'
import { unionAll } from 'drizzle-orm/pg-core'
import { getDivisionName } from '../../-functions/utils/nameUtils'

export async function getUnionedTables({
  teamId,
}: {
  teamId: number
}) {
  const staticTables = db
    .select({
      teamId: tables.teamId,
      totalGames: sum(tables.games)
        .mapWith(Number)
        .as('total_games'),
      totalPoints: sum(tables.points)
        .mapWith(Number)
        .as('total_points'),
      totalGoalsScored: sum(tables.scoredGoals)
        .mapWith(Number)
        .as('total_goals_scored') as unknown as SQL<number>,
      totalGoalsConceded: sum(tables.concededGoals)
        .mapWith(Number)
        .as(
          'total_goals_conceded',
        ) as unknown as SQL<number>,
      totalGoalDifference: sum(tables.goalDifference)
        .mapWith(Number)
        .as(
          'total_goal_difference',
        ) as unknown as SQL<number>,
      totalWins: sum(tables.won)
        .mapWith(Number)
        .as('total_wins') as unknown as SQL<number>,
      totalDraws: sum(tables.draw)
        .mapWith(Number)
        .as('total_draws') as unknown as SQL<number>,
      totalLost: sum(tables.lost)
        .mapWith(Number)
        .as('total_lost') as unknown as SQL<number>,
      serieId: tables.serieId,
    })
    .from(tables)
    .leftJoin(series, eq(series.serieId, tables.serieId))
    .where(
      and(
        inArray(
          tables.serieId,
          db
            .select({ serieId: teamseries.serieId })
            .from(teamseries)
            .where(eq(teamseries.teamId, teamId)),
        ),
        eq(tables.teamId, teamId),
        eq(series.hasStatic, true),
      ),
    )
    .groupBy(tables.teamId, tables.serieId)

  const mainTable = db
    .select({
      teamId: teamgames.teamId,
      totalGames: count(teamgames.teamGameId).as(
        'total_games',
      ),
      totalPoints: sum(teamgames.points)
        .mapWith(Number)
        .as('total_points'),
      totalGoalsScored: sum(teamgames.goalsScored)
        .mapWith(Number)
        .as('total_goals_scored') as unknown as SQL<number>,
      totalGoalsConceded: sum(teamgames.goalsConceded)
        .mapWith(Number)
        .as(
          'total_goals_conceded',
        ) as unknown as SQL<number>,
      totalGoalDifference: sum(teamgames.goalDifference)
        .mapWith(Number)
        .as(
          'total_goal_difference',
        ) as unknown as SQL<number>,
      totalWins:
        sql<number>`cast(count(*) filter (where win) as int)`.as(
          'totalWins',
        ),
      totalDraws:
        sql<number>`cast(count(*) filter (where draw) as int)`.as(
          'totalDraws',
        ),
      totalLost:
        sql<number>`cast(count(*) filter (where lost) as int)`.as(
          'totalLost',
        ),
      serieId: teamgames.serieId,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.played, true),
        eq(teamgames.teamId, teamId),
        inArray(
          teamgames.serieId,
          db
            .select({ serieId: teamseries.serieId })
            .from(teamseries)
            .where(eq(teamseries.teamId, teamId)),
        ),
        eq(series.hasStatic, false),
      ),
    )
    .groupBy(teamgames.teamId, teamgames.serieId)

  const unionQuery = db
    .$with('union_query')
    .as(unionAll(staticTables, mainTable))

  const result = await db
    .with(unionQuery)
    .select({
      teamId: unionQuery.teamId,
      totalGames: sum(unionQuery.totalGames)
        .mapWith(Number)
        .as('total_games'),
      totalPoints: sum(unionQuery.totalPoints)
        .mapWith(Number)
        .as('total_points'),
      totalGoalsScored: sum(unionQuery.totalGoalsScored)
        .mapWith(Number)
        .as('total_goals_scored') as unknown as SQL<number>,
      totalGoalsConceded: sum(unionQuery.totalGoalsConceded)
        .mapWith(Number)
        .as(
          'total_goals_conceded',
        ) as unknown as SQL<number>,
      totalGoalDifference: sum(
        unionQuery.totalGoalDifference,
      )
        .mapWith(Number)
        .as(
          'total_goal_difference',
        ) as unknown as SQL<number>,
      totalWins: sum(unionQuery.totalWins)
        .mapWith(Number)
        .as('total_wins'),
      totalDraws: sum(unionQuery.totalDraws)
        .mapWith(Number)
        .as('total_draws'),
      totalLost: sum(unionQuery.totalLost)
        .mapWith(Number)
        .as('total_lost'),
      division:
        competitions.division as unknown as SQL<number>,
      category: series.category as unknown as SQL<string>,
    })
    .from(unionQuery)
    .leftJoin(
      series,
      eq(unionQuery.serieId, series.serieId),
    )
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .groupBy(
      competitions.division,
      series.category,
      unionQuery.teamId,
    )
    .orderBy(
      asc(competitions.division),
      sql`case 
	when ${series.category} like '%final' then 1
	when ${series.category} like '%bronze' then 2
	when ${series.category} like '%semi' then 3
	when ${series.category} like '%playoffseries' then 4
	when ${series.category} like '%quarter' then 5
	when ${series.category} like '%eight' then 6
	when ${series.category} like '%regular' then 7
	when ${series.category} like '%qualification' then 8
end`,
    )

  return sortTablesV2(result)
}

type Table = {
  teamId: number
  totalGames: number
  totalPoints: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalWins: number
  totalDraws: number
  totalLost: number
  division: number
  category: string
}

type SortedCompareCategoryTablesV2 = {
  [key: string]: Array<Table>
}

type SortedTablesV2 = {
  [key: string]: Array<Table>
}

function sortTablesV2(tableArray: Array<Table>) {
  const sortDivisions = tableArray.reduce(
    (divisions, table) => {
      if (!divisions[table.division]) {
        divisions[table.division] = []
      }
      divisions[table.division].push(table)
      return divisions
    },
    {} as SortedCompareCategoryTablesV2,
  )

  const sortedDivisions = Object.keys(sortDivisions).map(
    (division) => {
      return {
        division,
        categories: sortDivisions[division],
      }
    },
  )

  const sortDivisionsAndTables = sortedDivisions.map(
    (divisionObject) => {
      const sortCats = divisionObject.categories.reduce(
        (category, table) => {
          if (!category[table.category]) {
            category[table.category] = []
          }
          category[table.category].push(table)
          return category
        },
        {} as SortedTablesV2,
      )

      const sortedTables = Object.keys(sortCats).map(
        (cat) => {
          return {
            category: cat,
            categoryName: groupConstant[cat],
            tables: sortCats[cat],
          }
        },
      )
      return {
        division: divisionObject['division'],
        divisionName: getDivisionName(
          divisionObject['division'],
        ),
        tables: sortedTables,
      }
    },
  )

  return sortDivisionsAndTables.sort(
    (a, b) => parseInt(a.division) - parseInt(b.division),
  )
}
