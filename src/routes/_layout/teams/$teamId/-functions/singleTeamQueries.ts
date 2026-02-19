import { db } from '@/db'
import {
  county,
  municipality,
  seasons,
  series,
  teamgames,
  teams,
  teamseasons,
  teamseries,
} from '@/db/schema'
import { zd } from '@/lib/utils/zod'
import {
  and,
  asc,
  countDistinct,
  desc,
  eq,
  inArray,
  or,
  SQL,
} from 'drizzle-orm'

export const getTeam = (teamId: number) =>
  db.query.teams.findFirst({
    where: (teams, { eq }) => eq(teams.teamId, teamId),
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

export const getAllTeamsSeasons = async (teamId: number) => {
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
    .leftJoin(seasons, eq(seasons.seasonId, teamseasons.seasonId))
    .where(eq(teamseasons.teamId, teamId))
    .orderBy(asc(teamseasons.seasonId))

  const count = await db.$count(teamseasons, eq(teamseasons.teamId, teamId))
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
  teamseasons: {
    qualification: boolean | null
    season: {
      year: string
      seasonId: number
    }
  }[]
}

type AllSeasonRow = Pick<
  typeof teamseasons.$inferSelect,
  'teamId' | 'seasonId'
> & {
  season: {
    year: string
    seasonId: number
  }
}

type AllSeasons = {
  count: number
  rows: AllSeasonRow[]
}

type GetStringsProps = {
  team: Team
  allSeasons: AllSeasons
}

const parseFirstDivSeasons = zd
  .array(zd.object({ count: zd.coerce.number() }))
  .transform((item) => {
    return item[0].count
  })

const parseFirstLatestFirstDivSeason = zd
  .array(zd.object({ seasonId: zd.coerce.number(), year: zd.string() }))
  .transform((item) => {
    if (item.length === 0) return null
    return { seasonId: item[0].seasonId, year: item[0].year }
  })

export const getStrings = async ({ team, allSeasons }: GetStringsProps) => {
  const TEAMID = team.teamId
  const qualificationSeasons = await db.$count(
    teamseasons,
    and(eq(teamseasons.teamId, TEAMID), eq(teamseasons.qualification, true)),
  )
  const getFirstDivisionSeasons = await db
    .select({ count: countDistinct(series.seasonId) })
    .from(teamseries)
    .leftJoin(series, eq(series.serieId, teamseries.serieId))
    .where(
      and(
        eq(teamseries.teamId, TEAMID),
        eq(series.level, 1),
        eq(series.category, 'regular'),
      ),
    )

  const firstDivSeasons = parseFirstDivSeasons.parse(getFirstDivisionSeasons)

  const getFirstFirstDivisionSeason = await db
    .select({
      year: seasons.year,
      seasonId: seasons.seasonId,
    })
    .from(teamseries)
    .leftJoin(series, eq(series.serieId, teamseries.serieId))
    .leftJoin(seasons, eq(series.seasonId, seasons.seasonId))
    .where(
      and(
        eq(teamseries.teamId, TEAMID),
        eq(series.level, 1),
        or(
          inArray(series.category, [
            'regular',
            'eigth',
            'quarter',
            'semi',
            'final',
          ]),
          inArray(series.group, ['SlutspelA', 'SlutspelB']),
        ),
      ),
    )
    .orderBy(asc(seasons.seasonId))
    .limit(1)

  const firstFirstDivisionSeason = parseFirstLatestFirstDivSeason.parse(
    getFirstFirstDivisionSeason,
  )

  const getLatestFirstDivisionSeason = await db
    .select({
      year: seasons.year,
      seasonId: seasons.seasonId,
    })
    .from(teamseries)
    .leftJoin(series, eq(series.serieId, teamseries.serieId))
    .leftJoin(seasons, eq(series.seasonId, seasons.seasonId))
    .where(
      and(
        eq(teamseries.teamId, TEAMID),
        eq(series.level, 1),
        or(
          inArray(series.category, [
            'regular',
            'eigth',
            'quarter',
            'semi',
            'final',
          ]),
          inArray(series.group, ['SlutspelA', 'SlutspelB']),
        ),
      ),
    )
    .orderBy(asc(seasons.seasonId))
    .limit(1)

  const latestFirstDivisionSeason = parseFirstLatestFirstDivSeason.parse(
    getLatestFirstDivisionSeason,
  )

  const seasonString = getSeasonStrings({
    teamCity: team.city,
    teamName: team.casualName,
    allSeasons,
    qualificationSeasons,
    firstDivSeasons,
    firstFirstDivisionSeason,
    latestFirstDivisionSeason,
  })

  const finalCount = await db
    .select({ count: countDistinct(teamgames.seasonId) })
    .from(teamgames)
    .where(and(eq(teamgames.teamId, TEAMID), eq(teamgames.category, 'final')))
    .then((result) => {
      if (result.length === 0) return 0
      else return result[0].count
    })

  const finalWinCount = await db
    .select({ count: countDistinct(teamgames.seasonId) })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.teamId, TEAMID),
        eq(teamgames.category, 'final'),
        eq(teamgames.win, true),
      ),
    )
    .then((result) => {
      if (result.length === 0) return 0
      else return result[0].count
    })
  const finalWins = await db
    .selectDistinctOn([teamgames.seasonId], {
      seasonId: teamgames.seasonId,
      year: seasons.year,
    })
    .from(teamgames)
    .leftJoin(seasons, eq(seasons.seasonId, teamgames.seasonId))
    .where(
      and(
        eq(teamgames.teamId, TEAMID),
        eq(teamgames.category, 'final'),
        eq(teamgames.win, true),
      ),
    )

  const finalsAndWinsString = getFinalsAndWinsString({
    teamName: team.casualName,
    finalCount,
    finalWinCount,
    finalWins,
  })

  const playoffCount = await db
    .select({ count: countDistinct(teamgames.seasonId) })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.teamId, TEAMID),
        or(
          inArray(teamgames.category, ['quarter', 'semi', 'final']),
          inArray(teamgames.group, ['SlutspelA', 'SlutspelB']),
        ),
      ),
    )
    .then((result) => {
      if (result.length === 0) return 0
      else return result[0].count
    })

  const playoffCountString = getPlayoffCountString(playoffCount)

  return { seasonString, finalsAndWinsString, playoffCountString }
}

function getSeasonStrings({
  firstDivSeasons,
  qualificationSeasons,
  allSeasons,
  teamName,
  teamCity,
  latestFirstDivisionSeason,
  firstFirstDivisionSeason,
}: {
  firstDivSeasons: number
  qualificationSeasons: number
  allSeasons: AllSeasons
  teamName: string
  teamCity: string
  latestFirstDivisionSeason: zd.infer<typeof parseFirstLatestFirstDivSeason>
  firstFirstDivisionSeason: zd.infer<typeof parseFirstLatestFirstDivSeason>
}): string {
  let firstDivString

  if (firstDivSeasons === 1) {
    firstDivString = 'spelat en säsong'
  } else if (firstDivSeasons > 1) {
    firstDivString = `spelat ${firstDivSeasons} säsonger`
  } else {
    firstDivString = 'inte spelat någon säsong'
  }

  let qualificationString
  if (qualificationSeasons === 0) {
    qualificationString = ''
  } else if (qualificationSeasons === 1) {
    qualificationString =
      'Laget har kvalat mot motstånd från högsta serien vid ett tillfälle.\n'
  } else {
    qualificationString = `Laget har kvalat mot motstånd från högsta serien vid ${qualificationSeasons} tillfällen.\n`
  }

  const firstDbSeason = allSeasons.rows[0]
  const latestDbSeason = allSeasons.rows[allSeasons.rows.length - 1]

  let allSeasonsString
  if (allSeasons.count === firstDivSeasons) {
    if (allSeasons.count === 1) {
      allSeasonsString = `Den säsongen spelades ${firstDbSeason.season.year}.\n`
    } else {
      allSeasonsString = `Första säsongen var ${
        firstFirstDivisionSeason && firstFirstDivisionSeason.year
      }, och den senaste ${
        latestFirstDivisionSeason && latestFirstDivisionSeason.year
      }.\n`
    }
  } else if (allSeasons.count === 1) {
    allSeasonsString = `Totalt har laget en säsong i databasen, den spelades ${firstDbSeason.season.year}.\n`
  } else {
    allSeasonsString = `Totalt har laget ${allSeasons.count} säsonger i databasen, `
    if (firstDivSeasons === 1) {
      allSeasonsString += `säsongen ${
        firstFirstDivisionSeason && firstFirstDivisionSeason.year
      } i högsta serien.\n`
    } else if (
      firstDivSeasons > 1 &&
      firstFirstDivisionSeason &&
      latestFirstDivisionSeason
    ) {
      if (firstDbSeason.season.seasonId === firstFirstDivisionSeason.seasonId) {
        allSeasonsString += `första säsongen i högsta serien spelades ${firstDbSeason.season.year}.\n `
      } else if (
        firstDbSeason.season.seasonId < firstFirstDivisionSeason.seasonId
      ) {
        allSeasonsString += `första säsongen är ${firstDbSeason.season.year} (medan laget debuterade i högsta serien ${firstFirstDivisionSeason.year}).\n `
      }
      if (
        latestDbSeason.season.seasonId === latestFirstDivisionSeason.seasonId
      ) {
        allSeasonsString += `Senaste säsongen i högsta serien är ${latestDbSeason.season.year}.\n`
      } else if (
        latestDbSeason.season.seasonId > latestFirstDivisionSeason.seasonId
      ) {
        allSeasonsString += `Senaste säsongen i databasen är ${latestDbSeason.season.year}, och senast laget var i högsta serien är säsongen ${latestFirstDivisionSeason.year}.\n`
      }
    } else if (firstDivSeasons === 0) {
      allSeasonsString += `mellan ${firstDbSeason.season.year} och ${latestDbSeason.season.year}.\n`
    }
  }

  const returnString = `${teamName} från ${teamCity} har ${firstDivString} i högsta divisionen.\n ${allSeasonsString} ${qualificationString}`
  return returnString
}

function getFinalsAndWinsString({
  teamName,
  finalWins,
  finalCount,
  finalWinCount,
}: {
  teamName: string
  finalWins: { year: string | null }[]
  finalCount: number
  finalWinCount: number
}): string {
  const finals = finalCount
  const golds = finalWinCount
  let winString = ''

  winString += finalWins.reduce(
    (str, winYear) => `${str}, ${winYear.year ? winYear.year.slice(0, 4) : ''}`,
    '',
  )
  if (finals > 0 && golds > 0) {
    return `${teamName} har spelat ${
      finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`
    } och vunnit ${
      golds === 1
        ? `en gång (${winString.slice(2)}).`
        : `${golds} gånger (${winString.slice(2)}).`
    }`
  } else if (finals > 0) {
    return `${teamName} har spelat ${
      finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`
    } men har aldrig vunnit.`
  }

  return ''
}

function getPlayoffCountString(playoffCount: number): string {
  if (playoffCount > 1) {
    return `Laget har kvalificerat sig för slutspel ${playoffCount} gånger.`
  } else if (playoffCount === 1) {
    return 'Laget har kvalificerat sig för slutspel en gång.'
  } else {
    return 'Laget har inte kvalificerat sig för slutspel genom seriespel.'
  }
}
