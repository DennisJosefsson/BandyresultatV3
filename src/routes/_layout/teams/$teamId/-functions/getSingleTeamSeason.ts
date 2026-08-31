import { db } from '@/db'
import {
  competitions,
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
import type { Game } from '@/lib/types/game'
import type { Meta } from '@/lib/types/meta'
import type { Serie } from '@/lib/types/serie'
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
  ne,
  or,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

import type { TeamTable } from '@/lib/types/table'
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
      data: Array<{
        competitionName: string
        tables: Array<{
          serie: Serie
          table: Array<
            Omit<TeamTable, 'women' | 'season' | 'group'>
          >
        }>
        games: {
          playedGames: Array<{
            group: string
            name: string
            comment: string
            level: number
            dates: Array<{
              date: string
              games: Array<Game>
            }>
          }>
          unplayedGames: Array<{
            group: string
            name: string
            comment: string
            level: number
            dates: Array<{
              date: string
              games: Array<Game>
            }>
          }>
        }
      }>
      hasGames: boolean
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

        const competitionArray = await db
          .select()
          .from(competitions)
          .leftJoin(
            series,
            eq(
              series.competitionId,
              competitions.competitionId,
            ),
          )
          .leftJoin(
            teamseries,
            eq(series.serieId, teamseries.serieId),
          )
          .where(
            and(
              eq(competitions.seasonId, season.seasonId),
              eq(teamseries.teamId, team.teamId),
            ),
          )
          .orderBy(
            asc(competitions.division),
            asc(series.level),
          )
          .then((res) => {
            const sortComps = res.reduce<
              Record<
                string,
                {
                  competition: typeof competitions.$inferSelect
                  series: Array<Serie>
                }
              >
            >((acc, row) => {
              const competitionName =
                row.competitions.competitionName
              const competition = row.competitions
              const serie = row.series
              if (
                typeof acc[competitionName] === 'undefined'
              ) {
                acc[competitionName] = {
                  competition,
                  series: [],
                }
              }
              if (serie) {
                acc[competitionName].series.push(serie)
              }
              return acc
            }, {})

            const sortedComps = Object.keys(sortComps).map(
              (comp) => {
                return sortComps[comp]
              },
            )

            return sortedComps
          })

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

        const gamesForTeam = await db
          .select({
            gameId: games.gameId,
            homeTeamId: games.homeTeamId,
            awayTeamId: games.awayTeamId,
            date: games.date,
            group: series.group as unknown as SQL<string>,
            category:
              series.category as unknown as SQL<string>,
            result: games.result,
            homeGoal: games.homeGoal,
            awayGoal: games.awayGoal,
            halftimeResult: games.halftimeResult,
            played: games.played,
            otResult: games.otResult,
            penalties: games.penalties,
            extraTime: games.extraTime,
            competitionId: series.competitionId,
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
          .leftJoin(
            series,
            eq(games.serieId, series.serieId),
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

        const teamArray = await db
          .selectDistinct({
            teamId: teamgames.teamId,
            group: series.group as unknown as SQL<string>,
          })
          .from(teamgames).leftJoin(series,eq(series.serieId,teamgames.serieId))
          .where(
            and(
              ne(series.group, 'mix'),
              eq(teamgames.seasonId, season.seasonId),
            ),
          )
          .groupBy(series.group, teamgames.teamId)

        const data = await Promise.all(
          competitionArray.map(async (comp) => {
            return {
              competitionName:
                comp.competition.competitionName,
              tables: await Promise.all(
                comp.series.map(async (s1) => {
                  const table = await getUnionedTables({
                    serie: s1,
                    teamArray: teamArray
                      .filter((t) => t.group === s1.group)
                      .map((t) => t.teamId),
                  })
                  return {
                    serie: s1,
                    table,
                  }
                }),
              ),
              games: getSeasonGames({
                gamesArray: gamesForTeam.filter(
                  (g) =>
                    g.competitionId ===
                    comp.competition.competitionId,
                ),
                seriesArray: seriesForTeam.filter(
                  (s) =>
                    s.competitionId ===
                    comp.competition.competitionId,
                ),
              }),
            }
          }),
        )

        // const seriesTables = await Promise.all(
        //   seriesForTeam
        //     .filter((s1) => !s1.category.startsWith('cup-'))
        //     .map(async (serie) => {
        //       return {
        //         serie: serie,
        //         table: await getUnionedTables({
        //           serie,
        //           teamArray: teamArray
        //             .filter((t) => t.group === serie.group)
        //             .map((t) => t.teamId),
        //         }),
        //       }
        //     }),
        // )
        // const cupTables = await Promise.all(
        //   seriesForTeam
        //     .filter((s1) => s1.category.startsWith('cup-'))
        //     .map(async (serie) => {
        //       return {
        //         serie: serie,
        //         table: await getUnionedTables({
        //           serie,
        //           teamArray: teamArray
        //             .filter((t) => t.group === serie.group)
        //             .map((t) => t.teamId),
        //         }),
        //       }
        //     }),
        // )

        // const seriesTableLength = seriesTables.reduce(
        //   (acc, curr) => acc + curr.table.length,
        //   0,
        // )

        // const cupTableLength = cupTables.reduce(
        //   (acc, curr) => acc + curr.table.length,
        //   0,
        // )

        // const tableLength =
        //   seriesTableLength + cupTableLength

        // const returnGames = getSeasonGames({
        //   gamesArray: gamesForTeam,
        //   seriesArray: seriesForTeam,
        // })

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
          hasGames,

          data,
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
