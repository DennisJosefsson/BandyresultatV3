import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import type { SQL } from 'drizzle-orm'
import { and, desc, eq, or } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

import { db } from '@/db'
import {
  games,
  seasons,
  series,
  teams,
  teamseasons,
  teamseries,
} from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'

import type { GroupGames } from '@/lib/types/game'
import type { Meta } from '@/lib/types/meta'
import type { SerieData } from '@/lib/types/serie'
import type { GroupTable } from '@/lib/types/table'
import type { Team } from '@/lib/types/team'
import {
  getSeasonGames,
  getSeasons,
  getTeamSeasonStaticTables,
  getTeamSeasonTables,
} from './singleTeamSeasonFunctions'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

type SingeTeamSeasonReturn =
  | {
      status: 200
      breadCrumb: string
      meta: Meta
      tables: Array<GroupTable>
      staticTables: Array<GroupTable>
      hasGames: boolean
      games: {
        playedGames: Array<GroupGames>
        unplayedGames: Array<GroupGames>
      }
      team: Team
      seasonYear: string
      series: Array<SerieData>
      firstSeason: {
        year: string
        seasonId: number
      }
      lastSeason: {
        year: string
        seasonId: number
      }
      nextSeason:
        | {
            year: string
            seasonId: number
          }
        | undefined
      previousSeason:
        | {
            year: string
            seasonId: number
          }
        | undefined
    }
  | {
      status: 404
      breadCrumb: string
      meta: Meta
      message: string
    }
  | undefined

export const getSingleTeamSeason = createServerFn({
  method: 'GET',
})
  .inputValidator(
    zodValidator(
      zd.object({
        teamId: zd.number(),
        seasonId: zd.number(),
      }),
    ),
  )
  .middleware([errorMiddleware])
  .handler(
    async ({
      data: { teamId, seasonId },
    }): Promise<SingeTeamSeasonReturn> => {
      try {
        const team = await db.query.teams.findFirst({
          where: (teamsSchema, { eq: equal }) =>
            equal(teamsSchema.teamId, teamId),
        })

        let breadCrumb = 'Säsong'
        let title = `Bandyresultat`
        let description = `Finns inget sådant lag.`
        let url = `https://bandyresultat.se/teams`

        if (!team) {
          return {
            status: 404,
            breadCrumb,
            meta: { title, description, url },
            message: 'Finns inget sådant lag.',
          }
        }
        const seasonYear = seasonIdCheck.parse(seasonId)

        if (!seasonYear) {
          return {
            status: 404,
            breadCrumb,
            meta: {
              title,
              description: 'Fel säsongsId',
              url,
            },
            message: 'Fel säsongsId.',
          }
        }

        const season = await db.query.seasons.findFirst({
          where: (seasonsSchema, { eq: equal, and: AND }) =>
            AND(
              equal(seasonsSchema.women, team.women),
              equal(seasonsSchema.year, seasonYear),
            ),
        })

        if (!season) {
          return {
            status: 404,
            breadCrumb,
            meta: {
              title: `Bandyresultat - ${team.name}`,
              description: `Finns ingen säsong ${seasonYear} för ${team.women ? 'damer' : 'herrar'}.`,
              url,
            },
            message: `Finns ingen säsong ${seasonYear} för ${team.women ? 'damer' : 'herrar'}.`,
          }
        }

        const teamSeason = db
          .select()
          .from(teamseasons)
          .leftJoin(
            seasons,
            eq(seasons.seasonId, teamseasons.seasonId),
          )
          .where(
            and(
              eq(teamseasons.teamId, team.teamId),
              eq(seasons.year, seasonYear),
            ),
          )

        if (!teamSeason) {
          return {
            status: 404,
            breadCrumb,
            meta: {
              title: `Bandyresultat - ${team.name}`,
              description: `${team.casualName} har inte säsongen ${season.year} i databasen än.`,
              url: `https://www.bandyresultat.se/teams/${team.teamId}`,
            },
            message: `${team.casualName} har inte säsongen ${season.year} i databasen än.`,
          }
        }

        const gamesForTeam = await db
          .select({
            gameId: games.gameId,
            homeTeamId: games.homeTeamId,
            awayTeamId: games.awayTeamId,
            date: games.date,
            group: games.group,
            category: games.category,
            result: games.result,
            halftimeResult: games.halftimeResult,
            played: games.played,
            otResult: games.otResult,
            penalties: games.penalties,
            extraTime: games.extraTime,
            home: {
              teamId: home.teamId,
              name: home.name,
              casualName: home.casualName,
              shortName: home.shortName,
            } as unknown as SQL<{
              teamId: number
              name: string
              casualName: string
              shortName: string
            }>,
            away: {
              teamId: away.teamId,
              name: away.name,
              casualName: away.casualName,
              shortName: away.shortName,
            } as unknown as SQL<{
              teamId: number
              name: string
              casualName: string
              shortName: string
            }>,
            season: {
              seasonId: seasons.seasonId,
              year: seasons.year,
            } as unknown as SQL<{
              seasonId: number
              year: string
            }>,
          })
          .from(games)
          .leftJoin(home, eq(home.teamId, games.homeTeamId))
          .leftJoin(away, eq(away.teamId, games.awayTeamId))
          .leftJoin(
            seasons,
            eq(seasons.seasonId, games.seasonId),
          )
          .where(
            and(
              or(
                eq(games.homeTeamId, team.teamId),
                eq(games.awayTeamId, team.teamId),
              ),
              eq(games.seasonId, season.seasonId),
            ),
          )
          .orderBy(desc(games.date))

        const hasGames = gamesForTeam.length !== 0

        const seriesForTeam = await db
          .select({
            category: series.category,
            group: series.group,
            comment: series.comment,
            serieName: series.serieName,
            level: series.level,
          })
          .from(series)
          .leftJoin(
            seasons,
            eq(seasons.seasonId, series.seasonId),
          )
          .leftJoin(
            teamseries,
            eq(teamseries.serieId, series.serieId),
          )
          .leftJoin(
            teams,
            eq(teamseries.teamId, teams.teamId),
          )
          .where(
            and(
              eq(teams.teamId, team.teamId),
              eq(seasons.year, seasonYear),
            ),
          )

        const tableSeriesArray = seriesForTeam
          .filter((serie) =>
            ['regular', 'qualification'].includes(
              serie.category,
            ),
          )
          .map((serie) => serie.group)

        const staticTables =
          await getTeamSeasonStaticTables({
            seasonYear,
            women: team.women,
            groupArray: tableSeriesArray,
          })
        const getTables = await getTeamSeasonTables({
          seasonYear,
          women: team.women,
          groupArray: tableSeriesArray,
        })

        const returnGames = getSeasonGames({
          gamesArray: gamesForTeam,
          seriesArray: seriesForTeam,
        })

        const seasonObjects = await getSeasons({
          teamId,
          seasonId: season.seasonId,
        })

        breadCrumb = season.year
        title = `Bandyresultat - ${team.name} - ${season.year}`
        description = `Information om ${team.name} ${season.year}`
        url = `https://bandyresultat.se/teams/${team.teamId}/${seasonYear}?women=${team.women}`

        return {
          status: 200,
          staticTables,
          tables: getTables,
          hasGames,
          games: returnGames,
          team,
          seasonYear,
          series: seriesForTeam,
          ...seasonObjects,
          breadCrumb,
          meta: { title, description, url },
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
