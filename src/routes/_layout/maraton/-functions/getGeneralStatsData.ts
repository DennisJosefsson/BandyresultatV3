import { db } from '@/db'
import { series, teamgames, teams } from '@/db/schema'
import { TeamBase } from '@/lib/types/team'
import { and, countDistinct, desc, eq, gte, inArray, SQL } from 'drizzle-orm'

export async function getGeneralStatsData({ women }: { women: boolean }) {
  const golds = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .where(
      and(
        eq(teamgames.women, women),
        eq(teamgames.category, 'final'),
        eq(teamgames.win, true),
      ),
    )
    .groupBy(teams.teamId)
    .orderBy(desc(countDistinct(teamgames.seasonId)))
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 && filteredResult[index - 1].count === item.count
              ? filteredResult.find((res) => res.count === item.count)?.position
              : item.position,
        }
      })
    })

  const finals = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .where(and(eq(teamgames.women, women), eq(teamgames.category, 'final')))
    .groupBy(teams.teamId)
    .orderBy(desc(countDistinct(teamgames.seasonId)))
    .then((res) => {
      const filteredResult = res.map((item, index) => {
        return { ...item, position: index + 1 }
      })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 && filteredResult[index - 1].count === item.count
              ? filteredResult.find((res) => res.count === item.count)?.position
              : item.position,
        }
      })
    })

  const allPlayoffs = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .where(
      and(
        eq(teamgames.women, women),
        inArray(teamgames.category, [
          'playoffseries',
          'quarter',
          'semi',
          'final',
        ]),
      ),
    )
    .groupBy(teams.teamId)
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
            index !== 0 && filteredResult[index - 1].count === item.count
              ? filteredResult.find((res) => res.count === item.count)?.position
              : item.position,
        }
      })
    })

  const allSeasons = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(and(eq(teamgames.women, women), eq(series.level, 1.0)))
    .groupBy(teams.teamId)
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
            index !== 0 && filteredResult[index - 1].count === item.count
              ? filteredResult.find((res) => res.count === item.count)?.position
              : item.position,
        }
      })
    })

  const seasons = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.women, women),
        eq(series.level, 1.0),
        gte(teamgames.seasonId, 25),
      ),
    )
    .groupBy(teams.teamId)
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
            index !== 0 && filteredResult[index - 1].count === item.count
              ? filteredResult.find((res) => res.count === item.count)?.position
              : item.position,
        }
      })
    })

  const playoffs = await db
    .select({
      count: countDistinct(teamgames.seasonId),
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<TeamBase>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teamgames.teamId, teams.teamId))
    .where(
      and(
        eq(teamgames.women, women),
        inArray(teamgames.category, [
          'playoffseries',
          'quarter',
          'semi',
          'final',
        ]),
        gte(teamgames.seasonId, 25),
      ),
    )
    .groupBy(teams.teamId)
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
            index !== 0 && filteredResult[index - 1].count === item.count
              ? filteredResult.find((res) => res.count === item.count)?.position
              : item.position,
        }
      })
    })

  return {
    golds,
    finals,
    playoffs,
    allPlayoffs,
    seasons,
    allSeasons,
  }
}
