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
  asc,
  count,
  desc,
  eq,
  getTableColumns,
  gt,
  gte,
  ne,
  sql,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

export async function getScoredData({
  women,
}: {
  women: boolean
}) {
  const averageScoredMax = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 10))
    .orderBy(
      desc(
        sql`round(avg(teamgames.goals_scored),2)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const averageScoredMaxHome = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, true),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      desc(
        sql`round(avg(teamgames.goals_scored),2)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const averageScoredMaxAway = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, false),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      desc(
        sql`round(avg(teamgames.goals_scored),2)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const averageScoredMin = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 10))
    .orderBy(
      asc(
        sql`round(avg(teamgames.goals_scored),2)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const averageScoredMinHome = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, true),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      asc(
        sql`round(avg(teamgames.goals_scored),2)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const averageScoredMinAway = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, false),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      asc(
        sql`round(avg(teamgames.goals_scored),2)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const sumScoredMax = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 10))
    .orderBy(
      desc(
        sql`sum(teamgames.goals_scored)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const sumScoredMaxHome = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, true),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      desc(
        sql`sum(teamgames.goals_scored)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const sumScoredMaxAway = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, false),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      desc(
        sql`sum(teamgames.goals_scored)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const sumScoredMin = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 10))
    .orderBy(
      asc(
        sql`sum(teamgames.goals_scored)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const sumScoredMinHome = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, true),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      asc(
        sql`sum(teamgames.goals_scored)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const sumScoredMinAway = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`
        .mapWith(Number)
        .as('data'),
      year: seasons.year as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(
      teamnames,
      eq(teams.teamnameId, teamnames.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, false),
      ),
    )
    .groupBy(
      teams.teamId,
      seasons.year,
      teamnames.name,
      teamnames.shortName,
      teamnames.casualName,
      teamlogos.logoId,
      teamlogos.hasDark,
    )
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      asc(
        sql`sum(teamgames.goals_scored)`
          .mapWith(Number)
          .as('data'),
      ),
    )
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
            filteredResult[index - 1].data === item.data
              ? filteredResult.find(
                  (r) => r.data === item.data,
                )?.position
              : item.position,
        }
      })
    })

  const team = alias(teams, 'team')
  const opponent = alias(teams, 'opponent')
  const teamName = alias(teamnames, 'team_name')
  const opponentName = alias(teamnames, 'opponent_name')
  const teamLogo = alias(teamlogos, 'team_logo')
  const opponentLogo = alias(teamlogos, 'opponent_logo')

  const gamesMaxGoals = await db
    .select({
      ...getTableColumns(teamgames),
      team: {
        teamId: team.teamId,
        name: teamName.name,
        shortName: teamName.shortName,
        casualName: teamName.casualName,
        logo: {
          logoId: teamLogo.logoId,
          hasDark: teamLogo.hasDark,
        },
      } as unknown as SQL<TeamBaseWithLogo>,
      opponent: {
        teamId: opponent.teamId,
        name: opponentName.name,
        shortName: opponentName.shortName,
        casualName: opponentName.casualName,
        logo: {
          logoId: opponentLogo.logoId,
          hasDark: opponentLogo.hasDark,
        },
      } as unknown as SQL<TeamBaseWithLogo>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(team, eq(team.teamId, teamgames.teamId))
    .leftJoin(
      teamName,
      eq(teamName.teamnameId, team.teamnameId),
    )
    .leftJoin(
      teamLogo,
      eq(teamLogo.logoId, teamName.logoId),
    )
    .leftJoin(
      opponent,
      eq(opponent.teamId, teamgames.opponentId),
    )
    .leftJoin(
      opponentName,
      eq(opponentName.teamnameId, opponent.teamnameId),
    )
    .leftJoin(
      opponentLogo,
      eq(opponentLogo.logoId, opponentName.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, true),
      ),
    )
    .orderBy(
      desc(teamgames.totalGoals),
      desc(teamgames.date),
    )
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return {
          home: item.team,
          away: item.opponent,
          result: `${item.goalsScored}-${item.goalsConceded}`,
          goals: item.totalGoals,
          date: item.date,
          position: index + 1,
        }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            filteredResult[index - 1].goals === item.goals
              ? filteredResult.find(
                  (r) => r.goals === item.goals,
                )?.position
              : item.position,
        }
      })
    })

  const gamesMinGoals = await db
    .select({
      ...getTableColumns(teamgames),
      team: {
        teamId: team.teamId,
        name: teamName.name,
        shortName: teamName.shortName,
        casualName: teamName.casualName,
        logo: {
          logoId: teamLogo.logoId,
          hasDark: teamLogo.hasDark,
        },
      } as unknown as SQL<TeamBaseWithLogo>,
      opponent: {
        teamId: opponent.teamId,
        name: opponentName.name,
        shortName: opponentName.shortName,
        casualName: opponentName.casualName,
        logo: {
          logoId: opponentLogo.logoId,
          hasDark: opponentLogo.hasDark,
        },
      } as unknown as SQL<TeamBaseWithLogo>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      competitions,
      eq(competitions.competitionId, series.competitionId),
    )
    .leftJoin(team, eq(team.teamId, teamgames.teamId))
    .leftJoin(
      teamName,
      eq(teamName.teamnameId, team.teamnameId),
    )
    .leftJoin(
      teamLogo,
      eq(teamLogo.logoId, teamName.logoId),
    )
    .leftJoin(
      opponent,
      eq(opponent.teamId, teamgames.opponentId),
    )
    .leftJoin(
      opponentName,
      eq(opponentName.teamnameId, opponent.teamnameId),
    )
    .leftJoin(
      opponentLogo,
      eq(opponentLogo.logoId, opponentName.logoId),
    )
    .leftJoin(
      seasons,
      eq(teamgames.seasonId, seasons.seasonId),
    )
    .where(
      and(
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        eq(series.category, 'regular'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, true),
      ),
    )
    .orderBy(
      asc(teamgames.totalGoals),
      desc(teamgames.date),
    )
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return {
          home: item.team,
          away: item.opponent,
          result: `${item.goalsScored}-${item.goalsConceded}`,
          goals: item.totalGoals,
          date: item.date,
          position: index + 1,
        }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            filteredResult[index - 1].goals === item.goals
              ? filteredResult.find(
                  (r) => r.goals === item.goals,
                )?.position
              : item.position,
        }
      })
    })

  const lastMaxGoal =
    gamesMaxGoals[gamesMaxGoals.length - 1].goals!

  const lastMinGoal =
    gamesMinGoals[gamesMaxGoals.length - 1].goals!

  const maxGoalCount = await db
    .select({ count: count(teamgames.gameId) })
    .from(teamgames)
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
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        ne(series.category, 'qualification'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, true),
        eq(teamgames.totalGoals, lastMaxGoal!),
      ),
    )
    .then((res) => res[0].count)

  const minGoalCount = await db
    .select({ count: count(teamgames.gameId) })
    .from(teamgames)
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
        gt(seasons.intYear, women ? 2015 : 2007),
        eq(teamgames.played, true),
        ne(series.category, 'qualification'),
        eq(teamgames.women, women),
        eq(competitions.division, 1),
        eq(teamgames.homeGame, true),
        eq(teamgames.totalGoals, lastMinGoal!),
      ),
    )
    .then((res) => res[0].count)

  return {
    averageMax: averageScoredMax,
    averageMaxHome: averageScoredMaxHome,
    averageMaxAway: averageScoredMaxAway,
    averageMin: averageScoredMin,
    averageMinHome: averageScoredMinHome,
    averageMinAway: averageScoredMinAway,
    sumMax: sumScoredMax,
    sumMaxHome: sumScoredMaxHome,
    sumMaxAway: sumScoredMaxAway,
    sumMin: sumScoredMin,
    sumMinHome: sumScoredMinHome,
    sumMinAway: sumScoredMinAway,
    gamesMaxGoals,
    gamesMinGoals,
    count: {
      maxGoalCount,
      lastMaxGoal,
      minGoalCount,
      lastMinGoal,
    },
  }
}
