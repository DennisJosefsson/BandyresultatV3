import { db } from '@/db'
import { games, series, teamgames, teams } from '@/db/schema'
import { Unpacked } from '@/lib/types/unpacked'

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
  lte,
  ne,
  or,
  SQL,
  sql,
  sum,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const team = alias(teams, 'team')
const opponent = alias(teams, 'opponent')
const s1 = alias(series, 's1')

type GetCatTables = {
  teamArray: number[]
  categoryArray: string[]
  endSeason: number
  startSeason: number
}

type Team = {
  teamId: number
  name: string
  shortName: string
  casualName: string
}

export const getCatTables = ({
  teamArray,
  categoryArray,
  endSeason,
  startSeason,
}: GetCatTables) =>
  db
    .select({
      teamId: teamgames.teamId,
      opponentId: teamgames.opponentId,
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

      totalWins: sql<number>`cast(count(*) filter (where win) as int)`.as(
        'totalWins',
      ),
      totalDraws: sql<number>`cast(count(*) filter (where draw) as int)`.as(
        'totalDraws',
      ),
      totalLost: sql<number>`cast(count(*) filter (where lost) as int)`.as(
        'totalLost',
      ),
      team: {
        teamId: team.teamId,
        name: team.name,
        casualName: team.casualName,
        shortName: team.shortName,
      } as unknown as SQL<Team>,
      opponent: {
        teamId: opponent.teamId,
        name: opponent.name,
        casualName: opponent.casualName,
        shortName: opponent.shortName,
      } as unknown as SQL<Team>,
      serie: {
        level: s1.level,
      } as unknown as SQL<{ level: number }>,
    })
    .from(teamgames)
    .leftJoin(team, eq(teamgames.teamId, team.teamId))
    .leftJoin(opponent, eq(teamgames.opponentId, opponent.teamId))
    .leftJoin(s1, eq(teamgames.serieId, s1.serieId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        inArray(teamgames.opponentId, teamArray),
        inArray(teamgames.category, categoryArray),
        gte(teamgames.seasonId, startSeason),
        lte(teamgames.seasonId, endSeason),
        eq(teamgames.played, true),
      ),
    )
    .groupBy(
      teamgames.teamId,
      teamgames.opponentId,
      s1.level,
      teamgames.category,
      team.name,
      team.teamId,
      team.casualName,
      team.shortName,
      opponent.name,
      opponent.teamId,
      opponent.casualName,
      opponent.shortName,
    )
    .orderBy(desc(teamgames.teamId))

export const getAllGamesTables = ({
  teamArray,
  categoryArray,
  endSeason,
  startSeason,
}: GetCatTables) =>
  db
    .select({
      teamId: teamgames.teamId,
      opponentId: teamgames.opponentId,
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

      totalWins: sql<number>`cast(count(*) filter (where win) as int)`.as(
        'totalWins',
      ),
      totalDraws: sql<number>`cast(count(*) filter (where draw) as int)`.as(
        'totalDraws',
      ),
      totalLost: sql<number>`cast(count(*) filter (where lost) as int)`.as(
        'totalLost',
      ),
      team: {
        teamId: team.teamId,
        name: team.name,
        casualName: team.casualName,
        shortName: team.shortName,
      } as unknown as SQL<Team>,
      opponent: {
        teamId: opponent.teamId,
        name: opponent.name,
        casualName: opponent.casualName,
        shortName: opponent.shortName,
      } as unknown as SQL<Team>,
    })
    .from(teamgames)
    .leftJoin(team, eq(teamgames.teamId, team.teamId))
    .leftJoin(opponent, eq(teamgames.opponentId, opponent.teamId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        inArray(teamgames.opponentId, teamArray),
        inArray(teamgames.category, categoryArray),
        gte(teamgames.seasonId, startSeason),
        lte(teamgames.seasonId, endSeason),
        eq(teamgames.played, true),
      ),
    )
    .groupBy(
      teamgames.teamId,
      teamgames.opponentId,
      team.name,
      team.teamId,
      team.casualName,
      team.shortName,
      opponent.name,
      opponent.teamId,
      opponent.casualName,
      opponent.shortName,
    )
    .orderBy(desc(teamgames.teamId))

export const getFirstAndLastGames = async (teamArray: number[]) => {
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
          .sort((a, b) => getTime(new Date(b.date)) - getTime(new Date(a.date)))
          .slice(0, 10) || []
      : firstAndLastGames
          .filter((game) => game.rankedLastGames === 1)
          .sort(
            (a, b) => getTime(new Date(b.date)) - getTime(new Date(a.date)),
          ) || []

  return { firstGames, latestGames }
}

export const getLatestHomeWin = async (teamArray: number[]) => {
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
    })
    .from(games)
    .leftJoin(selected_id, eq(selected_id.gameId, games.gameId))
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .where(eq(selected_id.gameId, games.gameId))
    .orderBy(asc(games.date))

  return latestHomeWin
}

export const getLatestAwayWin = async (teamArray: number[]) => {
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
    })
    .from(games)
    .leftJoin(selected_id, eq(selected_id.gameId, games.gameId))
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .where(eq(selected_id.gameId, games.gameId))
    .orderBy(asc(games.date))

  return latestAwayWin
}

export type CompareCatTable = Awaited<ReturnType<typeof getCatTables>>
export type AllGamesTable = Awaited<ReturnType<typeof getAllGamesTables>>

export type CompareCatTableItem = Unpacked<CompareCatTable>
export type AllGamesTableItem = Unpacked<AllGamesTable>

const getTime = (date?: Date): number => {
  return date != null ? date.getTime() : 0
}

export const getGolds = (teamArray: number[]) =>
  db
    .select({
      teamId: teamgames.teamId,
      guld: countDistinct(teamgames.seasonId).as('gold'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{ name: string; casualName: string }>,
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
    .orderBy(desc(sql`gold`))

export const getPlayoffs = (teamArray: number[]) =>
  db
    .select({
      teamId: teamgames.teamId,
      playoffs: countDistinct(teamgames.seasonId).as('playoffs'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{ name: string; casualName: string }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        gte(teamgames.seasonId, 25),
        or(
          inArray(teamgames.category, ['quarter', 'semi', 'final']),
          inArray(teamgames.group, ['SlutspelA', 'SlutspelB']),
        ),
      ),
    )
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`playoffs`))

export const getAllPlayoffs = (teamArray: number[]) =>
  db
    .select({
      teamId: teamgames.teamId,
      playoffs: countDistinct(teamgames.seasonId).as('playoffs'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{ name: string; casualName: string }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        or(
          inArray(teamgames.category, ['quarter', 'semi', 'final']),
          inArray(teamgames.group, ['SlutspelA', 'SlutspelB']),
        ),
      ),
    )
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`playoffs`))

export const getFirstDivisionSeasonsSince1931 = (teamArray: number[]) =>
  db
    .select({
      teamId: teamgames.teamId,
      seasons: countDistinct(teamgames.seasonId).as('seasons'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{ name: string; casualName: string }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        gte(teamgames.seasonId, 25),
        eq(series.level, 1),
        eq(teamgames.category, 'regular'),
      ),
    )
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`seasons`))

export const getAllDbSeasons = (teamArray: number[]) =>
  db
    .select({
      teamId: teamgames.teamId,
      seasons: countDistinct(teamgames.seasonId).as('seasons'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{ name: string; casualName: string }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .where(inArray(teamgames.teamId, teamArray))
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`seasons`))

export const getFirstDivisionSeasons = (teamArray: number[]) =>
  db
    .select({
      teamId: teamgames.teamId,
      seasons: countDistinct(teamgames.seasonId).as('seasons'),
      team: {
        name: teams.name,
        casualName: teams.casualName,
      } as unknown as SQL<{ name: string; casualName: string }>,
    })
    .from(teamgames)
    .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
    .leftJoin(series, eq(teamgames.serieId, series.serieId))
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        eq(series.level, 1),
        ne(teamgames.category, 'qualification'),
      ),
    )
    .groupBy(teams.casualName, teams.name, teamgames.teamId)
    .orderBy(desc(sql`seasons`))
