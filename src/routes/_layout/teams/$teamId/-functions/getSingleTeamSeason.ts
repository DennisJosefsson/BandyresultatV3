import { db } from '@/db'
import {
  games,
  seasons,
  series,
  teamgames,
  teams,
  teamseasons,
  teamseries,
} from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { GroupGames } from '@/lib/types/game'
import type { Meta } from '@/lib/types/meta'
import type { Serie } from '@/lib/types/serie'
import type { TeamSeasonTable } from '@/lib/types/table'
import type { Team } from '@/lib/types/team'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
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
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

import { getUnionedTables } from './getSingleTeamSeasonTables'
import {
  getSeasonGames,
  getSeasons,
} from './singleTeamSeasonFunctions'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

type SingeTeamSeasonReturn =
  | {
      status: 200
      breadCrumb: string
      meta: Meta
      tables: Array<TeamSeasonTable>
      tableLength: number
      hasGames: boolean
      games: {
        playedGames: Array<GroupGames>
        unplayedGames: Array<GroupGames>
      }
      team: Team
      seasonYear: string
      series: Array<Serie>
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
  .validator(
    zd.object({
      teamId: zd.number(),
      seasonId: zd.number(),
    }),
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
          .where(
            and(
              eq(teamseasons.teamId, team.teamId),
              eq(teamseasons.seasonId, season.seasonId),
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
            homeGoal: games.homeGoal,
            awayGoal: games.awayGoal,
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
            ...getTableColumns(series),
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
              eq(series.seasonId, season.seasonId),
              ne(series.group, 'mix'),
            ),
          )
          .orderBy(asc(series.level))

        const teamArray = await db
          .selectDistinct({
            teamId: teamgames.teamId,
            group: teamgames.group,
          })
          .from(teamgames)
          .where(
            and(
              inArray(teamgames.category, [
                'playoffseries',
                'regular',
                'qualification',
              ]),
              ne(teamgames.group, 'mix'),
              eq(teamgames.seasonId, season.seasonId),
            ),
          )
          .groupBy(teamgames.group, teamgames.teamId)

        const tables = await Promise.all(
          seriesForTeam
            .filter((s) =>
              [
                'playoffseries',
                'regular',
                'qualification',
              ].includes(s.category),
            )
            .map(async (serie) => {
              return {
                serie: serie,
                table: await getUnionedTables({
                  serie,
                  teamArray: teamArray
                    .filter((t) => t.group === serie.group)
                    .map((t) => t.teamId),
                }),
              }
            }),
        )

        const tableLength = tables.reduce(
          (acc, curr) => acc + curr.table.length,
          0,
        )

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
          tables,
          hasGames,
          games: returnGames,
          tableLength,
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
