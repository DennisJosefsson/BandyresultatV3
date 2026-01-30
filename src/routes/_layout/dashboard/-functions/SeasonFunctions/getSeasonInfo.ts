import { db } from '@/db'
import { series, teams, teamseasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { asc, eq, getTableColumns, SQL, sql } from 'drizzle-orm'

export const getSeasonInfo = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ seasonId: zd.number().int().positive() })),
  )
  .handler(async ({ data: { seasonId } }) => {
    try {
      const metadata = await db.query.metadata.findFirst({
        where: (metadata, { eq }) => eq(metadata.seasonId, seasonId),
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
        .leftJoin(teams, eq(teams.teamId, teamseasons.teamId))
        .where(eq(teamseasons.seasonId, seasonId))
        .orderBy(asc(sql`teams.casual_name collate "se-SE-x-icu"`))

      const seasonSeries = await db
        .select()
        .from(series)
        .where(eq(series.seasonId, seasonId))

      const season = await db.query.seasons.findFirst({
        where: (seasons, { eq }) => eq(seasons.seasonId, seasonId),
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

      return { metadata, teams: teamSeasons, series: seasonSeries, season }
    } catch (error) {
      catchError(error)
    }
  })
