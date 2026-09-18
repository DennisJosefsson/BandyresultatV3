import { db } from '@/db'
import {
  competitions,
  seasons,
  series,
  teamgames,
  teamlogos,
  teamnames,
  teams,
} from '@/db/schema'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import type { SQL } from 'drizzle-orm'
import {
  and,
  countDistinct,
  desc,
  eq,
  gte,
  inArray,
} from 'drizzle-orm'

export async function getGeneralStatsData({
  women,
}: {
  women: boolean
}) {
  const golds = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teamnames.name,
        shortName: teamnames.shortName,
        casualName: teamnames.casualName,
        logo: {
          logoId: teamlogos.logoId,
          hasDark: teamlogos.hasDark,
        },
      } as unknown as SQL<TeamBaseWithLogo>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.women, women),
        eq(series.category, 'final'),
        eq(teamgames.win, true),
      ),
    )
    .groupBy(
      teams.teamId,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .orderBy(desc(countDistinct(teamgames.seasonId)))
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            filteredResult[index - 1].count === item.count
              ? filteredResult.find(
                  (r) => r.count === item.count,
                )?.position
              : item.position,
        }
      })
    })

  const finals = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teamnames.name,
        shortName: teamnames.shortName,
        casualName: teamnames.casualName,
        logo: {
          logoId: teamlogos.logoId,
          hasDark: teamlogos.hasDark,
        },
      } as unknown as SQL<TeamBaseWithLogo>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.women, women),
        eq(series.category, 'final'),
      ),
    )
    .groupBy(
      teams.teamId,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .orderBy(desc(countDistinct(teamgames.seasonId)))
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            filteredResult[index - 1].count === item.count
              ? filteredResult.find(
                  (r) => r.count === item.count,
                )?.position
              : item.position,
        }
      })
    })

  const allPlayoffs = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teamnames.name,
        shortName: teamnames.shortName,
        casualName: teamnames.casualName,
        logo: {
          logoId: teamlogos.logoId,
          hasDark: teamlogos.hasDark,
        },
      } as unknown as SQL<TeamBaseWithLogo>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.women, women),
        inArray(series.category, [
          'playoffseries',
          'quarter',
          'semi',
          'final',
        ]),
      ),
    )
    .groupBy(
      teams.teamId,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .orderBy(desc(countDistinct(teamgames.seasonId)))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            filteredResult[index - 1].count === item.count
              ? filteredResult.find(
                  (r) => r.count === item.count,
                )?.position
              : item.position,
        }
      })
    })

  const allSeasons = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teamnames.name,
        shortName: teamnames.shortName,
        casualName: teamnames.casualName,
        logo: {
          logoId: teamlogos.logoId,
          hasDark: teamlogos.hasDark,
        },
      } as unknown as SQL<TeamBaseWithLogo>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .where(
      and(
        eq(teamgames.women, women),
        eq(competitions.division, 1),
      ),
    )
    .groupBy(
      teams.teamId,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .orderBy(desc(countDistinct(teamgames.seasonId)))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            filteredResult[index - 1].count === item.count
              ? filteredResult.find(
                  (r) => r.count === item.count,
                )?.position
              : item.position,
        }
      })
    })

  const seasonCount = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teamnames.name,
        shortName: teamnames.shortName,
        casualName: teamnames.casualName,
        logo: {
          logoId: teamlogos.logoId,
          hasDark: teamlogos.hasDark,
        },
      } as unknown as SQL<TeamBaseWithLogo>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamgames.seasonId),
    )
    .where(
      and(
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        gte(seasons.intYear, 1931),
      ),
    )
    .groupBy(
      teams.teamId,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .orderBy(desc(countDistinct(teamgames.seasonId)))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            filteredResult[index - 1].count === item.count
              ? filteredResult.find(
                  (r) => r.count === item.count,
                )?.position
              : item.position,
        }
      })
    })

  const playoffs = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teamnames.name,
        shortName: teamnames.shortName,
        casualName: teamnames.casualName,
        logo: {
          logoId: teamlogos.logoId,
          hasDark: teamlogos.hasDark,
        },
      } as unknown as SQL<TeamBaseWithLogo>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamgames.seasonId),
    )
    .where(
      and(
        eq(teamgames.women, women),
        inArray(series.category, [
          'playoffseries',
          'quarter',
          'semi',
          'final',
        ]),
        gte(seasons.intYear, 1931),
      ),
    )
    .groupBy(
      teams.teamId,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .orderBy(desc(countDistinct(teamgames.seasonId)))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            filteredResult[index - 1].count === item.count
              ? filteredResult.find(
                  (r) => r.count === item.count,
                )?.position
              : item.position,
        }
      })
    })

  return {
    golds,
    finals,
    playoffs,
    allPlayoffs,
    seasons: seasonCount,
    allSeasons,
  }
}
