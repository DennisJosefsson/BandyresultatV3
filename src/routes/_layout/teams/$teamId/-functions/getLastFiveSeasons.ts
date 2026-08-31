import { db } from '@/db'
import {
  competitions,
  seasons,
  series,
  tables,
  teamgames,
  teamseasons,
} from '@/db/schema'
import type {
  FiveSeason,
  FiveSeasonTableItem,
} from '@/lib/types/team'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  count,
  desc,
  eq,
  inArray,
  sql,
  sum,
} from 'drizzle-orm'

export const getLastFiveSeasons = async ({
  teamId,
}: {
  teamId: number
}) => {
  const seasonIdArray = await db
    .select({ seasonId: teamseasons.seasonId })
    .from(teamseasons)
    .where(eq(teamseasons.teamId, teamId))
    .orderBy(desc(teamseasons.seasonId))
    .limit(5)
    .then((result) =>
      result.map((season) => season.seasonId),
    )

  const getTables = await db
    .select({
      seasonId: teamgames.seasonId,
      group: series.group as unknown as SQL<string>,
      category: series.category as unknown as SQL<string>,
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
      serie: {
        serieName: series.serieName,
        level: series.level,
        competition: {
          competitionName: competitions.competitionName,
          division: competitions.division,
        },
      } as unknown as SQL<{
        serieName: string
        level: number
        competition: {
          competitionName: string
          division: number
        }
      }>,
      season: {
        year: seasons.year,
      } as unknown as SQL<{ year: string }>,
    })
    .from(teamgames)
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .leftJoin(
      competitions,
      eq(series.competitionId, competitions.competitionId),
    )
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.played, true),
        inArray(teamgames.seasonId, seasonIdArray),
      ),
    )

    .groupBy(
      teamgames.seasonId,
      series.group,
      seasons.seasonId,
      series.serieName,
      series.level,
      series.category,
      competitions.competitionName,
      competitions.division,
    )
    .orderBy(
      desc(teamgames.seasonId),
      asc(competitions.division),
      asc(series.level),
    )

  const tableSeasons = new Set(
    getTables.map((season) => season.seasonId),
  )

  const unparsedSeasons = seasonIdArray.filter(
    (id) => !tableSeasons.has(id),
  )

  if (unparsedSeasons.length === 0) {
    return sortCompetition(getTables)
  } else {
    const teamTables = await db
      .select({
        seasonId: tables.seasonId,
        group: series.group as unknown as SQL<string>,
        category: series.category as unknown as SQL<string>,
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
          level: series.level,
          competition: {
            competitionName: competitions.competitionName,
            division: competitions.division,
          },
        } as unknown as SQL<{
          serieName: string
          level: number
          competition: {
            competitionName: string
            division: number
          }
        }>,
        season: {
          year: seasons.year,
        } as unknown as SQL<{ year: string }>,
      })
      .from(tables)
      .leftJoin(series, eq(series.serieId, tables.serieId))
      .leftJoin(
        seasons,
        eq(tables.seasonId, seasons.seasonId),
      )
      .leftJoin(
        competitions,
        eq(
          series.competitionId,
          competitions.competitionId,
        ),
      )
      .where(
        and(
          eq(tables.teamId, teamId),
          inArray(tables.seasonId, unparsedSeasons),
        ),
      )
      .orderBy(
        desc(seasons.seasonId),
        asc(competitions.division),
        asc(series.level),
      )

    return sortCompetition(
      [...getTables, ...teamTables].sort(
        (a, b) => b.seasonId - a.seasonId,
      ),
    )
  }
}

function sortCompetition(
  tableArray: Array<FiveSeasonTableItem>,
): Array<FiveSeason> {
  const sortSeasons = tableArray.reduce<
    Record<string, Array<FiveSeasonTableItem>>
  >((acc, row) => {
    const season = row.season.year

    if (typeof acc[season] === 'undefined') {
      acc[season] = []
    }

    acc[season].push(row)

    return acc
  }, {})

  const sortedSeasons = Object.keys(sortSeasons).map(
    (season) => {
      return {
        season,

        tables: sortSeasons[season],
      }
    },
  )

  const sortCompetitions = sortedSeasons.map((season) => {
    const sortComps = season.tables.reduce<
      Record<
        string,
        {
          competitionName: string
          division: number
          tables: Array<FiveSeasonTableItem>
        }
      >
    >((acc, row) => {
      const competitionName =
        row.serie.competition.competitionName
      const division = row.serie.competition.division
      if (typeof acc[competitionName] === 'undefined') {
        acc[competitionName] = {
          competitionName,
          division,
          tables: [],
        }
      }
      acc[competitionName].tables.push(row)
      return acc
    }, {})

    const sortedComps = Object.keys(sortComps).map(
      (comp) => {
        return sortComps[comp]
      },
    )

    return {
      season: season.season,
      competitions: sortedComps,
    }
  })

  return sortCompetitions
}
