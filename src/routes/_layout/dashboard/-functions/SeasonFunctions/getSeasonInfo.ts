import { db } from '@/db'
import {
  competitions,
  seasons,
  teamnames,
  teams,
  teamseasons,
} from '@/db/schema'
import { coalesce } from '@/lib/drizzleHelpers/coalesce'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  desc,
  eq,
  getTableColumns,
  gt,
  lt,
  sql,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
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

      const teamNameAlias = alias(teamnames, 'team_name')
      const teamSeasonNameAlias = alias(
        teamnames,
        'teamseason_name',
      )

      const teamSeasons = await db
        .select({
          ...getTableColumns(teamseasons),
          team: {
            teamId: teams.teamId,
            name: coalesce(
              teamSeasonNameAlias.name,
              teamNameAlias.name,
            ),
            shortName: coalesce(
              teamSeasonNameAlias.shortName,
              teamNameAlias.shortName,
            ),
            casualName: coalesce(
              teamSeasonNameAlias.casualName,
              teamNameAlias.casualName,
            ),
          } as unknown as SQL<TeamBase>,
        })
        .from(teamseasons)
        .leftJoin(
          teams,
          eq(teams.teamId, teamseasons.teamId),
        )
        .leftJoin(
          teamNameAlias,
          eq(teams.teamnameId, teamNameAlias.teamnameId),
        )
        .leftJoin(
          teamSeasonNameAlias,
          eq(
            teamseasons.teamnameId,
            teamSeasonNameAlias.teamnameId,
          ),
        )
        .where(eq(teamseasons.seasonId, seasonId))
        .orderBy(
          asc(
            sql`coalesce(teamseason_name.casual_name,team_name.casual_name) collate "se-SE-x-icu"`,
          ),
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
        where: (seasonsSchema, { eq: equal }) =>
          equal(seasonsSchema.seasonId, seasonId),
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

      const nextCurrentSeason = await db
        .select()
        .from(seasons)
        .where(
          and(
            eq(seasons.women, season.women ? true : false),
            gt(seasons.seasonId, season.seasonId),
          ),
        )
        .orderBy(asc(seasons.seasonId))
        .limit(1)
        .then((res) => {
          if (res.length === 0) return undefined

          return res[0]
        })

      const prevCurrentSeason = await db
        .select()
        .from(seasons)
        .where(
          and(
            eq(seasons.women, season.women ? true : false),
            lt(seasons.seasonId, season.seasonId),
          ),
        )
        .limit(1)
        .orderBy(desc(seasons.seasonId))
        .then((res) => {
          if (res.length === 0) return undefined

          return res[0]
        })

      const currentOtherGenderSeason = await db
        .select()
        .from(seasons)
        .where(
          and(
            eq(seasons.year, season.year),
            eq(seasons.women, season.women ? false : true),
          ),
        )
        .then((res) => {
          if (res.length === 0) return undefined

          return res[0]
        })

      if (!playoffSeasonData) {
        throw new Error('Säsong saknas')
      }

      return {
        metadata,
        teams: teamSeasons,
        series: seasonSeries,
        season,
        nextCurrentSeason,
        prevCurrentSeason,
        currentOtherGenderSeason,
        playoffSeason: playoffSeasonData,
      }
    } catch (error) {
      catchError(error)
    }
  })
