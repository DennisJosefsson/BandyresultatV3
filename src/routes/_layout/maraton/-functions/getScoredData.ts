import { db } from '@/db'
import { seasons, series, teamgames, teams } from '@/db/schema'
import { TeamBase } from '@/lib/types/team'
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
  SQL,
  sql,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

export async function getScoredData({ women }: { women: boolean }) {
  const averageScoredMax = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
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
        sql`round(avg(teamgames.goals_scored),2)`.mapWith(Number).as('data'),
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

  const averageScoredMaxHome = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
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
        sql`round(avg(teamgames.goals_scored),2)`.mapWith(Number).as('data'),
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

  const averageScoredMaxAway = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
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
        sql`round(avg(teamgames.goals_scored),2)`.mapWith(Number).as('data'),
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

  const averageScoredMin = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
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
      asc(sql`round(avg(teamgames.goals_scored),2)`.mapWith(Number).as('data')),
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

  const averageScoredMinHome = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
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
      asc(sql`round(avg(teamgames.goals_scored),2)`.mapWith(Number).as('data')),
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

  const averageScoredMinAway = await db
    .select({
      data: sql`round(avg(teamgames.goals_scored),2)`
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
      asc(sql`round(avg(teamgames.goals_scored),2)`.mapWith(Number).as('data')),
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

  const sumScoredMax = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data'),
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
    .orderBy(desc(sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data')))
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

  const sumScoredMaxHome = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data'),
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
    .orderBy(desc(sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data')))
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

  const sumScoredMaxAway = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data'),
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
    .orderBy(desc(sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data')))
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

  const sumScoredMin = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data'),
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
    .orderBy(asc(sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data')))
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

  const sumScoredMinHome = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data'),
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
    .orderBy(asc(sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data')))
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

  const sumScoredMinAway = await db
    .select({
      data: sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data'),
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
    .orderBy(asc(sql`sum(teamgames.goals_scored)`.mapWith(Number).as('data')))
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

  const team = alias(teams, 'team')
  const opponent = alias(teams, 'opponent')

  const gamesMaxGoals = await db
    .select({
      ...getTableColumns(teamgames),
      team: {
        teamId: team.teamId,
        name: team.name,
        shortName: team.shortName,
        casualName: team.casualName,
      } as unknown as SQL<TeamBase>,
      opponent: {
        teamId: opponent.teamId,
        name: opponent.name,
        shortName: opponent.shortName,
        casualName: opponent.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(team, eq(team.teamId, teamgames.teamId))
    .leftJoin(opponent, eq(opponent.teamId, teamgames.opponentId))
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
    .orderBy(desc(teamgames.totalGoals), desc(teamgames.date))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return {
          teams: `${item.team.casualName}-${item.opponent.casualName}`,
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
            index !== 0 && filteredResult[index - 1].goals === item.goals
              ? filteredResult.find((res) => res.goals === item.goals)?.position
              : item.position,
        }
      })
    })

  const gamesMinGoals = await db
    .select({
      ...getTableColumns(teamgames),
      team: {
        teamId: team.teamId,
        name: team.name,
        shortName: team.shortName,
        casualName: team.casualName,
      } as unknown as SQL<TeamBase>,
      opponent: {
        teamId: opponent.teamId,
        name: opponent.name,
        shortName: opponent.shortName,
        casualName: opponent.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(team, eq(team.teamId, teamgames.teamId))
    .leftJoin(opponent, eq(opponent.teamId, teamgames.opponentId))
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
    .orderBy(asc(teamgames.totalGoals), desc(teamgames.date))
    .limit(10)
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return {
          teams: `${item.team.casualName}-${item.opponent.casualName}`,
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
            index !== 0 && filteredResult[index - 1].goals === item.goals
              ? filteredResult.find((res) => res.goals === item.goals)?.position
              : item.position,
        }
      })
    })

  const lastMaxGoal = gamesMaxGoals[gamesMaxGoals.length - 1].goals!

  const lastMinGoal = gamesMinGoals[gamesMaxGoals.length - 1].goals!

  const maxGoalCount = await db
    .select({ count: count(teamgames.gameId) })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        ne(teamgames.category, 'qualification'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
        eq(teamgames.homeGame, true),
        eq(teamgames.totalGoals, lastMaxGoal!),
      ),
    )
    .then((res) => res[0].count)

  const minGoalCount = await db
    .select({ count: count(teamgames.gameId) })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        gt(teamgames.seasonId, women ? 162 : 101),
        eq(teamgames.played, true),
        ne(teamgames.category, 'qualification'),
        eq(teamgames.women, women),
        eq(series.level, 1.0),
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
