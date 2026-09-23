import { db } from '@/db'
import {
  county,
  municipality,
  seasons,
  series,
  teamgames,
  teamlogos,
  teamnames,
  teams,
  teamseasons,
} from '@/db/schema'
import { coalesce } from '@/lib/drizzleHelpers/coalesce'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { County } from '@/lib/types/county'
import type { Municipality } from '@/lib/types/municipality'
import type { Team } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import {
  and,
  eq,
  getTableColumns,
  inArray,
  ne,
} from 'drizzle-orm'
import {
  teamseasonLogo,
  teamseasonName,
} from '../libs/aliases'

type TeamsForPlayoffMapReturn =
  | {
      status: 404
      message: string
    }
  | {
      status: 200
      teams: Array<{
        team: Team
        county: County
        municipality: Municipality
      }>
    }
  | undefined

export const getTeamsForPlayoffMap = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({ year: zd.int(), women: zd.boolean() }),
  )
  .handler(
    async ({
      data: { year, women },
    }): Promise<TeamsForPlayoffMapReturn> => {
      try {
        if (year < 1973 && women) {
          return {
            status: 404,
            message:
              'Damernas första säsong var 1972/1973.',
          }
        }

        const teamArray = await db
          .selectDistinctOn([teamgames.teamId], {
            team: {
              ...getTableColumns(teams),
              teamname: {
                teamId: teamgames.teamId,
                name: coalesce(
                  teamseasonName.name,
                  teamnames.name,
                ),
                shortName: coalesce(
                  teamseasonName.shortName,
                  teamnames.shortName,
                ),
                casualName: coalesce(
                  teamseasonName.casualName,
                  teamnames.casualName,
                ),
                logo: {
                  logoId: coalesce(
                    teamseasonLogo.logoId,
                    teamlogos.logoId,
                  ),
                  hasDark: coalesce(
                    teamseasonLogo.hasDark,
                    teamlogos.hasDark,
                  ),
                },
              },
            } as unknown as SQL<Team>,
            county: getTableColumns(
              county,
            ) as unknown as SQL<County>,
            municipality: getTableColumns(
              municipality,
            ) as unknown as SQL<Municipality>,
          })
          .from(teamgames)
          .leftJoin(
            series,
            eq(series.serieId, teamgames.serieId),
          )
          .leftJoin(
            teams,
            eq(teams.teamId, teamgames.teamId),
          )
          .leftJoin(
            teamseasons,
            and(
              eq(teamseasons.seasonId, teamgames.seasonId),
              eq(teamseasons.teamId, teamgames.teamId),
            ),
          )
          .leftJoin(
            teamnames,
            eq(teamnames.teamnameId, teams.teamnameId),
          )
          .leftJoin(
            teamseasonName,
            eq(
              teamseasons.teamnameId,
              teamseasonName.teamnameId,
            ),
          )
          .leftJoin(
            teamlogos,
            eq(teamlogos.logoId, teamnames.logoId),
          )
          .leftJoin(
            teamseasonLogo,
            eq(
              teamseasonLogo.logoId,
              teamseasonName.logoId,
            ),
          )
          .leftJoin(
            municipality,
            eq(
              teams.municipalityId,
              municipality.municipalityId,
            ),
          )
          .leftJoin(
            county,
            eq(teams.countyId, county.countyId),
          )
          .where(
            and(
              inArray(
                teamgames.seasonId,
                db
                  .select({ seasonId: seasons.seasonId })
                  .from(seasons)
                  .where(
                    and(
                      eq(seasons.intYear, year),
                      eq(seasons.women, women),
                    ),
                  ),
              ),
              inArray(series.category, [
                'playoffseries',
                'eight',
                'quarter',
                'semi',
                'final',
              ]),
              ne(teamgames.teamId, 176),
            ),
          )

        return {
          status: 200,
          teams: teamArray,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
