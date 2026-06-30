import { db } from '@/db'
import {
  seasons,
  series,
  teamgames,
  teamseries,
} from '@/db/schema'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  countDistinct,
  desc,
  eq,
  inArray,
  lt,
  or,
  sql,
} from 'drizzle-orm'
import { intersect } from 'drizzle-orm/pg-core'

export const getPreparedFirstDivisionSeasons = db
  .select({ count: countDistinct(series.seasonId) })
  .from(teamseries)
  .leftJoin(series, eq(series.serieId, teamseries.serieId))
  .where(
    and(
      eq(teamseries.teamId, sql.placeholder('teamId')),
      eq(series.level, 1),
      eq(series.category, 'regular'),
    ),
  )
  .prepare('getFistDivisionSeasons')

export const getPreparedSecondDivisionSeasons = db
  .selectDistinct({ seasonId: series.seasonId })
  .from(teamseries)
  .leftJoin(series, eq(series.serieId, teamseries.serieId))
  .where(
    and(
      eq(teamseries.teamId, sql.placeholder('teamId')),
      eq(series.level, 2),
      eq(series.category, 'regular'),
    ),
  )

export const preparedQualificationSeasons = db
  .selectDistinct({ seasonId: series.seasonId })
  .from(teamseries)
  .leftJoin(series, eq(series.serieId, teamseries.serieId))
  .where(
    and(
      eq(teamseries.teamId, sql.placeholder('teamId')),
      lt(series.level, 2),
    ),
  )

export const preparedIntersectSeasons = intersect(
  getPreparedSecondDivisionSeasons,
  preparedQualificationSeasons,
).prepare('intersect')

export const getPreparedFirstFirstDivisionSeason = db
  .select({
    year: seasons.year,
    seasonId: seasons.seasonId,
  })
  .from(teamseries)
  .leftJoin(series, eq(series.serieId, teamseries.serieId))
  .leftJoin(seasons, eq(series.seasonId, seasons.seasonId))
  .where(
    and(
      eq(teamseries.teamId, sql.placeholder('teamId')),
      eq(series.level, 1),
      or(
        inArray(series.category, [
          'regular',
          'eigth',
          'quarter',
          'semi',
          'final',
        ]),
        inArray(series.group, ['SlutspelA', 'SlutspelB']),
      ),
    ),
  )
  .orderBy(asc(seasons.seasonId))
  .limit(1)
  .prepare('firstFirstDivSeason')

export const getPreparedLatestFirstDivisionSeason = db
  .select({
    year: seasons.year,
    seasonId: seasons.seasonId,
  })
  .from(teamseries)
  .leftJoin(series, eq(series.serieId, teamseries.serieId))
  .leftJoin(seasons, eq(series.seasonId, seasons.seasonId))
  .where(
    and(
      eq(teamseries.teamId, sql.placeholder('teamId')),
      eq(series.level, 1),
      or(
        inArray(series.category, [
          'regular',
          'eigth',
          'quarter',
          'semi',
          'final',
        ]),
        inArray(series.group, ['SlutspelA', 'SlutspelB']),
      ),
    ),
  )
  .orderBy(desc(seasons.seasonId))
  .limit(1)
  .prepare('latestFirstDivSeason')

export const preparedFinalCount = db
  .select({ count: countDistinct(teamgames.seasonId) })
  .from(teamgames)
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.category, 'final'),
    ),
  )
  .prepare('finalCount')

export const preparedLatestFinal = db
  .select({
    year: seasons.year,
  })
  .from(teamgames)
  .leftJoin(
    seasons,
    eq(seasons.seasonId, teamgames.seasonId),
  )
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.category, 'final'),
    ),
  )
  .orderBy(desc(teamgames.seasonId))
  .limit(1)
  .prepare('latestFinal')

export const preparedLatestFinalWin = db
  .select({
    year: seasons.year,
  })
  .from(teamgames)
  .leftJoin(
    seasons,
    eq(seasons.seasonId, teamgames.seasonId),
  )
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.category, 'final'),
      eq(teamgames.win, true),
    ),
  )
  .orderBy(desc(teamgames.seasonId))
  .limit(1)
  .prepare('latestFinalWin')

export const preparedFinalWinCount = db
  .select({ count: countDistinct(teamgames.seasonId) })
  .from(teamgames)
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.category, 'final'),
      eq(teamgames.win, true),
    ),
  )
  .prepare('FinalWinCount')
export const preparedFinalWins = db
  .selectDistinctOn([teamgames.seasonId], {
    seasonId: teamgames.seasonId,
    year: seasons.year as unknown as SQL<string>,
  })
  .from(teamgames)
  .leftJoin(
    seasons,
    eq(seasons.seasonId, teamgames.seasonId),
  )
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.category, 'final'),
      eq(teamgames.win, true),
    ),
  )
  .orderBy(asc(teamgames.seasonId))
  .prepare('finalWins')

export const preparedPlayoffCount = db
  .select({ count: countDistinct(teamgames.seasonId) })
  .from(teamgames)
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      or(
        inArray(teamgames.category, [
          'quarter',
          'semi',
          'final',
        ]),
        inArray(teamgames.group, [
          'SlutspelA',
          'SlutspelB',
        ]),
      ),
    ),
  )
  .prepare('playoffCounts')
