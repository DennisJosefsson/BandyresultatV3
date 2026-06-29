import { db } from '@/db'
import type {
  county,
  municipality,
  teams,
} from '@/db/schema'
import { seasons, teamseasons } from '@/db/schema'
import { zd } from '@/lib/utils/zod'
import type { SQL } from 'drizzle-orm'
import { asc, desc, eq } from 'drizzle-orm'
import {
  getPreparedFirstDivisionSeasons,
  getPreparedFirstFirstDivisionSeason,
  getPreparedLatestFirstDivisionSeason,
  preparedFinalCount,
  preparedFinalWinCount,
  preparedFinalWins,
  preparedIntersectSeasons,
  preparedLatestFinal,
  preparedLatestFinalWin,
  preparedPlayoffCount,
} from './preparedQueries/preparedGoalGameStatQueries'

export const getTeam = (teamId: number) =>
  db.query.teams.findFirst({
    where: (teams, { eq: equal }) =>
      equal(teams.teamId, teamId),
    with: {
      county: true,
      municipality: true,
      teamseasons: {
        with: {
          season: {
            columns: {
              year: true,
              seasonId: true,
            },
          },
        },
        columns: {
          qualification: true,
        },
        orderBy: desc(teamseasons.seasonId),
      },
    },
  })

export const getAllTeamsSeasons = async (
  teamId: number,
) => {
  const allTeamSeasons = await db
    .select({
      teamId: teamseasons.teamId,
      seasonId: teamseasons.seasonId,
      season: {
        year: seasons.year,
        seasonId: seasons.seasonId,
      } as unknown as SQL<{
        year: string
        seasonId: number
      }>,
    })
    .from(teamseasons)
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamseasons.seasonId),
    )
    .where(eq(teamseasons.teamId, teamId))
    .orderBy(asc(teamseasons.seasonId))

  const count = await db.$count(
    teamseasons,
    eq(teamseasons.teamId, teamId),
  )
  return {
    count,
    rows: allTeamSeasons,
  }
}

type Team = typeof teams.$inferSelect & {
  county: typeof county.$inferSelect
} & {
  municipality: typeof municipality.$inferSelect | null
} & {
  teamseasons: Array<{
    qualification: boolean | null
    season: {
      year: string
      seasonId: number
    }
  }>
}

type GetStringsProps = {
  team: Team
}

const parseFirstDivSeasons = zd
  .array(zd.object({ count: zd.coerce.number() }))
  .transform((item) => {
    return item[0].count
  })

const parseFirstLatestFirstDivSeason = zd
  .array(
    zd.object({
      seasonId: zd.coerce.number(),
      year: zd.string(),
    }),
  )
  .transform((item) => {
    if (item.length === 0) return null
    return {
      seasonId: item[0].seasonId,
      year: item[0].year,
    }
  })

export const getStatsCounts = async ({
  team,
}: GetStringsProps) => {
  const TEAMID = team.teamId

  const getFirstDivisionSeasons =
    await getPreparedFirstDivisionSeasons.execute({
      teamId: TEAMID,
    })

  const qualificationSeasonsCount =
    await preparedIntersectSeasons
      .execute({ teamId: TEAMID })
      .then((result) => result.length)

  const firstDivSeasonsCount = parseFirstDivSeasons.parse(
    getFirstDivisionSeasons,
  )

  const getFirstFirstDivisionSeason =
    await getPreparedFirstFirstDivisionSeason.execute({
      teamId: TEAMID,
    })

  const firstFirstDivisionSeason =
    parseFirstLatestFirstDivSeason.parse(
      getFirstFirstDivisionSeason,
    )

  const getLatestFirstDivisionSeason =
    await getPreparedLatestFirstDivisionSeason.execute({
      teamId: TEAMID,
    })

  const latestFirstDivisionSeason =
    parseFirstLatestFirstDivSeason.parse(
      getLatestFirstDivisionSeason,
    )

  const finalCount = await preparedFinalCount
    .execute({ teamId: TEAMID })
    .then((result) => {
      if (result.length === 0) return 0
      else return result[0].count
    })

  const latestFinal = await preparedLatestFinal
    .execute({ teamId: TEAMID })
    .then((result) => result[0].year)

  const latestFinalWin = await preparedLatestFinalWin
    .execute({ teamId: TEAMID })
    .then((result) => result[0].year)

  const finalWinCount = await preparedFinalWinCount
    .execute({ teamId: TEAMID })
    .then((result) => {
      if (result.length === 0) return 0
      else return result[0].count
    })
  const finalWins = await preparedFinalWins
    .execute({ teamId: TEAMID })
    .then((result) => result.map((r) => r.year))

  const playoffCount = await preparedPlayoffCount
    .execute({ teamId: TEAMID })
    .then((result) => {
      if (result.length === 0) return 0
      else return result[0].count
    })

  return {
    firstDivSeasonsCount,
    qualificationSeasonsCount,
    firstFirstDivisionSeason,
    latestFirstDivisionSeason,
    finalCount,
    finalWinCount,
    finalWins,
    latestFinal,
    latestFinalWin,
    playoffCount,
  }
}
