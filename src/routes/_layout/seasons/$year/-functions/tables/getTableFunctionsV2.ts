import { db } from '@/db'
import {
  seasons,
  series,
  teamlogos,
  teamnames,
  teams,
  teamseasons,
} from '@/db/schema'
import {
  groupedSeriesTablesView,
  homeAndAwaySeriesTablesMaterializedView,
} from '@/db/views/seriesTablesViews'
import { coalesce } from '@/lib/drizzleHelpers/coalesce'
import {
  jsonAggBuildObject,
  jsonBuildObject,
} from '@/lib/drizzleHelpers/jsonAggjsonBuildObject'
import type { TeamSeasonTableV2 } from '@/lib/types/table'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import type { SQL } from 'drizzle-orm'
import { and, asc, desc, eq } from 'drizzle-orm'
import {
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
  const tableJson =
    table === 'all'
      ? await db
          .select({
            serieId:
              series.serieId as unknown as SQL<number>,
            serieName:
              series.serieName as unknown as SQL<string>,
            comment: series.comment as unknown as SQL<
              string | null
            >,
            serieStructure:
              series.serieStructure as unknown as SQL<
                Array<number> | null | undefined
              >,
            hasStatic: series.hasStatic as unknown as SQL<
              boolean | null
            >,
            tableArray: jsonAggBuildObject<
              Array<TeamSeasonTableV2>
            >(
              {
                team: jsonBuildObject<TeamBaseWithLogo>({
                  teamId: groupedSeriesTablesView.teamId,
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
                  groupedSeriesTablesView.totalGames as unknown as SQL<number>,
                totalWins:
                  groupedSeriesTablesView.totalWins as unknown as SQL<number>,
                totalDraws:
                  groupedSeriesTablesView.totalDraws as unknown as SQL<number>,
                totalLost:
                  groupedSeriesTablesView.totalLost as unknown as SQL<number>,
                totalGoalsScored:
                  groupedSeriesTablesView.totalGoalsScored as unknown as SQL<number>,
                totalGoalsConceded:
                  groupedSeriesTablesView.totalGoalsConceded as unknown as SQL<number>,
                totalGoalDifference:
                  groupedSeriesTablesView.totalGoalDifference as unknown as SQL<number>,
                totalPoints:
                  groupedSeriesTablesView.totalPoints as unknown as SQL<number>,
              },
              {
                orderBy: [
                  desc(groupedSeriesTablesView.totalPoints),
                  desc(
                    groupedSeriesTablesView.totalGoalDifference,
                  ),
                  desc(
                    groupedSeriesTablesView.totalGoalsScored,
                  ),
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
          .from(groupedSeriesTablesView)
          .leftJoin(
            teams,
            eq(
              groupedSeriesTablesView.teamId,
              teams.teamId,
            ),
          )
          .leftJoin(
            series,
            eq(
              series.serieId,
              groupedSeriesTablesView.serieId,
            ),
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
            eq(
              teamseasonName.logoId,
              teamseasonLogo.logoId,
            ),
          )
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
          )
          .groupBy(
            series.serieId,
            series.serieName,
            series.comment,
            series.serieStructure,
            series.hasStatic,
          )
      : await db
          .select({
            serieId:
              series.serieId as unknown as SQL<number>,
            serieName:
              series.serieName as unknown as SQL<string>,
            comment: series.comment as unknown as SQL<
              string | null
            >,
            serieStructure:
              series.serieStructure as unknown as SQL<
                Array<number> | null | undefined
              >,
            hasStatic: series.hasStatic as unknown as SQL<
              boolean | null
            >,
            tableArray: jsonAggBuildObject<
              Array<TeamSeasonTableV2>
            >(
              {
                team: jsonBuildObject<TeamBaseWithLogo>({
                  teamId:
                    homeAndAwaySeriesTablesMaterializedView.teamId,
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
                  homeAndAwaySeriesTablesMaterializedView.totalGames as unknown as SQL<number>,
                totalWins:
                  homeAndAwaySeriesTablesMaterializedView.totalWins as unknown as SQL<number>,
                totalDraws:
                  homeAndAwaySeriesTablesMaterializedView.totalDraws as unknown as SQL<number>,
                totalLost:
                  homeAndAwaySeriesTablesMaterializedView.totalLost as unknown as SQL<number>,
                totalGoalsScored:
                  homeAndAwaySeriesTablesMaterializedView.totalGoalsScored as unknown as SQL<number>,
                totalGoalsConceded:
                  homeAndAwaySeriesTablesMaterializedView.totalGoalsConceded as unknown as SQL<number>,
                totalGoalDifference:
                  homeAndAwaySeriesTablesMaterializedView.totalGoalDifference as unknown as SQL<number>,
                totalPoints:
                  homeAndAwaySeriesTablesMaterializedView.totalPoints as unknown as SQL<number>,
              },
              {
                orderBy: [
                  desc(
                    homeAndAwaySeriesTablesMaterializedView.totalPoints,
                  ),
                  desc(
                    homeAndAwaySeriesTablesMaterializedView.totalGoalDifference,
                  ),
                  desc(
                    homeAndAwaySeriesTablesMaterializedView.totalGoalsScored,
                  ),
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
          .from(homeAndAwaySeriesTablesMaterializedView)
          .leftJoin(
            teams,
            eq(
              homeAndAwaySeriesTablesMaterializedView.teamId,
              teams.teamId,
            ),
          )
          .leftJoin(
            series,
            eq(
              series.serieId,
              homeAndAwaySeriesTablesMaterializedView.serieId,
            ),
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
            eq(
              teamseasonName.logoId,
              teamseasonLogo.logoId,
            ),
          )
          .where(
            and(
              eq(
                homeAndAwaySeriesTablesMaterializedView.homeGame,
                table === 'home' ? true : false,
              ),
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
          )
          .groupBy(
            series.serieId,
            series.serieName,
            series.comment,
            series.serieStructure,
            series.hasStatic,
          )

  return tableJson
}
