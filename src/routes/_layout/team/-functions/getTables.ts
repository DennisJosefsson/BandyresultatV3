import { db } from '@/db'
import { series, tables, teamgames } from '@/db/schema'
import { groupConstant, sortOrder } from '@/lib/utils/constants'
import { zd } from '@/lib/utils/zod'
import { and, count, desc, eq, inArray, SQL, sql, sum } from 'drizzle-orm'

type SingleTeamTableItem = {
  category: string
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalPoints: number
  serie: {
    level: number
  }
}

export const singleTeamTableItem = zd.object({
  category: zd.string(),
  totalDraws: zd.coerce.number(),
  totalGames: zd.coerce.number(),
  totalGoalDifference: zd.coerce.number(),
  totalGoalsConceded: zd.coerce.number(),
  totalGoalsScored: zd.coerce.number(),
  totalLost: zd.coerce.number(),
  totalPoints: zd.coerce.number(),
  totalWins: zd.coerce.number(),
  serie: zd.object({ level: zd.number() }),
})

export const singleTeamTable = zd.array(singleTeamTableItem)

export const getTables = async ({
  teamId,
  seasonIdArray,
}: {
  teamId: number
  seasonIdArray: number[]
}) => {
  const getTables = await db
    .select({
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
        level: series.level,
      } as unknown as SQL<{ level: number }>,
    })
    .from(teamgames)
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .where(and(eq(teamgames.teamId, teamId), eq(teamgames.played, true)))
    .groupBy(series.level, teamgames.category)
    .orderBy(
      desc(teamgames.category),
      desc(sql`total_points`),
      desc(sql`total_goal_difference`),
      desc(sql`total_goals_scored`),
    )

  const gameSeasonIds = await db
    .selectDistinct({ seasonId: teamgames.seasonId })
    .from(teamgames)
    .where(eq(teamgames.teamId, teamId))
    .then((result) => result.map((s) => s.seasonId))

  const filteredSeasons = seasonIdArray.filter(
    (season) => !gameSeasonIds.includes(season),
  )

  const teamTables = await db
    .select({
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
        level: series.level,
      } as unknown as SQL<{ level: number }>,
    })
    .from(tables)
    .leftJoin(series, eq(series.serieId, tables.serieId))
    .where(
      and(eq(tables.teamId, teamId), inArray(tables.seasonId, filteredSeasons)),
    )

  return sortTables([...teamTables, ...getTables])
}

type SortedCompareCategoryTables = {
  [key: string]: SingleTeamTableItem[]
}

type SortedTables = {
  [key: string]: SingleTeamTableItem[]
}

type LevelName = {
  [key: string]: string
}

const levelName: LevelName = {
  '1': 'Högsta divisionen',
  '2': 'Näst högsta divisionen',
  '3': 'Tredje divisionen',
  '4': 'Fjärde divisionen',
  '5': 'Femte divisionen',
}

function sortTables(tableArray: zd.infer<typeof singleTeamTable>) {
  const sortLevels = tableArray.reduce((levels, table) => {
    if (!levels[table.serie.level]) {
      levels[table.serie.level] = []
    }
    levels[table.serie.level].push(table)
    return levels
  }, {} as SortedCompareCategoryTables)

  const sortedLevels = Object.keys(sortLevels).map((level) => {
    return {
      level,
      categories: sortLevels[level],
    }
  })

  const sortLevelsAndTables = sortedLevels.map((levelObject) => {
    const sortCats = levelObject.categories.reduce((category, table) => {
      if (!category[table.category]) {
        category[table.category] = []
      }
      category[table.category].push(table)
      return category
    }, {} as SortedTables)

    const sortedTables = Object.keys(sortCats).map((cat) => {
      return {
        category: cat,
        categoryName: groupConstant[cat],
        tables: sortCats[cat].reduce(
          (acc, curr) => {
            return {
              category: curr.category,
              serie: curr.serie,
              totalGames: acc.totalGames + curr.totalGames,
              totalWins: acc.totalWins + curr.totalWins,
              totalDraws: acc.totalDraws + curr.totalDraws,
              totalLost: acc.totalLost + curr.totalLost,
              totalGoalsScored: acc.totalGoalsScored + curr.totalGoalsScored,
              totalGoalsConceded:
                acc.totalGoalsConceded + curr.totalGoalsConceded,
              totalGoalDifference:
                acc.totalGoalDifference + curr.totalGoalDifference,
              totalPoints: acc.totalPoints + curr.totalPoints,
            }
          },
          {
            category: cat,
            serie: { level: 1 },
            totalGames: 0,
            totalWins: 0,
            totalDraws: 0,
            totalLost: 0,
            totalGoalsScored: 0,
            totalGoalsConceded: 0,
            totalGoalDifference: 0,
            totalPoints: 0,
          } as SingleTeamTableItem,
        ),
      }
    })
    return {
      level: levelObject['level'],
      levelName: levelName[levelObject['level']],
      tables: sortedTables.sort(
        (a, b) => sortOrder.indexOf(a.category) - sortOrder.indexOf(b.category),
      ),
    }
  })

  return sortLevelsAndTables.sort(
    (a, b) => parseInt(a.level) - parseInt(b.level),
  )
}
