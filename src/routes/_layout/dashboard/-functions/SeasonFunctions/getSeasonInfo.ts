import { db } from '@/db'
import {
  competitions,
  series,
  teams,
  teamseasons,
} from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import { asc, eq, getTableColumns, sql } from 'drizzle-orm'
import { sortSeasonSeries } from './sortFunctions'

export const getSeasonInfo = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({ seasonId: zd.number().int().positive() }),
  )
  .handler(async ({ data: { seasonId } }) => {
    try {
      const metadata = await db.query.metadata.findFirst({
        where: (metadataSchema, { eq: equal }) =>
          equal(metadataSchema.seasonId, seasonId),
      })

      const teamSeasons = await db
        .select({
          ...getTableColumns(teamseasons),
          team: {
            teamId: teams.teamId,
            name: teams.name,
            shortName: teams.shortName,
            casualName: teams.casualName,
          } as unknown as SQL<TeamBase>,
        })
        .from(teamseasons)
        .leftJoin(
          teams,
          eq(teams.teamId, teamseasons.teamId),
        )
        .where(eq(teamseasons.seasonId, seasonId))
        .orderBy(
          asc(sql`teams.casual_name collate "se-SE-x-icu"`),
        )

      const seasonSeries = await db
        .select({
          ...getTableColumns(series),
          competition: { ...getTableColumns(competitions) },
        })
        .from(series)
        .leftJoin(
          competitions,
          eq(
            competitions.competitionId,
            series.competitionId,
          ),
        )
        .where(eq(series.seasonId, seasonId))
        .orderBy(asc(series.level))

      const sortedSeasonSeries =
        sortSeasonSeries(seasonSeries)

      const season = await db.query.seasons.findFirst({
        where: (seasons, { eq: equal }) =>
          equal(seasons.seasonId, seasonId),
      })

      const playoffSeasonData =
        await db.query.playoffseason.findFirst({
          where: (playoffseason, { eq: equal }) =>
            equal(playoffseason.seasonId, seasonId),
        })

      if (!metadata) {
        throw new Error('Metadata saknas')
      }

      if (!teamSeasons) {
        throw new Error('Teamseasons saknas')
      }

      if (!seasonSeries) {
        throw new Error('Säsonger saknas')
      }

      if (!season) {
        throw new Error('Säsong saknas')
      }

      if (!playoffSeasonData) {
        throw new Error('Säsong saknas')
      }

      return {
        metadata,
        teams: teamSeasons,
        series: sortedSeasonSeries,
        season,
        playoffSeason: playoffSeasonData,
      }
    } catch (error) {
      catchError(error)
    }
  })
