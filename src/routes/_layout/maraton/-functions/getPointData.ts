import { db } from '@/db'
import { seasons, series, teamgames, teams } from '@/db/schema'
import { TeamBase } from '@/lib/types/team'
import { and, asc, count, desc, eq, gt, gte, SQL, sql } from 'drizzle-orm'

export async function getPointData({ women }: { women: boolean }) {
  const averagePointsMax = await db
    .select({
      data: sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 10))
    .orderBy(
      desc(sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data')),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const averagePointsMaxHome = await db
    .select({
      data: sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
        eq(teamgames.homeGame, true),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      desc(sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data')),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const averagePointsMaxAway = await db
    .select({
      data: sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
        eq(teamgames.homeGame, false),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      desc(sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data')),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const averagePointsMin = await db
    .select({
      data: sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 10))
    .orderBy(
      asc(sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data')),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const averagePointsMinHome = await db
    .select({
      data: sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
        eq(teamgames.homeGame, true),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      asc(sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data')),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const averagePointsMinAway = await db
    .select({
      data: sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
        eq(teamgames.homeGame, false),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(
      asc(sql`round(avg(teamgames.points),2)`.mapWith(Number).as('data')),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const sumPointsMax = await db
    .select({
      data: sql`sum(teamgames.points)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 10))
    .orderBy(desc(sql`sum(teamgames.points)`.mapWith(Number).as('data')))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const sumPointsMaxHome = await db
    .select({
      data: sql`sum(teamgames.points)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
        eq(teamgames.homeGame, true),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(desc(sql`sum(teamgames.points)`.mapWith(Number).as('data')))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const sumPointsMaxAway = await db
    .select({
      data: sql`sum(teamgames.points)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
        eq(teamgames.homeGame, false),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(desc(sql`sum(teamgames.points)`.mapWith(Number).as('data')))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const sumPointsMin = await db
    .select({
      data: sql`sum(teamgames.points)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 10))
    .orderBy(asc(sql`sum(teamgames.points)`.mapWith(Number).as('data')))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const sumPointsMinHome = await db
    .select({
      data: sql`sum(teamgames.points)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
        eq(teamgames.homeGame, true),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(asc(sql`sum(teamgames.points)`.mapWith(Number).as('data')))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const sumPointsMinAway = await db
    .select({
      data: sql`sum(teamgames.points)`.mapWith(Number).as('data'),
      year: seasons.year as unknown as SQL<string>,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(seasons, eq(teamgames.seasonId, seasons.seasonId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        eq(teamgames.category, 'regular'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
        eq(teamgames.homeGame, false),
      ),
    )
    .groupBy(teams.teamId, seasons.year)
    .having(gte(count(teamgames.teamGameId), 5))
    .orderBy(asc(sql`sum(teamgames.points)`.mapWith(Number).as('data')))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  return {
    averageMax: averagePointsMax,
    averageMaxHome: averagePointsMaxHome,
    averageMaxAway: averagePointsMaxAway,
    averageMin: averagePointsMin,
    averageMinHome: averagePointsMinHome,
    averageMinAway: averagePointsMinAway,
    sumMax: sumPointsMax,
    sumMaxHome: sumPointsMaxHome,
    sumMaxAway: sumPointsMaxAway,
    sumMin: sumPointsMin,
    sumMinHome: sumPointsMinHome,
    sumMinAway: sumPointsMinAway,
  }
}
