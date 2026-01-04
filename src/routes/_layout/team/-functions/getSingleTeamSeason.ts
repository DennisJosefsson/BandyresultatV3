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
import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, desc, eq, or, SQL } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import {
  getSeasonGames,
  getSeasons,
  getTeamSeasonStaticTables,
  getTeamSeasonTables,
} from './singleTeamSeasonFunctions'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

export const getSingleTeamSeason = createServerFn({ method: 'GET' })
  .inputValidator(
    zodValidator(zd.object({ teamId: zd.number(), seasonId: zd.number() })),
  )
  .middleware([errorMiddleware])
  .handler(async ({ data: { teamId, seasonId } }) => {
    try {
      const team = await db.query.teams.findFirst({
        where: (teams, { eq }) => eq(teams.teamId, teamId),
      })

      if (!team) {
        throw notFound({ data: 'Finns inget sådant lag.' })
      }
      const seasonYear = seasonIdCheck.parse(seasonId)

      if (!seasonYear) {
        throw new Error('Fel på säsongsId.')
      }

      const season = await db.query.seasons.findFirst({
        where: (seasons, { eq, and }) =>
          and(eq(seasons.women, team.women), eq(seasons.year, seasonYear)),
      })

      if (!season) {
        throw notFound({ data: 'Finns ingen sådan säsong.' })
      }

      const teamSeason = db
        .select()
        .from(teamseasons)
        .leftJoin(seasons, eq(seasons.seasonId, teamseasons.seasonId))
        .where(
          and(
            eq(teamseasons.teamId, team.teamId),
            eq(seasons.year, seasonYear),
          ),
        )

      if (!teamSeason) {
        throw notFound({ data: 'Laget har ingen sådan säsong.' })
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
          } as unknown as SQL<{ seasonId: number; year: string }>,
        })
        .from(games)
        .leftJoin(home, eq(home.teamId, games.homeTeamId))
        .leftJoin(away, eq(away.teamId, games.awayTeamId))
        .leftJoin(seasons, eq(seasons.seasonId, games.seasonId))
        .where(
          or(
            eq(games.homeTeamId, team.teamId),
            eq(games.awayTeamId, team.teamId),
          ),
        )
        .orderBy(desc(games.date))

      const hasGames = gamesForTeam.length !== 0

      const seriesForTeam = await db
        .select({
          category: series.category,
          group: series.group,
          comment: series.comment,
          name: series.serieName,
          level: series.level,
        })
        .from(series)
        .leftJoin(seasons, eq(seasons.seasonId, series.seasonId))
        .leftJoin(teamseries, eq(teamseries.serieId, series.serieId))
        .leftJoin(teams, eq(teamseries.teamId, teams.teamId))
        .where(and(eq(teams.teamId, team.teamId), eq(seasons.year, seasonYear)))

      const tableSeriesArray = seriesForTeam
        .filter((serie) =>
          ['regular', 'qualification'].includes(serie.category),
        )
        .map((serie) => serie.group)

      const staticTables = await getTeamSeasonStaticTables({
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

      return {
        staticTables,
        tables: getTables,
        hasGames,
        games: returnGames,
        team,
        seasonYear,
        series: seriesForTeam,
        ...seasonObjects,
      }
    } catch (error) {
      catchError(error)
    }
  })
