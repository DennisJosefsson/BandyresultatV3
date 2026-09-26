import { db } from '@/db'
import {
  competitions,
  games,
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
import type { TeamSeasonGame } from '@/lib/types/game'
import type {
  TeamSeasonTableSerie,
  TeamSeasonTableV2,
} from '@/lib/types/table'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import {
  away,
  awayLogo,
  awayTeamName,
  awayTeamSeason,
  awayTeamSeasonLogo,
  awayTeamSeasonName,
  home,
  homeLogo,
  homeTeamName,
  homeTeamSeason,
  homeTeamSeasonLogo,
  homeTeamSeasonName,
  opponentTeamseries,
  teamTeamseries,
  teamseasonLogo,
  teamseasonName,
} from '@/routes/_layout/seasons/$year/-functions/libs/aliases'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  desc,
  eq,
  getTableColumns,
  inArray,
  ne,
  or,
  sql,
} from 'drizzle-orm'
import { unionAll } from 'drizzle-orm/pg-core'

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
    .innerJoin(
      teamseries,
      and(eq(teamseries.serieId, series.serieId)),
    )
    .where(
      and(
        inArray(
          series.seasonId,
          db
            .select({ seasonId: seasons.seasonId })
            .from(seasons)
            .where(
              eq(
                seasons.intYear,
                sql.placeholder('intYear'),
              ),
            ),
        ),
        eq(teamseries.teamId, sql.placeholder('teamId')),
      ),
    ),
)

const selectedTeamGamesRaw = db
  .$with('selected_team_games_raw')
  .as(
    unionAll(
      db
        .with(targetSeries)
        .select({
          ...getTableColumns(games),
          sourceSerieId: aliasedColumn(
            games.serieId,
            'source_serie_id',
          ),
          displaySerieId: aliasedColumn(
            games.serieId,
            'display_serie_id',
          ),
        })
        .from(games)
        .innerJoin(
          targetSeries,
          eq(targetSeries.serieId, games.serieId),
        )
        .where(
          and(
            or(
              eq(
                games.homeTeamId,
                sql.placeholder('teamId'),
              ),
              eq(
                games.awayTeamId,
                sql.placeholder('teamId'),
              ),
            ),
            ne(targetSeries.group, 'mix'),
          ),
        ),
      db
        .with(targetSeries)
        .select({
          ...getTableColumns(games),
          sourceSerieId: aliasedColumn(
            games.serieId,
            'source_serie_id',
          ),
          displaySerieId: aliasedColumn(
            targetSeries.serieId,
            'display_serie_id',
          ),
        })
        .from(games)
        .innerJoin(
          parentchildseries,
          eq(parentchildseries.parentId, games.serieId),
        )
        .innerJoin(
          series,
          eq(series.serieId, parentchildseries.parentId),
        )
        .innerJoin(
          targetSeries,
          eq(
            targetSeries.serieId,
            parentchildseries.childId,
          ),
        )
        .where(
          and(
            or(
              eq(
                games.homeTeamId,
                sql.placeholder('teamId'),
              ),
              eq(
                games.awayTeamId,
                sql.placeholder('teamId'),
              ),
            ),
            eq(targetSeries.hasMix, true),
            eq(series.group, 'mix'),
          ),
        ),
    ),
  )

const gameJson = db.$with('game_json').as(
  db
    .with(selectedTeamGamesRaw)
    .select({
      serieId: selectedTeamGamesRaw.displaySerieId,
      played: jsonAggBuildObject<Array<TeamSeasonGame>>(
        {
          gameId: selectedTeamGamesRaw.gameId,
          homeTeamId: selectedTeamGamesRaw.homeTeamId,
          awayTeamId: selectedTeamGamesRaw.awayTeamId,
          date: selectedTeamGamesRaw.date,
          serieId: selectedTeamGamesRaw.serieId,
          result: selectedTeamGamesRaw.result,
          homeGoal: selectedTeamGamesRaw.homeGoal,
          awayGoal: selectedTeamGamesRaw.awayGoal,
          halftimeResult:
            selectedTeamGamesRaw.halftimeResult,
          played: selectedTeamGamesRaw.played,
          otResult: selectedTeamGamesRaw.otResult,
          penalties: selectedTeamGamesRaw.penalties,
          extraTime: selectedTeamGamesRaw.extraTime,
          home: jsonBuildObject<TeamBaseWithLogo>({
            teamId: home.teamId,
            name: coalesce(
              homeTeamSeasonName.name,
              homeTeamName.name,
            ),
            casualName: coalesce(
              homeTeamSeasonName.casualName,
              homeTeamName.casualName,
            ),
            shortName: coalesce(
              homeTeamSeasonName.shortName,
              homeTeamName.shortName,
            ),
            logo: jsonBuildObject({
              logoId: coalesce(
                homeTeamSeasonLogo.logoId,
                homeLogo.logoId,
              ),
              hasDark: coalesce(
                homeTeamSeasonLogo.hasDark,
                homeLogo.hasDark,
              ),
            }),
          }),
          away: jsonBuildObject<TeamBaseWithLogo>({
            teamId: away.teamId,
            name: coalesce(
              awayTeamSeasonName.name,
              awayTeamName.name,
            ),
            casualName: coalesce(
              awayTeamSeasonName.casualName,
              awayTeamName.casualName,
            ),
            shortName: coalesce(
              awayTeamSeasonName.shortName,
              awayTeamName.shortName,
            ),
            logo: jsonBuildObject({
              logoId: coalesce(
                awayTeamSeasonLogo.logoId,
                awayLogo.logoId,
              ),
              hasDark: coalesce(
                awayTeamSeasonLogo.hasDark,
                awayLogo.hasDark,
              ),
            }),
          }),
        },
        {
          orderBy: [desc(selectedTeamGamesRaw.date)],
          filter: eq(selectedTeamGamesRaw.played, true),
        },
      ).as('played'),
      unplayed: jsonAggBuildObject<Array<TeamSeasonGame>>(
        {
          gameId: selectedTeamGamesRaw.gameId,
          homeTeamId: selectedTeamGamesRaw.homeTeamId,
          awayTeamId: selectedTeamGamesRaw.awayTeamId,
          date: selectedTeamGamesRaw.date,
          serieId: selectedTeamGamesRaw.serieId,
          result: selectedTeamGamesRaw.result,
          homeGoal: selectedTeamGamesRaw.homeGoal,
          awayGoal: selectedTeamGamesRaw.awayGoal,
          halftimeResult:
            selectedTeamGamesRaw.halftimeResult,
          played: selectedTeamGamesRaw.played,
          otResult: selectedTeamGamesRaw.otResult,
          penalties: selectedTeamGamesRaw.penalties,
          extraTime: selectedTeamGamesRaw.extraTime,
          home: jsonBuildObject<TeamBaseWithLogo>({
            teamId: home.teamId,
            name: coalesce(
              homeTeamSeasonName.name,
              homeTeamName.name,
            ),
            casualName: coalesce(
              homeTeamSeasonName.casualName,
              homeTeamName.casualName,
            ),
            shortName: coalesce(
              homeTeamSeasonName.shortName,
              homeTeamName.shortName,
            ),
            logo: jsonBuildObject({
              logoId: coalesce(
                homeTeamSeasonLogo.logoId,
                homeLogo.logoId,
              ),
              hasDark: coalesce(
                homeTeamSeasonLogo.hasDark,
                homeLogo.hasDark,
              ),
            }),
          }),
          away: jsonBuildObject<TeamBaseWithLogo>({
            teamId: away.teamId,
            name: coalesce(
              awayTeamSeasonName.name,
              awayTeamName.name,
            ),
            casualName: coalesce(
              awayTeamSeasonName.casualName,
              awayTeamName.casualName,
            ),
            shortName: coalesce(
              awayTeamSeasonName.shortName,
              awayTeamName.shortName,
            ),
            logo: jsonBuildObject({
              logoId: coalesce(
                awayTeamSeasonLogo.logoId,
                awayLogo.logoId,
              ),
              hasDark: coalesce(
                awayTeamSeasonLogo.hasDark,
                awayLogo.hasDark,
              ),
            }),
          }),
        },
        {
          orderBy: [asc(selectedTeamGamesRaw.date)],
          filter: eq(selectedTeamGamesRaw.played, false),
        },
      ).as('unplayed'),
    })
    .from(selectedTeamGamesRaw)
    .leftJoin(
      home,
      eq(selectedTeamGamesRaw.homeTeamId, home.teamId),
    )
    .leftJoin(
      away,
      eq(selectedTeamGamesRaw.awayTeamId, away.teamId),
    )
    .leftJoin(
      homeTeamSeason,
      and(
        eq(
          homeTeamSeason.seasonId,
          selectedTeamGamesRaw.seasonId,
        ),
        eq(
          homeTeamSeason.teamId,
          selectedTeamGamesRaw.homeTeamId,
        ),
      ),
    )
    .leftJoin(
      awayTeamSeason,
      and(
        eq(
          awayTeamSeason.seasonId,
          selectedTeamGamesRaw.seasonId,
        ),
        eq(
          awayTeamSeason.teamId,
          selectedTeamGamesRaw.awayTeamId,
        ),
      ),
    )
    .leftJoin(
      homeTeamName,
      eq(home.teamnameId, homeTeamName.teamnameId),
    )
    .leftJoin(
      awayTeamName,
      eq(away.teamnameId, awayTeamName.teamnameId),
    )
    .leftJoin(
      homeTeamSeasonName,
      eq(
        homeTeamSeason.teamnameId,
        homeTeamSeasonName.teamnameId,
      ),
    )
    .leftJoin(
      awayTeamSeasonName,
      eq(
        awayTeamSeason.teamnameId,
        awayTeamSeasonName.teamnameId,
      ),
    )
    .leftJoin(
      homeLogo,
      eq(homeTeamName.logoId, homeLogo.logoId),
    )
    .leftJoin(
      awayLogo,
      eq(awayTeamName.logoId, awayLogo.logoId),
    )
    .leftJoin(
      homeTeamSeasonLogo,
      eq(
        homeTeamSeasonName.logoId,
        homeTeamSeasonLogo.logoId,
      ),
    )
    .leftJoin(
      awayTeamSeasonLogo,
      eq(
        awayTeamSeasonName.logoId,
        awayTeamSeasonLogo.logoId,
      ),
    )
    .groupBy(selectedTeamGamesRaw.displaySerieId),
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
      draw: sql`false::boolean`.mapWith(Boolean).as('draw'),
      lost: sql`false::boolean`.mapWith(Boolean).as('lost'),
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
    .where(eq(teamgames.played, true)),
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
        teamTeamseries,
        and(
          eq(teamTeamseries.serieId, targetSeries.serieId),
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
        goalDifference: filteredParentGames.goalDifference,
        points: filteredParentGames.points,
      })
      .from(filteredParentGames),
  ),
)

const aggregatedColumns = db.$with('aggregated_columns').as(
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
    .innerJoin(teams, eq(teams.teamId, countedRows.teamId))
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
      eq(teamseasonName.teamnameId, teamseasons.teamnameId),
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
    .with(visibleSeries, gameJson, tableJson)
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
          gameObject: jsonBuildObject<{
            played: Array<TeamSeasonGame>
            unplayed: Array<TeamSeasonGame>
          }>({
            played: gameJson.played as unknown as SQL<
              Array<TeamSeasonGame>
            >,
            unplayed: gameJson.unplayed as unknown as SQL<
              Array<TeamSeasonGame>
            >,
          }),
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
      gameJson,
      eq(gameJson.serieId, visibleSeries.serieId),
    )
    .leftJoin(
      tableJson,
      eq(tableJson.serieId, visibleSeries.serieId),
    )
    .groupBy(series.competitionId),
)

export const preparedSeasonResultArray = db
  .with(seriesCte)
  .select({
    competitionName:
      competitions.competitionName as unknown as SQL<string>,
    seriesArray: seriesCte.seriesArray,
  })
  .from(seriesCte)
  .leftJoin(
    competitions,
    eq(competitions.competitionId, seriesCte.competitionId),
  )
  .orderBy(asc(competitions.division))
  .prepare('preparedSeasonResultArray')
