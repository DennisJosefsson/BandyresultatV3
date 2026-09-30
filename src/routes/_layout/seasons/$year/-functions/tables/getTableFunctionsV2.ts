import { db } from '@/db'
import {
  competitions,
  parentchildseries,
  seasons,
  series,
  tables,
  teamgames,
  teamlogos,
  teamnames,
  teams,
  teamseasons,
  teamseries,
} from '@/db/schema'
import { aliasedColumn } from '@/lib/drizzleHelpers/aliasedColumn'
import { coalesce } from '@/lib/drizzleHelpers/coalesce'
import {
  jsonAggBuildObject,
  jsonBuildObject,
} from '@/lib/drizzleHelpers/jsonAggjsonBuildObject'
import type {
  TeamSeasonTableSerie,
  TeamSeasonTableV2,
} from '@/lib/types/table'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import type { SQL } from 'drizzle-orm'
import { and, asc, desc, eq, ne, sql } from 'drizzle-orm'
import { unionAll } from 'drizzle-orm/pg-core'
import {
  opponentTeamseries,
  teamTeamseries,
  teamseasonLogo,
  teamseasonName,
} from '../libs/aliases'

type GetSortedTablesProps = {
  intYear: number
  group: string
  women: boolean
  table: 'all' | 'home' | 'away'
}

export const getSortedSeriesTables = async ({
  intYear,
  group,
  women,
  table,
}: GetSortedTablesProps) => {
  const targetSeries = db.$with('target_series').as(
    db
      .select({
        serieId: series.serieId,
        serieName: series.serieName,
        seasonId: series.seasonId,
        hasParent: series.hasParent,
        allParentGames: series.allParentGames,
        hasMix: series.hasMix,
        group: series.group,
      })
      .from(series)
      .where(
        and(
          eq(series.group, group),
          eq(
            series.seasonId,
            db
              .select({ seasonId: seasons.seasonId })
              .from(seasons)
              .where(
                and(
                  eq(seasons.intYear, intYear),
                  eq(seasons.women, women),
                ),
              ),
          ),
        ),
      ),
  )

  const seriesTeam = db.$with('series_team').as(
    db
      .with(targetSeries)
      .select({
        serieId: teamseries.serieId,
        teamId: teamseries.teamId,
        bonusPoints: teamseries.bonusPoints,
      })
      .from(teamseries)
      .innerJoin(
        targetSeries,
        eq(teamseries.serieId, targetSeries.serieId),
      ),
  )

  const zeroRows = db.$with('zero_rows').as(
    db
      .with(seriesTeam)
      .select({
        standingSerieId: aliasedColumn(
          seriesTeam.serieId,
          'standing_serie_id',
        ),
        teamId: seriesTeam.teamId,
        games: sql<number>`0::int`
          .mapWith(Number)
          .as('games'),
        won: sql`false::boolean`.mapWith(Boolean).as('won'),
        draw: sql`false::boolean`
          .mapWith(Boolean)
          .as('draw'),
        lost: sql`false::boolean`
          .mapWith(Boolean)
          .as('lost'),
        goalsScored: sql<number>`0::int`
          .mapWith(Number)
          .as('goals_scored'),
        goalsConceded: sql<number>`0::int`
          .mapWith(Number)
          .as('goals_conceded'),
        goalDifference: sql<number>`0::int`
          .mapWith(Number)
          .as('goal_difference'),
        points: coalesce(
          seriesTeam.bonusPoints,
          sql<number>`0::int`,
        )
          .mapWith(Number)
          .as('points'),
      })
      .from(seriesTeam)
      .innerJoin(
        series,
        eq(seriesTeam.serieId, series.serieId),
      ),
  )

  const directGames = db.$with('direct_games').as(
    db
      .with(targetSeries)
      .select({
        standingSerieId: aliasedColumn(
          teamgames.serieId,
          'standing_serie_id',
        ),
        teamId: teamgames.teamId as unknown as SQL<number>,
        games: sql<number>`1::int`
          .mapWith(Number)
          .as('games'),
        won: coalesce(teamgames.otWin, teamgames.win)
          .mapWith(Boolean)
          .as('won'),
        draw: coalesce(teamgames.draw, sql`false::boolean`)
          .mapWith(Boolean)
          .as('draw'),
        lost: coalesce(teamgames.otLost, teamgames.lost)
          .mapWith(Boolean)
          .as('lost'),
        goalsScored: coalesce(
          teamgames.otGoalsScored,
          teamgames.goalsScored,
          sql<number>`0::int`,
        ).as('goals_scored'),
        goalsConceded: coalesce(
          teamgames.otGoalsConceded,
          teamgames.goalsConceded,
          sql<number>`0::int`,
        ).as('goals_conceded'),
        goalDifference: coalesce(
          teamgames.goalDifference,
          sql<number>`0::int`,
        )
          .mapWith(Number)
          .as('goal_difference'),
        points: coalesce(
          teamgames.points,
          sql<number>`0::int`,
        )
          .mapWith(Number)
          .as('points'),
      })
      .from(teamgames)
      .innerJoin(
        targetSeries,
        eq(teamgames.serieId, targetSeries.serieId),
      )
      .where(
        and(
          eq(teamgames.played, true),
          table === 'home'
            ? eq(teamgames.homeGame, true)
            : table === 'away'
              ? eq(teamgames.homeGame, false)
              : undefined,
        ),
      ),
  )

  const mixGames = db.$with('mix_games').as(
    db
      .with(targetSeries)
      .select({
        standingSerieId: aliasedColumn(
          targetSeries.serieId,
          'standing_serie_id',
        ),
        teamId: teamgames.teamId as unknown as SQL<number>,
        games: sql<number>`1::int`
          .mapWith(Number)
          .as('games'),
        won: coalesce(teamgames.otWin, teamgames.win)
          .mapWith(Boolean)
          .as('won'),
        draw: coalesce(teamgames.draw, sql`false::boolean`)
          .mapWith(Boolean)
          .as('draw'),
        lost: coalesce(teamgames.otLost, teamgames.lost)
          .mapWith(Boolean)
          .as('lost'),
        goalsScored: coalesce(
          teamgames.otGoalsScored,
          teamgames.goalsScored,
          sql<number>`0::int`,
        ).as('goals_scored'),
        goalsConceded: coalesce(
          teamgames.otGoalsConceded,
          teamgames.goalsConceded,
          sql<number>`0::int`,
        ).as('goals_conceded'),
        goalDifference: coalesce(
          teamgames.goalDifference,
          sql<number>`0::int`,
        )
          .mapWith(Number)
          .as('goal_difference'),
        points: coalesce(
          teamgames.points,
          sql<number>`0::int`,
        )
          .mapWith(Number)
          .as('points'),
      })
      .from(targetSeries)
      .innerJoin(
        parentchildseries,
        eq(parentchildseries.childId, targetSeries.serieId),
      )
      .innerJoin(
        teamgames,
        eq(teamgames.serieId, parentchildseries.parentId),
      )
      .innerJoin(
        teamseries,
        and(
          eq(teamseries.teamId, teamgames.teamId),
          eq(teamseries.serieId, targetSeries.serieId),
        ),
      )
      .where(
        and(
          eq(targetSeries.hasParent, true),
          eq(targetSeries.allParentGames, true),
          eq(targetSeries.hasMix, true),
          eq(teamgames.played, true),
          table === 'home'
            ? eq(teamgames.homeGame, true)
            : table === 'away'
              ? eq(teamgames.homeGame, false)
              : undefined,
        ),
      ),
  )

  const allParentGames = db.$with('all_parent_games').as(
    db
      .with(targetSeries)
      .select({
        standingSerieId: aliasedColumn(
          targetSeries.serieId,
          'standing_serie_id',
        ),
        teamId: teamgames.teamId as unknown as SQL<number>,
        games: sql<number>`1::int`
          .mapWith(Number)
          .as('games'),
        won: coalesce(teamgames.otWin, teamgames.win)
          .mapWith(Boolean)
          .as('won'),
        draw: coalesce(teamgames.draw, sql`false::boolean`)
          .mapWith(Boolean)
          .as('draw'),
        lost: coalesce(teamgames.otLost, teamgames.lost)
          .mapWith(Boolean)
          .as('lost'),
        goalsScored: coalesce(
          teamgames.otGoalsScored,
          teamgames.goalsScored,
          sql<number>`0::int`,
        ).as('goals_scored'),
        goalsConceded: coalesce(
          teamgames.otGoalsConceded,
          teamgames.goalsConceded,
          sql<number>`0::int`,
        ).as('goals_conceded'),
        goalDifference: coalesce(
          teamgames.goalDifference,
          sql<number>`0::int`,
        )
          .mapWith(Number)
          .as('goal_difference'),
        points: coalesce(
          teamgames.points,
          sql<number>`0::int`,
        )
          .mapWith(Number)
          .as('points'),
      })
      .from(targetSeries)
      .innerJoin(
        parentchildseries,
        eq(parentchildseries.childId, targetSeries.serieId),
      )
      .innerJoin(
        teamgames,
        eq(teamgames.serieId, parentchildseries.parentId),
      )
      .innerJoin(
        teamseries,
        and(
          eq(teamseries.teamId, teamgames.teamId),
          eq(teamseries.serieId, targetSeries.serieId),
        ),
      )
      .where(
        and(
          eq(targetSeries.hasParent, true),
          eq(targetSeries.allParentGames, true),
          eq(targetSeries.hasMix, false),
          eq(teamgames.played, true),
        ),
      ),
  )

  const filteredParentGames = db
    .$with('filtered_parent_games')
    .as(
      db
        .with(targetSeries)
        .select({
          standingSerieId: aliasedColumn(
            targetSeries.serieId,
            'standing_serie_id',
          ),
          teamId:
            teamgames.teamId as unknown as SQL<number>,
          games: sql<number>`1::int`
            .mapWith(Number)
            .as('games'),
          won: coalesce(teamgames.otWin, teamgames.win)
            .mapWith(Boolean)
            .as('won'),
          draw: coalesce(
            teamgames.draw,
            sql`false::boolean`,
          )
            .mapWith(Boolean)
            .as('draw'),
          lost: coalesce(teamgames.otLost, teamgames.lost)
            .mapWith(Boolean)
            .as('lost'),
          goalsScored: coalesce(
            teamgames.otGoalsScored,
            teamgames.goalsScored,
            sql<number>`0::int`,
          ).as('goals_scored'),
          goalsConceded: coalesce(
            teamgames.otGoalsConceded,
            teamgames.goalsConceded,
            sql<number>`0::int`,
          ).as('goals_conceded'),
          goalDifference: coalesce(
            teamgames.goalDifference,
            sql<number>`0::int`,
          )
            .mapWith(Number)
            .as('goal_difference'),
          points: coalesce(
            teamgames.points,
            sql<number>`0::int`,
          )
            .mapWith(Number)
            .as('points'),
        })
        .from(targetSeries)
        .innerJoin(
          parentchildseries,
          eq(
            parentchildseries.childId,
            targetSeries.serieId,
          ),
        )
        .innerJoin(
          teamgames,
          eq(teamgames.serieId, parentchildseries.parentId),
        )
        .innerJoin(
          teamTeamseries,
          and(
            eq(
              teamTeamseries.serieId,
              targetSeries.serieId,
            ),
            eq(teamTeamseries.teamId, teamgames.teamId),
          ),
        )
        .innerJoin(
          opponentTeamseries,
          and(
            eq(
              opponentTeamseries.serieId,
              targetSeries.serieId,
            ),
            eq(
              opponentTeamseries.teamId,
              teamgames.opponentId,
            ),
          ),
        )
        .where(
          and(
            eq(targetSeries.hasParent, true),
            ne(targetSeries.allParentGames, true),
            eq(targetSeries.hasMix, false),
            eq(teamgames.played, true),
          ),
        ),
    )

  const countedRows = db.$with('counted_rows').as(
    unionAll(
      db
        .with(zeroRows)
        .select({
          standingSerieId: zeroRows.standingSerieId,
          teamId: zeroRows.teamId,
          games: zeroRows.games,
          won: zeroRows.won,
          draw: zeroRows.draw,
          lost: zeroRows.lost,
          goalsScored: zeroRows.goalsScored,
          goalsConceded: zeroRows.goalsConceded,
          goalDifference: zeroRows.goalDifference,
          points: zeroRows.points,
        })
        .from(zeroRows),
      db
        .with(directGames)
        .select({
          standingSerieId: directGames.standingSerieId,
          teamId: directGames.teamId,
          games: directGames.games,
          won: directGames.won,
          draw: directGames.draw,
          lost: directGames.lost,
          goalsScored: directGames.goalsScored,
          goalsConceded: directGames.goalsConceded,
          goalDifference: directGames.goalDifference,
          points: directGames.points,
        })
        .from(directGames),
      db
        .with(mixGames)
        .select({
          standingSerieId: mixGames.standingSerieId,
          teamId: mixGames.teamId,
          games: mixGames.games,
          won: mixGames.won,
          draw: mixGames.draw,
          lost: mixGames.lost,
          goalsScored: mixGames.goalsScored,
          goalsConceded: mixGames.goalsConceded,
          goalDifference: mixGames.goalDifference,
          points: mixGames.points,
        })
        .from(mixGames),
      db
        .with(allParentGames)
        .select({
          standingSerieId: allParentGames.standingSerieId,
          teamId: allParentGames.teamId,
          games: allParentGames.games,
          won: allParentGames.won,
          draw: allParentGames.draw,
          lost: allParentGames.lost,
          goalsScored: allParentGames.goalsScored,
          goalsConceded: allParentGames.goalsConceded,
          goalDifference: allParentGames.goalDifference,
          points: allParentGames.points,
        })
        .from(allParentGames),
      db
        .with(filteredParentGames)
        .select({
          standingSerieId:
            filteredParentGames.standingSerieId,
          teamId: filteredParentGames.teamId,
          games: filteredParentGames.games,
          won: filteredParentGames.won,
          draw: filteredParentGames.draw,
          lost: filteredParentGames.lost,
          goalsScored: filteredParentGames.goalsScored,
          goalsConceded: filteredParentGames.goalsConceded,
          goalDifference:
            filteredParentGames.goalDifference,
          points: filteredParentGames.points,
        })
        .from(filteredParentGames),
    ),
  )

  const aggregatedColumns = db
    .$with('aggregated_columns')
    .as(
      db
        .with(countedRows)
        .select({
          serieId: countedRows.standingSerieId,
          teamId: countedRows.teamId,
          totalGames:
            sql<number>`case when series.has_static is true then tables.games else sum(counted_rows.games) end`
              .mapWith(Number)
              .as('total_games'),
          totalWins:
            sql<number>`case when series.has_static is true then tables.won else cast(count(*) filter (where counted_rows.won) as int) end`
              .mapWith(Number)
              .as('total_wins'),
          totalDraws:
            sql<number>`case when series.has_static is true then tables.draw else cast(count(*) filter (where counted_rows.draw) as int) end`
              .mapWith(Number)
              .as('total_draws'),
          totalLost:
            sql<number>`case when series.has_static is true then tables.lost else cast(count(*) filter (where counted_rows.lost) as int) end`
              .mapWith(Number)
              .as('total_lost'),
          totalGoalsScored:
            sql<number>`case when series.has_static is true then tables.scored_goals else sum(counted_rows.goals_scored) end`
              .mapWith(Number)
              .as('total_goals_scored'),
          totalGoalsConceded:
            sql<number>`case when series.has_static is true then tables.conceded_goals else sum(counted_rows.goals_conceded) end`
              .mapWith(Number)
              .as('total_goals_conceded'),
          totalGoalDifference:
            sql<number>`case when series.has_static is true then tables.goal_difference else sum(counted_rows.goal_difference) end`
              .mapWith(Number)
              .as('total_goal_difference'),
          totalPoints:
            sql<number>`case when series.has_static is true then tables.points else sum(counted_rows.points) end`
              .mapWith(Number)
              .as('total_points'),
        })
        .from(countedRows)
        .leftJoin(
          series,
          eq(series.serieId, countedRows.standingSerieId),
        )
        .leftJoin(
          tables,
          and(
            eq(tables.teamId, countedRows.teamId),
            eq(tables.serieId, countedRows.standingSerieId),
          ),
        )
        .innerJoin(
          teams,
          eq(teams.teamId, countedRows.teamId),
        )
        .where(ne(series.group, 'mix'))
        .groupBy(
          countedRows.standingSerieId,
          countedRows.teamId,
          series.hasStatic,
          tables.games,
          tables.won,
          tables.draw,
          tables.lost,
          tables.scoredGoals,
          tables.concededGoals,
          tables.goalDifference,
          tables.points,
        ),
    )

  const query = db
    .with(aggregatedColumns)
    .select()
    .from(aggregatedColumns)
    .toSQL()

  console.log(query)

  const tableJson = db.$with('table_json').as(
    db
      .with(aggregatedColumns)
      .select({
        serieId: series.serieId,
        tableArray: jsonAggBuildObject<
          Array<TeamSeasonTableV2>
        >(
          {
            team: jsonBuildObject<TeamBaseWithLogo>({
              teamId: aggregatedColumns.teamId,
              name: coalesce(
                teamseasonName.name,
                teamnames.name,
              ),
              casualName: coalesce(
                teamseasonName.casualName,
                teamnames.casualName,
              ),
              shortName: coalesce(
                teamseasonName.shortName,
                teamnames.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  teamseasonLogo.logoId,
                  teamlogos.logoId,
                ),
                hasDark: coalesce(
                  teamseasonLogo.hasDark,
                  teamlogos.hasDark,
                ),
              }),
            }),
            totalGames:
              aggregatedColumns.totalGames as unknown as SQL<number>,
            totalWins:
              aggregatedColumns.totalWins as unknown as SQL<number>,
            totalDraws:
              aggregatedColumns.totalDraws as unknown as SQL<number>,
            totalLost:
              aggregatedColumns.totalLost as unknown as SQL<number>,
            totalGoalsScored:
              aggregatedColumns.totalGoalsScored as unknown as SQL<number>,
            totalGoalsConceded:
              aggregatedColumns.totalGoalsConceded as unknown as SQL<number>,
            totalGoalDifference:
              aggregatedColumns.totalGoalDifference as unknown as SQL<number>,
            totalPoints:
              aggregatedColumns.totalPoints as unknown as SQL<number>,
          },
          {
            orderBy: [
              desc(aggregatedColumns.totalPoints),
              desc(aggregatedColumns.totalGoalDifference),
              desc(aggregatedColumns.totalGoalsScored),
              asc(
                coalesce(
                  teamseasonName.casualName,
                  teamnames.casualName,
                ),
              ),
            ],
          },
        ).as('table_array'),
      })
      .from(aggregatedColumns)
      .leftJoin(
        teams,
        eq(aggregatedColumns.teamId, teams.teamId),
      )
      .leftJoin(
        series,
        eq(series.serieId, aggregatedColumns.serieId),
      )
      .leftJoin(
        teamnames,
        eq(teams.teamnameId, teamnames.teamnameId),
      )
      .leftJoin(
        teamseasons,
        and(
          eq(teamseasons.teamId, teams.teamId),
          eq(teamseasons.seasonId, series.seasonId),
        ),
      )
      .leftJoin(
        teamseasonName,
        eq(
          teamseasonName.teamnameId,
          teamseasons.teamnameId,
        ),
      )
      .leftJoin(
        teamlogos,
        eq(teamnames.logoId, teamlogos.logoId),
      )
      .leftJoin(
        teamseasonLogo,
        eq(teamseasonName.logoId, teamseasonLogo.logoId),
      )
      .groupBy(series.serieId),
  )

  const visibleSeries = db
    .$with('visible_series')
    .as(
      db
        .with(targetSeries)
        .select()
        .from(targetSeries)
        .where(ne(targetSeries.group, 'mix')),
    )

  const seriesCte = db.$with('series_cte').as(
    db
      .with(visibleSeries, tableJson)
      .select({
        competitionId: series.competitionId,
        seriesArray: jsonAggBuildObject<
          Array<TeamSeasonTableSerie>
        >(
          {
            comment: series.comment,
            serieName: series.serieName,
            serieStructure: series.serieStructure,
            tableArray:
              tableJson.tableArray as unknown as SQL<
                Array<TeamSeasonTableV2>
              >,
          },
          { orderBy: [asc(series.level)] },
        ).as('series_array'),
      })
      .from(visibleSeries)
      .leftJoin(
        series,
        eq(series.serieId, visibleSeries.serieId),
      )
      .leftJoin(
        tableJson,
        eq(tableJson.serieId, visibleSeries.serieId),
      )
      .groupBy(series.competitionId),
  )

  const seriesTables = await db
    .with(seriesCte)
    .select({
      competitionName:
        competitions.competitionName as unknown as SQL<string>,
      seriesArray: seriesCte.seriesArray,
    })
    .from(seriesCte)
    .leftJoin(
      competitions,
      eq(
        competitions.competitionId,
        seriesCte.competitionId,
      ),
    )
    .orderBy(asc(competitions.division))

  return seriesTables
}
