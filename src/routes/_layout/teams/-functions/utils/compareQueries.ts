import { db } from '@/db'
import {
  games,
  series,
  teamgames,
  teams,
} from '@/db/schema'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  count,
  countDistinct,
  desc,
  eq,
  gte,
  inArray,
  lt,
  ne,
  or,
  sql,
  sum,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { mapObj } from './ageFormatMap'

const s1 = alias(series, 's1')

type GetCatTables = {
  homeTeamId: number
  awayTeamId: number
}

export const getCatTables = ({
  homeTeamId,
  awayTeamId,
}: GetCatTables) =>
  db
    .select({
      category: teamgames.category,
      totalGames: count(teamgames.teamGameId),
      totalPoints: sum(teamgames.points).as(
        'total_points',
      ) as unknown as SQL<number>,
      totalGoalsScored: sum(teamgames.goalsScored).as(
        'total_goals_scored',
      ) as unknown as SQL<number>,
      totalGoalsConceded: sum(teamgames.goalsConceded).as(
        'total_goals_conceded',
      ) as unknown as SQL<number>,

      totalGoalDifference: sum(teamgames.goalDifference).as(
        'total_goal_difference',
      ) as unknown as SQL<number>,

      totalWins:
        sql<number>`cast(count(*) filter (where win) as int)`.as(
          'totalWins',
        ),
      totalDraws:
        sql<number>`cast(count(*) filter (where draw) as int)`.as(
          'totalDraws',
        ),
      totalLost:
        sql<number>`cast(count(*) filter (where lost) as int)`.as(
          'totalLost',
        ),
      serie: {
        division: s1.division,
      } as unknown as SQL<{ division: number }>,
    })
    .from(teamgames)
    .leftJoin(s1, eq(teamgames.serieId, s1.serieId))
    .where(
      and(
        eq(teamgames.teamId, homeTeamId),
        eq(teamgames.opponentId, awayTeamId),
        eq(teamgames.played, true),
      ),
    )
    .groupBy(s1.division, teamgames.category)

export const getAllGamesTables = ({
  homeTeamId,
  awayTeamId,
}: GetCatTables) =>
  db
    .select({
      totalGames: count(teamgames.teamGameId),
      totalPoints: sum(teamgames.points).as(
        'total_points',
      ) as unknown as SQL<number>,
      totalGoalsScored: sum(teamgames.goalsScored).as(
        'total_goals_scored',
      ) as unknown as SQL<number>,
      totalGoalsConceded: sum(teamgames.goalsConceded).as(
        'total_goals_conceded',
      ) as unknown as SQL<number>,

      totalGoalDifference: sum(teamgames.goalDifference).as(
        'total_goal_difference',
      ) as unknown as SQL<number>,

      totalWins:
        sql<number>`cast(count(*) filter (where win) as int)`.as(
          'totalWins',
        ),
      totalDraws:
        sql<number>`cast(count(*) filter (where draw) as int)`.as(
          'totalDraws',
        ),
      totalLost:
        sql<number>`cast(count(*) filter (where lost) as int)`.as(
          'totalLost',
        ),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.teamId, homeTeamId),
        eq(teamgames.opponentId, awayTeamId),
        eq(teamgames.played, true),
      ),
    )

export const getFirstAndLastGames = async (
  teamArray: Array<number>,
) => {
  const first_games = db.$with('first_games').as(
    db
      .select({
        gameId: games.gameId,
        homeTeamId: games.homeTeamId,
        awayTeamId: games.awayTeamId,
        date: games.date,
        result: games.result,
        rankedFirstGames:
          sql<number>`cast(rank() over (partition by home_team_id, away_team_id order by "date" asc) as int)`.as(
            'ranked_first_games',
          ),
        rankedLastGames:
          sql<number>`cast(rank() over (partition by home_team_id, away_team_id order by "date" desc) as int)`.as(
            'ranked_last_games',
          ),
      })
      .from(games)
      .where(
        and(
          inArray(games.homeTeamId, teamArray),
          inArray(games.awayTeamId, teamArray),
          eq(games.played, true),
        ),
      ),
  )

  const home = alias(teams, 'home')
  const away = alias(teams, 'away')

  const firstAndLastGames = await db
    .with(first_games)
    .select({
      gameId: first_games.gameId,
      result: first_games.result,
      homeName: home.casualName,
      awayName: away.casualName,
      date: first_games.date,
      rankedFirstGames: first_games.rankedFirstGames,
      rankedLastGames: first_games.rankedLastGames,
    })
    .from(first_games)
    .leftJoin(home, eq(first_games.homeTeamId, home.teamId))
    .leftJoin(away, eq(first_games.awayTeamId, away.teamId))
    .where(
      or(
        eq(first_games.rankedFirstGames, 1),
        lt(first_games.rankedLastGames, 11),
      ),
    )
    .orderBy(asc(first_games.date))

  const firstGames = firstAndLastGames.filter(
    (game) => game.rankedFirstGames === 1,
  )

  const latestGames =
    teamArray.length === 2
      ? firstAndLastGames
          .filter((game) => game.rankedFirstGames !== 1)
          .sort(
            (a, b) =>
              getTime(new Date(b.date)) -
              getTime(new Date(a.date)),
          )
          .slice(0, 10) || []
      : firstAndLastGames
          .filter((game) => game.rankedLastGames === 1)
          .sort(
            (a, b) =>
              getTime(new Date(b.date)) -
              getTime(new Date(a.date)),
          ) || []

  return { firstGames, latestGames }
}

function formatAge(ageString: string) {
  ageString =
    ageString.replace(
      /\b(?:year|years|month|mons|day|days)\b/gi,
      (matched) => mapObj.get(matched),
    ) + ' sedan'

  return ageString
}

export const getLatestHomeWin = async (
  teamArray: Array<number>,
) => {
  const latest_home_win = db.$with('latest_home_win').as(
    db
      .select({
        gameId: teamgames.gameId,
        rankedLatestGames:
          sql<number>`cast(rank() over (partition by team, opponent order by "date" desc) as int)`.as(
            'ranked_latest_games',
          ),
      })
      .from(teamgames)
      .where(
        and(
          inArray(teamgames.teamId, teamArray),
          inArray(teamgames.opponentId, teamArray),
          eq(teamgames.homeGame, true),
          eq(teamgames.win, true),
          ne(teamgames.category, 'final'),
        ),
      ),
  )

  const selected_id = db
    .$with('selected_id')
    .as(
      db
        .with(latest_home_win)
        .select({ gameId: latest_home_win.gameId })
        .from(latest_home_win)
        .where(eq(latest_home_win.rankedLatestGames, 1)),
    )

  const home = alias(teams, 'home')
  const away = alias(teams, 'away')

  const latestHomeWin = await db
    .with(selected_id)
    .select({
      gameId: games.gameId,
      result: games.result,
      homeName: home.casualName,
      awayName: away.casualName,
      date: games.date,
      age: sql`age(games."date") as time_since`.mapWith(
        String,
      ),
    })
    .from(games)
    .leftJoin(
      selected_id,
      eq(selected_id.gameId, games.gameId),
    )
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .where(eq(selected_id.gameId, games.gameId))
    .orderBy(asc(games.date))

  return latestHomeWin.map((g) => {
    return { ...g, age: formatAge(g.age) }
  })
}

export const getLatestAwayWin = async (
  teamArray: Array<number>,
) => {
  const latest_away_win = db.$with('latest_away_win').as(
    db
      .select({
        gameId: teamgames.gameId,
        rankedLatestGames:
          sql<number>`cast(rank() over (partition by team, opponent order by "date" desc) as int)`.as(
            'ranked_latest_games',
          ),
      })
      .from(teamgames)
      .where(
        and(
          inArray(teamgames.teamId, teamArray),
          inArray(teamgames.opponentId, teamArray),
          eq(teamgames.homeGame, false),
          eq(teamgames.win, true),
          ne(teamgames.category, 'final'),
        ),
      ),
  )

  const selected_id = db
    .$with('selected_id')
    .as(
      db
        .with(latest_away_win)
        .select({ gameId: latest_away_win.gameId })
        .from(latest_away_win)
        .where(eq(latest_away_win.rankedLatestGames, 1)),
    )

  const home = alias(teams, 'home')
  const away = alias(teams, 'away')

  const latestAwayWin = await db
    .with(selected_id)
    .select({
      gameId: games.gameId,
      result: games.result,
      homeName: home.casualName,
      awayName: away.casualName,
      date: games.date,
      age: sql`age(games."date") as time_since`.mapWith(
        String,
      ),
    })
    .from(games)
    .leftJoin(
      selected_id,
      eq(selected_id.gameId, games.gameId),
    )
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .where(eq(selected_id.gameId, games.gameId))
    .orderBy(asc(games.date))

  return latestAwayWin.map((g) => {
    return { ...g, age: formatAge(g.age) }
  })
}

const getTime = (date?: Date): number => {
  return date != null ? date.getTime() : 0
}




export const getGolds = (teamArray: Array<number>) =>
  db
    .select({
      teamId: teamgames.teamId,
      data: countDistinct(teamgames.seasonId).as('data'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{
        name: string
        casualName: string
      }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        eq(teamgames.category, 'final'),
        eq(teamgames.win, true),
      ),
    )
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`data`))

export const getPlayoffs = (teamArray: Array<number>) =>
  db
    .select({
      teamId: teamgames.teamId,
      data: countDistinct(teamgames.seasonId).as('data'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{
        name: string
        casualName: string
      }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        gte(teamgames.seasonId, 25),
        or(
          inArray(teamgames.category, [
            'quarter',
            'semi',
            'final',
          ]),
          inArray(teamgames.group, [
            'SlutspelA',
            'SlutspelB',
          ]),
        ),
      ),
    )
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`data`))

export const getAllPlayoffs = (teamArray: Array<number>) =>
  db
    .select({
      teamId: teamgames.teamId,
      data: countDistinct(teamgames.seasonId).as('data'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{
        name: string
        casualName: string
      }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        or(
          inArray(teamgames.category, [
            'quarter',
            'semi',
            'final',
          ]),
          inArray(teamgames.group, [
            'SlutspelA',
            'SlutspelB',
          ]),
        ),
      ),
    )
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`data`))

export const getFirstDivisionSeasonsSince1931 = (
  teamArray: Array<number>,
) =>
  db
    .select({
      teamId: teamgames.teamId,
      data: countDistinct(teamgames.seasonId).as('data'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{
        name: string
        casualName: string
      }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        gte(teamgames.seasonId, 25),
        lt(series.level, 250),
        eq(teamgames.category, 'regular'),
      ),
    )
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`data`))

export const getAllDbSeasons = (teamArray: Array<number>) =>
  db
    .select({
      teamId: teamgames.teamId,
      data: countDistinct(teamgames.seasonId).as('data'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{
        name: string
        casualName: string
      }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .where(inArray(teamgames.teamId, teamArray))
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`data`))

export const getFirstDivisionSeasons = (
  teamArray: Array<number>,
) =>
  db
    .select({
      teamId: teamgames.teamId,
      data: countDistinct(teamgames.seasonId).as('data'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{
        name: string
        casualName: string
      }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        lt(series.level, 250),
        ne(teamgames.category, 'qualification'),
      ),
    )
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`data`))


    export const getCompareStats = async (teamArray:Array<number>) => {
  const golds = await getGolds(teamArray)

      const playoffs = await getPlayoffs(teamArray)

      const allPlayoffs = await getAllPlayoffs(teamArray)

      const firstDivisionSeasonsSince1931 =
        await getFirstDivisionSeasonsSince1931(teamArray)

     

      const firstDivisionSeasons =
        await getFirstDivisionSeasons(teamArray)

      const { firstGames, latestGames } =
        await getFirstAndLastGames(teamArray)

      const latestHomeWin =
        await getLatestHomeWin(teamArray)
      const latestAwayWin =
        await getLatestAwayWin(teamArray)

      return {golds,playoffs,allPlayoffs,firstDivisionSeasonsSince1931,firstDivisionSeasons,firstGames,latestGames,latestHomeWin,latestAwayWin}
}