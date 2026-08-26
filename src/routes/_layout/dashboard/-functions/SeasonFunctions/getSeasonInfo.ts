import { db } from '@/db'
import {
  competitions,
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
import { getCompetitionSeries } from './seasonQueries'

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

      const competitionArray = await db
        .select({ ...getTableColumns(competitions) })
        .from(competitions)
        .where(eq(competitions.seasonId, seasonId))
        .orderBy(asc(competitions.division))

      const seasonSeries = await Promise.all(
        competitionArray.map(async (comp) => {
          return {
            competitionName: comp.competitionName,
            competitionId: comp.competitionId,
            isCup: comp.isCup,
            series: await getCompetitionSeries({
              competitionId: comp.competitionId,
            }),
          }
        }),
      )

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
        series: seasonSeries,
        season,
        playoffSeason: playoffSeasonData,
      }
    } catch (error) {
      catchError(error)
    }
  })
