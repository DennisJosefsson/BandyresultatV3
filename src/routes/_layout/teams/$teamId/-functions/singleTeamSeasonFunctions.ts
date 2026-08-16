import { db } from '@/db'
import {
  parentchildseries,
  seasons,
  series,
  tables,
  teamgames,
  teams,
  teamseasons,
  teamseries,
} from '@/db/schema'
import type { Game } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'
import type { TeamTable } from '@/lib/types/table'
import {
  gameSortFunction,
  leagueTableParser,
  tableSortFunction,
} from '@/lib/utils/sortFunctions'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  inArray,
  lt,
  sql,
  sum,
} from 'drizzle-orm'
import { unionAll } from 'drizzle-orm/pg-core'

export const getTeamSeasonStaticTables = async ({
  seasonId,
  seriesArray,
}: {
  seasonId: number
  seriesArray: Array<Serie>
}) => {
  const groupArray = seriesArray
    .filter((serie) =>
      [
        'playoffseries',
        'regular',
        'qualification',
      ].includes(serie.category),
    )
    .map((serie) => serie.group)

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
      } as unknown as SQL<{
        year: string
        seasonId: number
      }>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
    })
    .from(tables)
    .leftJoin(
      seasons,
      eq(seasons.seasonId, tables.seasonId),
    )
    .leftJoin(teams, eq(teams.teamId, tables.teamId))
    .leftJoin(series, eq(series.serieId, tables.serieId))
    .where(
      and(
        inArray(tables.group, groupArray),
        eq(tables.seasonId, seasonId),
      ),
    )

  // const seriesData = await db
  //   .select({
  //     ...getTableColumns(series),
  //   })
  //   .from(series)
  //   .leftJoin(
  //     seasons,
  //     eq(seasons.seasonId, series.seasonId),
  //   )
  //   .where(
  //     and(
  //       inArray(series.group, groupArray),
  //       eq(seasons.year, seasonYear),
  //       eq(seasons.women, women),
  //     ),
  //   )

  return tableSortFunction(
    getStaticTables,
    seriesArray,
  ).filter((table) => groupArray.includes(table.group))
}

export const getTeamSeasonTables = async ({
  seasonId,
  seriesArray,
}: {
  seasonId: number
  seriesArray: Array<Serie>
}) => {
  const groupArray = seriesArray
    .filter(
      (serie) =>
        [
          'playoffseries',
          'regular',
          'qualification',
        ].includes(serie.category) && serie.group !== 'mix',
    )
    .map((serie) => serie.group)

  const hasMix = seriesArray.some((s) => s.hasMix === true)
  const hasParentSerie = seriesArray.some(
    (s) => s.parentSerieId !== null,
  )

  const mixGroup = seriesArray.find(
    (s) => s.hasMix === true,
  )?.group

  const parentSerie = seriesArray.filter(
    (s) => s.parentSerieId !== null,
  )

  const serieIdWithParent = parentSerie.at(0)?.serieId
  const groupWithParent = parentSerie.at(0)?.group
  const allParentGames = Boolean(
    parentSerie.at(0)?.allParentGames,
  )

  const getTeamArray = await db
    .selectDistinct({
      teamId: teamgames.teamId,
      group: teamgames.group,
      category: teamgames.category,
      women: teamgames.women,
      season: {
        year: seasons.year,
        seasonId: seasons.seasonId,
      } as unknown as SQL<{
        year: string
        seasonId: number
      }>,
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
      serie: { level: series.level } as unknown as SQL<{
        level: number
      }>,
    })
    .from(teamgames)
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamgames.seasonId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        inArray(teamgames.group, groupArray),
        eq(teamgames.seasonId, seasonId),
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

  const mixQuery = getMixQuery({
    teamArray: getTeamArray,
    mixGroup,
    seasonId,
  })

  const filteredGroups = groupArray.filter((g) => {
    if (hasMix && g === mixGroup) return false
    if (hasParentSerie && g === groupWithParent)
      return false
    return true
  })

  const withParentTables = withParentSerie({
    teamArray: getTeamArray,
    allParentGames,
    serieId: serieIdWithParent,
    group: groupWithParent,
    seasonId,
  })

  const getTables = db
    .select({
      teamId: teamgames.teamId,
      group: teamgames.group,
      women: teamgames.women,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
        bonusPoints: teamseries.bonusPoints,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
        bonusPoints: number | null
      }>,
      totalGames: count(teamgames.teamGameId),
      totalPoints:
        sql<number>`sum(teamgames.points) + (case when teamseries.bonus_points is null then 0 else teamseries.bonus_points end)`
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
      serie: {
        level: series.level,
      } as unknown as SQL<{
        level: number
      }>,
      season: {
        year: seasons.year,
        seasonId: seasons.seasonId,
      } as unknown as SQL<{
        year: string
        seasonId: number
      }>,
    })
    .from(teamgames)
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .leftJoin(
      teamseries,
      and(
        eq(teamgames.teamId, teamseries.teamId),
        eq(teamgames.serieId, teamseries.serieId),
      ),
    )
    .where(
      and(
        eq(teamgames.played, true),
        eq(teamgames.seasonId, seasonId),
        inArray(teamgames.group, filteredGroups),
      ),
    )
    .groupBy(
      teamgames.group,
      teamgames.teamId,
      teams.name,
      teams.teamId,
      teams.casualName,
      teams.shortName,
      teamseries.bonusPoints,
      series.level,
      teamgames.women,
      seasons.seasonId,
      seasons.year,
    )
    .orderBy(
      asc(series.level),
      desc(sql`total_points`),
      desc(sql`total_goal_difference`),
      desc(sql`total_goals_scored`),
    )

  const hasMixTable = hasMix ? await mixQuery : undefined
  const mainTable = await getTables
  const withParentTable = hasParentSerie
    ? await withParentTables
    : undefined

  const combinedTables = combineTableArray({
    mainTable,
    mixTable: hasMixTable,
    withParentTable,
  })

  const tabell = leagueTableParser(
    getTeamArray,
    combinedTables,
  )

  return tableSortFunction(tabell, seriesArray).filter(
    (table) => groupArray.includes(table.group),
  )
}

type GetSeasonGamesProps = {
  gamesArray: Array<Game>
  seriesArray: Array<Serie>
}

const getTime = (date?: Date): number => {
  return date != null ? date.getTime() : 0
}

export const getSeasonGames = ({
  gamesArray,
  seriesArray,
}: GetSeasonGamesProps) => {
  const unsortedPlayedGames = gamesArray
    .filter((game) => game.played === true)
    .sort(
      (a, b) =>
        getTime(new Date(a.date)) -
        getTime(new Date(b.date)),
    )
  const unsortedUnplayedGames = gamesArray
    .filter((game) => !game.played)
    .sort(
      (a, b) =>
        getTime(new Date(a.date)) -
        getTime(new Date(b.date)),
    )

  const playedGames = gameSortFunction(
    unsortedPlayedGames,
    seriesArray,
    true,
  )

  const unplayedGames = gameSortFunction(
    unsortedUnplayedGames,
    seriesArray,
  )

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
      } as unknown as SQL<{
        year: string
        seasonId: number
      }>,
    })
    .from(teamseasons)
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamseasons.seasonId),
    )
    .where(eq(teamseasons.teamId, teamId))
    .orderBy(asc(teamseasons.seasonId))
    .limit(1)
    .then((season) => {
      if (season.length === 0) return undefined
      if (season[0].season.year.includes('/')) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(
            season[0].season.year.split('/')[1],
          ),
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
      } as unknown as SQL<{
        year: string
        seasonId: number
      }>,
    })
    .from(teamseasons)
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamseasons.seasonId),
    )
    .where(eq(teamseasons.teamId, teamId))
    .orderBy(desc(teamseasons.seasonId))
    .limit(1)
    .then((season) => {
      if (season.length === 0) return undefined
      if (season[0].season.year.includes('/')) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(
            season[0].season.year.split('/')[1],
          ),
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
      } as unknown as SQL<{
        year: string
        seasonId: number
      }>,
    })
    .from(teamseasons)
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamseasons.seasonId),
    )
    .where(
      and(
        eq(teamseasons.teamId, teamId),
        gt(teamseasons.seasonId, seasonId),
      ),
    )
    .orderBy(asc(teamseasons.seasonId))
    .limit(1)
    .then((season) => {
      if (season.length === 0) return undefined
      if (season[0].season.year.includes('/')) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(
            season[0].season.year.split('/')[1],
          ),
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
      } as unknown as SQL<{
        year: string
        seasonId: number
      }>,
    })
    .from(teamseasons)
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamseasons.seasonId),
    )
    .where(
      and(
        eq(teamseasons.teamId, teamId),
        lt(teamseasons.seasonId, seasonId),
      ),
    )
    .orderBy(desc(teamseasons.seasonId))
    .limit(1)
    .then((season) => {
      if (season.length === 0) return undefined
      if (season[0].season.year.includes('/')) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(
            season[0].season.year.split('/')[1],
          ),
        }
      } else if (season[0].season.year) {
        return {
          year: season[0].season.year,
          seasonId: parseInt(season[0].season.year),
        }
      }
    })

  return {
    firstSeason,
    lastSeason,
    nextSeason,
    previousSeason,
  }
}

// type TableItem = {
//   teamId: number
//   group: string
//   women: boolean
//   season: {
//     year: string
//     seasonId: number
//   }
//   team: {
//     teamId: number
//     name: string
//     shortName: string
//     casualName: string
//     bonusPoints: number | null
//   }
//   totalGames: number
//   totalPoints: number
//   totalGoalsScored: number
//   totalGoalsConceded: number
//   totalGoalDifference: number
//   totalWins: number
//   totalDraws: number
//   totalLost: number
//   serie: {
//     level: number
//     hasMix: boolean
//   }
// }

// function combineMixSerie(tableArray: Array<TableItem>) {
//   const mixTable = tableArray.filter(
//     (t) => t.group === 'mix',
//   )
//   const baseTable = tableArray.filter(
//     (t) => t.serie.hasMix === true,
//   )

//   const rest = tableArray.filter(
//     (t) => !t.serie.hasMix || t.group !== 'mix',
//   )

//   if (mixTable.length === 0) {
//     throw new Error('Ska ha mix-tabell här')
//   }

//   if (baseTable.length === 0) {
//     throw new Error('Ska ha tabell med hasMix här')
//   }

//   const newArray: Array<TableItem> = baseTable.map((t) => {
//     const currTeamId = t.teamId

//     const mixObject = mixTable.find(
//       (m) => m.teamId === currTeamId,
//     )

//     if (!mixObject) {
//       throw new Error('Laget har inget mix-objekt')
//     }

//     return {
//       ...t,
//       totalGames: t.totalGames + mixObject.totalGames,
//       totalWins: t.totalWins + mixObject.totalWins,
//       totalDraws: t.totalDraws + mixObject.totalDraws,
//       totalLost: t.totalLost + mixObject.totalLost,
//       totalGoalsScored:
//         t.totalGoalsScored + mixObject.totalGoalsScored,
//       totalGoalsConceded:
//         t.totalGoalsConceded + mixObject.totalGoalsConceded,
//       totalGoalDifference:
//         t.totalGoalDifference +
//         mixObject.totalGoalDifference,
//       totalPoints: t.totalPoints + mixObject.totalPoints,
//     }
//   })

//   const returnArray = [...newArray, ...rest]

//   if (returnArray.some((t) => t.group === 'mix')) {
//     throw new Error('Mix-grupp ska inte finnas här.')
//   }

//   return returnArray
// }

type TeamArrayItem = {
  teamId: number
  group: string
  category: string
  women: boolean
  season: {
    year: string
    seasonId: number
  }
  team: {
    name: string
    teamId: number
    casualName: string
    shortName: string
  }
  serie: {
    level: number
  }
}
function getMixQuery({
  teamArray,
  seasonId,
  mixGroup,
}: {
  teamArray: Array<TeamArrayItem>
  seasonId: number
  mixGroup: string | undefined
}) {
  if (!mixGroup) throw new Error('mixGroup ska finnas här')

  const filterTeamArray = teamArray
    .filter((t) => t.group !== 'mix')
    .map((t) => t.teamId)

  const mixTable = db
    .select({
      teamId: teamgames.teamId,
      group: teamgames.group,
      seasonId: teamgames.seasonId,
      women: teamgames.women,
      totalGames: count(teamgames.teamGameId),
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
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.played, true),
        eq(teamgames.seasonId, seasonId),
        eq(teamgames.group, 'mix'),
        inArray(teamgames.teamId, filterTeamArray),
      ),
    )
    .groupBy(
      teamgames.group,
      teamgames.teamId,
      teamgames.serieId,
    )

  const mainTable = db
    .select({
      teamId: teamgames.teamId,
      group: teamgames.group,
      seasonId: teamgames.seasonId,
      women: teamgames.women,
      totalGames: count(teamgames.teamGameId),
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
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.played, true),
        eq(teamgames.seasonId, seasonId),
        eq(teamgames.group, mixGroup),
        inArray(teamgames.teamId, filterTeamArray),
      ),
    )
    .groupBy(
      teamgames.group,
      teamgames.teamId,
      teamgames.serieId,
    )

  const unionQuery = db
    .$with('union_query')
    .as(unionAll(mainTable, mixTable))

  const mixQuery = db
    .with(unionQuery)
    .select({
      teamId: unionQuery.teamId,
      group: sql`${mixGroup}`.mapWith(String).as('group'),
      women: unionQuery.women,
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
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
      season: {
        seasonId: seasons.seasonId,
        year: seasons.year,
      } as unknown as SQL<{
        seasonId: number
        year: string
      }>,
      serie: { level: series.level } as unknown as SQL<{
        level: number
      }>,
    })
    .from(unionQuery)
    .leftJoin(teams, eq(unionQuery.teamId, teams.teamId))
    .leftJoin(
      seasons,
      eq(unionQuery.seasonId, seasons.seasonId),
    )
    .leftJoin(
      series,
      and(
        eq(series.group, unionQuery.group),
        eq(series.seasonId, teamgames.seasonId),
      ),
    )
    .groupBy(
      unionQuery.teamId,
      teams.teamId,
      teams.name,
      teams.shortName,
      teams.casualName,
      seasons.year,
      seasons.seasonId,
      series.level,
    )
    .orderBy(
      desc(sql`total_points`),
      desc(sql`total_goal_difference`),
      desc(sql`total_goals_scored`),
      asc(sql`casual_name collate "se-SE-x-icu"`),
    )

  return mixQuery
}

function withParentSerie({
  teamArray,
  serieId,
  seasonId,
  group,
  allParentGames,
}: {
  teamArray: Array<TeamArrayItem>
  seasonId: number
  serieId: number | undefined
  group: string | undefined
  allParentGames: boolean
}) {
  if (!group) throw new Error('group ska finnas här')
  if (!serieId) throw new Error('serieId ska finnas här')
  const filterTeamArray = teamArray
    .filter((t) => t.group === 'mix')
    .map((t) => t.teamId)

  const mainTable = db
    .select({
      teamId: teamgames.teamId,
      group: teamgames.group,
      serieId: teamgames.serieId,
      women: teamgames.women,
      seasonId: teamgames.seasonId,
      totalGames: count(teamgames.teamGameId),
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
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.seasonId, seasonId),
        eq(teamgames.played, true),
        eq(teamgames.serieId, serieId),
        inArray(teamgames.teamId, filterTeamArray),
      ),
    )
    .groupBy(
      teamgames.group,
      teamgames.teamId,
      teamgames.serieId,
    )

  const parentTable = db
    .select({
      teamId: teamgames.teamId,
      group: teamgames.group,
      serieId: teamgames.serieId,
      women: teamgames.women,
      seasonId: teamgames.seasonId,
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
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.seasonId, seasonId),
        inArray(teamgames.teamId, filterTeamArray),
        allParentGames
          ? undefined
          : inArray(teamgames.opponentId, filterTeamArray),
        inArray(
          teamgames.serieId,
          db
            .select({
              parentId: parentchildseries.parentId,
            })
            .from(parentchildseries)
            .where(eq(parentchildseries.childId, serieId)),
        ),
        eq(teamgames.played, true),
      ),
    )
    .groupBy(teamgames.teamId)

  const unionQuery = db
    .$with('union_query')
    .as(unionAll(mainTable, parentTable))

  const query = db
    .with(unionQuery)
    .select({
      teamId: unionQuery.teamId,
      group: sql`${group}`.mapWith(String).as('group'),
      women: unionQuery.women,
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
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
      season: {
        seasonId: seasons.seasonId,
        year: seasons.year,
      } as unknown as SQL<{
        seasonId: number
        year: string
      }>,
      serie: { level: series.level } as unknown as SQL<{
        level: number
      }>,
    })
    .from(unionQuery)
    .leftJoin(teams, eq(unionQuery.teamId, teams.teamId))
    .leftJoin(
      seasons,
      eq(unionQuery.seasonId, seasons.seasonId),
    )
    .leftJoin(
      series,
      and(
        eq(series.group, unionQuery.group),
        eq(series.seasonId, teamgames.seasonId),
      ),
    )
    .groupBy(
      unionQuery.teamId,
      teams.teamId,
      teams.name,
      teams.shortName,
      teams.casualName,
      seasons.year,
      seasons.seasonId,
      series.level,
    )
    .orderBy(
      desc(sql`total_points`),
      desc(sql`total_goal_difference`),
      desc(sql`total_goals_scored`),
      asc(sql`casual_name collate "se-SE-x-icu"`),
    )

  return query
}

function combineTableArray({
  mixTable,
  mainTable,
  withParentTable,
}: {
  mixTable: Array<TeamTable> | undefined
  mainTable: Array<TeamTable>
  withParentTable: Array<TeamTable> | undefined
}): Array<TeamTable> {
  if (mixTable) {
    mainTable.concat(mixTable)
  }
  if (withParentTable) {
    mainTable.concat(withParentTable)
  }

  return mainTable
}
