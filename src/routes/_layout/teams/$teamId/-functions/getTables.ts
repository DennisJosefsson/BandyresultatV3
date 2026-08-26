import { db } from '@/db'
import {
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

// export const getTables = async ({
//   teamId,
//   seasonIdArray,
// }: {
//   teamId: number
//   seasonIdArray: Array<number>
// }) => {
//   const getTableData = await db
//     .select({
//       category: teamgames.category,
//       totalGames: count(teamgames.teamGameId),
//       totalPoints: sum(teamgames.points)
//         .mapWith(Number)
//         .as('total_points'),
//       totalGoalsScored: sum(teamgames.goalsScored)
//         .mapWith(Number)
//         .as('total_goals_scored') as unknown as SQL<number>,
//       totalGoalsConceded: sum(teamgames.goalsConceded)
//         .mapWith(Number)
//         .as(
//           'total_goals_conceded',
//         ) as unknown as SQL<number>,

//       totalGoalDifference: sum(teamgames.goalDifference)
//         .mapWith(Number)
//         .as(
//           'total_goal_difference',
//         ) as unknown as SQL<number>,

//       totalWins:
//         sql<number>`cast(count(*) filter (where win) as int)`.as(
//           'totalWins',
//         ),
//       totalDraws:
//         sql<number>`cast(count(*) filter (where draw) as int)`.as(
//           'totalDraws',
//         ),
//       totalLost:
//         sql<number>`cast(count(*) filter (where lost) as int)`.as(
//           'totalLost',
//         ),
//       serie: {
//         division: series.division,
//         level: series.level,
//       } as unknown as SQL<{
//         division: number
//         level: number
//       }>,
//     })
//     .from(teamgames)
//     .leftJoin(series, eq(teamgames.serieId, series.serieId))
//     .where(
//       and(
//         eq(teamgames.teamId, teamId),
//         eq(teamgames.played, true),
//       ),
//     )
//     .groupBy(
//       series.division,
//       teamgames.category,
//       series.level,
//     )
//     .orderBy(
//       asc(series.level),
//       desc(sql`total_points`),
//       desc(sql`total_goal_difference`),
//       desc(sql`total_goals_scored`),
//     )

//   const gameSeasonIds = await db
//     .selectDistinct({ seasonId: teamgames.seasonId })
//     .from(teamgames)
//     .where(eq(teamgames.teamId, teamId))
//     .then((result) => result.map((s) => s.seasonId))

//   const filteredSeasons = seasonIdArray.filter(
//     (season) => !gameSeasonIds.includes(season),
//   )

//   const teamTables = await db
//     .select({
//       category: tables.category,
//       totalGames: tables.games,
//       totalWins: tables.won,
//       totalDraws: tables.draw,
//       totalLost: tables.lost,
//       totalGoalsScored: tables.scoredGoals,
//       totalGoalsConceded: tables.concededGoals,
//       totalGoalDifference: tables.goalDifference,
//       totalPoints: tables.points,
//       serie: {
//         division: series.division,
//         level: series.level,
//       } as unknown as SQL<{
//         division: number
//         level: number
//       }>,
//     })
//     .from(tables)
//     .leftJoin(series, eq(series.serieId, tables.serieId))
//     .where(
//       and(
//         eq(tables.teamId, teamId),
//         inArray(tables.seasonId, filteredSeasons),
//       ),
//     )

//   return sortTables([...teamTables, ...getTableData])
// }

export async function getUnionedTables({
  teamId,
}: {
  teamId: number
}) {
  // const gameSerieIds = await db
  //   .selectDistinct({ serieId: teamgames.serieId })
  //   .from(teamgames)
  //   .where(eq(teamgames.teamId, teamId))
  //   .then((result) => result.map((s) => s.serieId))

  // const filteredSeries = serieIdArray.filter(
  //   (serie) => !gameSerieIds.includes(serie),
  // )

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
      division: series.division as unknown as SQL<number>,
      category: series.category as unknown as SQL<string>,
    })
    .from(unionQuery)
    .leftJoin(
      series,
      eq(unionQuery.serieId, series.serieId),
    )
    .groupBy(
      series.division,
      series.category,
      unionQuery.teamId,
    )
    .orderBy(
      asc(series.division),
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

// type SortedCompareCategoryTables = {
//   [key: string]: Array<SingleTeamTableItem>
// }

// type SortedTables = {
//   [key: string]: Array<SingleTeamTableItem>
// }

// function sortTables(
//   tableArray: zd.infer<typeof singleTeamTable>,
// ) {
//   const sortDivisions = tableArray.reduce(
//     (divisions, table) => {
//       if (!divisions[table.serie.division]) {
//         divisions[table.serie.division] = []
//       }
//       divisions[table.serie.division].push(table)
//       return divisions
//     },
//     {} as SortedCompareCategoryTables,
//   )

//   const sortedDivisions = Object.keys(sortDivisions).map(
//     (division) => {
//       return {
//         division,
//         categories: sortDivisions[division],
//       }
//     },
//   )

//   const sortDivisionsAndTables = sortedDivisions.map(
//     (divisionObject) => {
//       const sortCats = divisionObject.categories.reduce(
//         (category, table) => {
//           if (!category[table.category]) {
//             category[table.category] = []
//           }
//           category[table.category].push(table)
//           return category
//         },
//         {} as SortedTables,
//       )

//       const sortedTables = Object.keys(sortCats).map(
//         (cat) => {
//           return {
//             category: cat,
//             categoryName: groupConstant[cat],
//             tables: [
//               sortCats[cat].reduce(
//                 (acc, curr) => {
//                   return {
//                     category: curr.category,
//                     serie: curr.serie,
//                     totalGames:
//                       acc.totalGames + curr.totalGames,
//                     totalWins:
//                       acc.totalWins + curr.totalWins,
//                     totalDraws:
//                       acc.totalDraws + curr.totalDraws,
//                     totalLost:
//                       acc.totalLost + curr.totalLost,
//                     totalGoalsScored:
//                       acc.totalGoalsScored +
//                       curr.totalGoalsScored,
//                     totalGoalsConceded:
//                       acc.totalGoalsConceded +
//                       curr.totalGoalsConceded,
//                     totalGoalDifference:
//                       acc.totalGoalDifference +
//                       curr.totalGoalDifference,
//                     totalPoints:
//                       acc.totalPoints + curr.totalPoints,
//                   }
//                 },
//                 {
//                   category: cat,
//                   serie: { division: 1 },
//                   totalGames: 0,
//                   totalWins: 0,
//                   totalDraws: 0,
//                   totalLost: 0,
//                   totalGoalsScored: 0,
//                   totalGoalsConceded: 0,
//                   totalGoalDifference: 0,
//                   totalPoints: 0,
//                 } as SingleTeamTableItem,
//               ),
//             ],
//           }
//         },
//       )
//       return {
//         division: divisionObject['division'],
//         divisionName: getDivisionName(
//           divisionObject['division'],
//         ),
//         tables: sortedTables,
//       }
//     },
//   )

//   return sortDivisionsAndTables.sort(
//     (a, b) => parseInt(a.division) - parseInt(b.division),
//   )
// }

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
