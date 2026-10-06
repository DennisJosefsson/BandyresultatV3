import { db } from '@/db'
import {
  competitions,
  seasons,
  series,
  teamseries,
} from '@/db/schema'
import { mvSeriesData } from '@/db/views/seriesViews'
import {
  mvTeamSeasonGames,
  mvTeamSeasonTables,
} from '@/db/views/teamSeasonViews'
import {
  jsonAgg,
  jsonAggBuildObject,
  jsonBuildObject,
} from '@/lib/drizzleHelpers/jsonAggjsonBuildObject'
import type { TeamSeasonTableSerieV2 } from '@/lib/types/table'
import { and, asc, eq, sql } from 'drizzle-orm'

export const preparedSeasonResultArrayV2 = db
  .select({
    competitionName: competitions.competitionName,
    seriesArray:
      jsonAgg<Array<TeamSeasonTableSerieV2> | null>(
        mvSeriesData.serieObject,
        { orderBy: [asc(series.level)] },
      ),
  })
  .from(mvSeriesData)
  .innerJoin(
    teamseries,
    eq(mvSeriesData.serieId, teamseries.serieId),
  )
  .innerJoin(
    series,
    eq(series.serieId, mvSeriesData.serieId),
  )
  .innerJoin(
    competitions,
    eq(competitions.competitionId, series.competitionId),
  )
  .where(
    and(
      eq(teamseries.teamId, sql.placeholder('teamId')),
      eq(
        series.seasonId,
        db
          .select({ seasonId: seasons.seasonId })
          .from(seasons)
          .where(
            and(
              eq(
                seasons.intYear,
                sql.placeholder('intYear'),
              ),
              eq(seasons.women, sql.placeholder('women')),
            ),
          ),
      ),
    ),
  )
  .groupBy(
    competitions.competitionName,
    competitions.division,
  )
  .orderBy(asc(competitions.division))
  .prepare('preparedSeasonResultArrayV2')

export const preparedSeasonResultArrayV3 = db
  .select({
    competitionName: competitions.competitionName,
    seriesArray:
      jsonAggBuildObject<Array<TeamSeasonTableSerieV2> | null>(
        {
          games: jsonBuildObject({
            played: mvTeamSeasonGames.played,
            unplayed: mvTeamSeasonGames.unplayed,
          }),
          tableArray: mvTeamSeasonTables.tables,
          serieName: series.serieName,
          comment: series.comment,
          hasStatic: series.hasStatic,
          serieStructure: series.serieStructure,
        },
        { orderBy: [asc(series.level)] },
      ),
  })
  .from(mvTeamSeasonTables)
  .leftJoin(
    mvTeamSeasonGames,
    and(
      eq(
        mvTeamSeasonGames.seasonId,
        mvTeamSeasonTables.seasonId,
      ),
      eq(
        mvTeamSeasonGames.serieId,
        mvTeamSeasonTables.serieId,
      ),
      eq(
        mvTeamSeasonGames.teamId,
        mvTeamSeasonTables.teamId,
      ),
    ),
  )
  .innerJoin(
    series,
    eq(series.serieId, mvTeamSeasonTables.serieId),
  )
  .innerJoin(
    seasons,
    eq(seasons.seasonId, mvTeamSeasonTables.seasonId),
  )
  .innerJoin(
    competitions,
    eq(competitions.competitionId, series.competitionId),
  )
  .where(
    and(
      eq(
        mvTeamSeasonTables.teamId,
        sql.placeholder('teamId'),
      ),
      eq(
        mvTeamSeasonTables.seasonId,
        db
          .select({ seasonId: seasons.seasonId })
          .from(seasons)
          .where(
            and(
              eq(
                seasons.intYear,
                sql.placeholder('intYear'),
              ),
              eq(seasons.women, sql.placeholder('women')),
            ),
          ),
      ),
    ),
  )
  .groupBy(
    competitions.competitionName,
    competitions.division,
  )
  .orderBy(asc(competitions.division))
  .prepare('preparedSeasonResultArrayV3')
