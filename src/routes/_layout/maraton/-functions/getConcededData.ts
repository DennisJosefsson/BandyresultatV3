import { db } from '@/db'
import { seasons, series, teamgames, teams } from '@/db/schema'
import { TeamBase } from '@/lib/types/team'
import { and, asc, count, desc, eq, gt, gte, SQL, sql } from 'drizzle-orm'

export async function getConcededData({ women }: { women: boolean }) {
  const averageConcededMax = await db
    .select({
      data: sql`round(avg(teamgames.goals_conceded),2)`
        .mapWith(Number)
        .as('data'),
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
      desc(
        sql`round(avg(teamgames.goals_conceded),2)`.mapWith(Number).as('data'),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const averageConcededMaxHome = await db
    .select({
      data: sql`round(avg(teamgames.goals_conceded),2)`
        .mapWith(Number)
        .as('data'),
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
      desc(
        sql`round(avg(teamgames.goals_conceded),2)`.mapWith(Number).as('data'),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const averageConcededMaxAway = await db
    .select({
      data: sql`round(avg(teamgames.goals_conceded),2)`
        .mapWith(Number)
        .as('data'),
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
      desc(
        sql`round(avg(teamgames.goals_conceded),2)`.mapWith(Number).as('data'),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const averageConcededMin = await db
    .select({
      data: sql`round(avg(teamgames.goals_conceded),2)`
        .mapWith(Number)
        .as('data'),
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
      asc(
        sql`round(avg(teamgames.goals_conceded),2)`.mapWith(Number).as('data'),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const averageConcededMinHome = await db
    .select({
      data: sql`round(avg(teamgames.goals_conceded),2)`
        .mapWith(Number)
        .as('data'),
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
      asc(
        sql`round(avg(teamgames.goals_conceded),2)`.mapWith(Number).as('data'),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const averageConcededMinAway = await db
    .select({
      data: sql`round(avg(teamgames.goals_conceded),2)`
        .mapWith(Number)
        .as('data'),
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
      asc(
        sql`round(avg(teamgames.goals_conceded),2)`.mapWith(Number).as('data'),
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
            index !== 0 && filteredResult[index - 1].data === item.data
              ? filteredResult.find((res) => res.data === item.data)?.position
              : item.position,
        }
      })
    })

  const sumConcededMax = await db
    .select({
      data: sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data'),
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
      desc(sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data')),
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

  const sumConcededMaxHome = await db
    .select({
      data: sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data'),
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
      desc(sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data')),
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

  const sumConcededMaxAway = await db
    .select({
      data: sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data'),
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
      desc(sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data')),
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

  const sumConcededMin = await db
    .select({
      data: sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data'),
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
    .orderBy(asc(sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data')))
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

  const sumConcededMinHome = await db
    .select({
      data: sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data'),
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
    .orderBy(asc(sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data')))
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

  const sumConcededMinAway = await db
    .select({
      data: sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data'),
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
    .orderBy(asc(sql`sum(teamgames.goals_conceded)`.mapWith(Number).as('data')))
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
    averageMax: averageConcededMax,
    averageMaxHome: averageConcededMaxHome,
    averageMaxAway: averageConcededMaxAway,
    averageMin: averageConcededMin,
    averageMinHome: averageConcededMinHome,
    averageMinAway: averageConcededMinAway,
    sumMax: sumConcededMax,
    sumMaxHome: sumConcededMaxHome,
    sumMaxAway: sumConcededMaxAway,
    sumMin: sumConcededMin,
    sumMinHome: sumConcededMinHome,
    sumMinAway: sumConcededMinAway,
  }
}
