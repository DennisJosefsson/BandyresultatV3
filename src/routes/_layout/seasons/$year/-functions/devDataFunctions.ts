import { db } from '@/db'
import {
  games,
  parentchildseries,
  series,
  teamgames,
  teams,
  teamseries,
} from '@/db/schema'
import { Game } from '@/lib/types/game'
import { DevDataTableItem, ReturnDevDataTableItem } from '@/lib/types/table'
import {
  and,
  asc,
  count,
  eq,
  getTableColumns,
  inArray,
  or,
  sql,
  SQL,
  sum,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

type FunctionProps = {
  serie: typeof series.$inferSelect
}

export const getDevelopmentData = async ({ serie }: FunctionProps) => {
  const teamArray = await db
    .select({
      teamId: teamseries.teamId,
    })
    .from(teamseries)
    .where(eq(teamseries.serieId, serie.serieId))
    .then((res) => res.map((item) => item.teamId))

  const startTable = serie.hasParent
    ? db.$with('start_table').as(
        db
          .select({
            date: sql`1900-01-01`.mapWith(String).as('date'),
            teamId: teamgames.teamId,
            position: sql`0`.mapWith(Number).as('position'),
            totalGames: count(teamgames.teamGameId).as('total_games'),
            totalPoints: sum(teamgames.points)
              .mapWith(Number)
              .as('total_points'),
            totalGoalsScored: sum(teamgames.goalsScored)
              .mapWith(Number)
              .as('total_goals_scored') as unknown as SQL<number>,
            totalGoalsConceded: sum(teamgames.goalsConceded)
              .mapWith(Number)
              .as('total_goals_conceded') as unknown as SQL<number>,
            totalGoalDifference: sum(teamgames.goalDifference)
              .mapWith(Number)
              .as('total_goal_difference') as unknown as SQL<number>,
            totalWins: sql<number>`cast(count(*) filter (where win) as int)`.as(
              'total_wins',
            ),
            totalDraws:
              sql<number>`cast(count(*) filter (where draw) as int)`.as(
                'total_draws',
              ),
            totalLost:
              sql<number>`cast(count(*) filter (where lost) as int)`.as(
                'total_lost',
              ),
          })
          .from(teamgames)
          .where(
            and(
              inArray(teamgames.teamId, teamArray),
              serie.allParentGames
                ? undefined
                : inArray(teamgames.opponentId, teamArray),
              inArray(
                teamgames.serieId,
                db
                  .select({ parentId: parentchildseries.parentId })
                  .from(parentchildseries)
                  .where(eq(parentchildseries.childId, serie.serieId)),
              ),
              eq(teamgames.played, true),
            ),
          )
          .groupBy(teamgames.teamId),
      )
    : db.$with('start_table').as(
        db
          .selectDistinctOn([teamgames.teamId], {
            date: sql`1900-01-01`.mapWith(String).as('date'),
            teamId: teamgames.teamId,
            position: sql`0`.mapWith(Number).as('position'),
            totalGames: sql`0`.mapWith(Number).as('total_games'),
            totalPoints:
              sql<number>`case when teamseries.bonus_points is null then 0 else teamseries.bonus_points end`
                .mapWith(Number)
                .as('total_points'),
            totalGoalsScored: sql`0`.mapWith(Number).as('total_goals_scored'),
            totalGoalsConceded: sql`0`
              .mapWith(Number)
              .as('total_goals_conceded'),
            totalGoalDifference: sql`0`
              .mapWith(Number)
              .as('total_goal_difference'),
            totalWins: sql`0`.mapWith(Number).as('total_wins'),
            totalDraws: sql`0`.mapWith(Number).as('total_draws'),
            totalLost: sql`0`.mapWith(Number).as('total_lost'),
          })
          .from(teamgames)
          .leftJoin(
            teamseries,
            and(
              eq(teamgames.teamId, teamseries.teamId),
              eq(teamgames.serieId, teamseries.serieId),
            ),
          )
          .where(
            and(
              inArray(teamgames.teamId, teamArray),
              eq(teamgames.serieId, serie.serieId),
            ),
          ),
      )

  const seriesGames = db.$with('series_games').as(
    db
      .select({ ...getTableColumns(teamgames) })
      .from(teamgames)
      .leftJoin(series, eq(series.serieId, teamgames.serieId))
      .where(
        and(
          eq(teamgames.played, true),
          serie.hasMix
            ? inArray(teamgames.group, [serie.group, 'mix'])
            : eq(teamgames.group, serie.group),
          eq(teamgames.seasonId, serie.seasonId),
        ),
      )

      .orderBy(asc(teamgames.date)),
  )

  const cte = db.$with('cte').as(
    db
      .with(seriesGames, startTable)
      .select({
        date: seriesGames.date,
        teamId: seriesGames.teamId,
        position: sql`0`.mapWith(Number).as('position'),
        totalGames:
          sql<number>`row_number() over (partition by series_games.team order by series_games."date" asc nulls first) + start_table.total_games`
            .mapWith(Number)
            .as('total_games'),
        totalWins:
          sql<number>`sum(case when series_games.win = true then 1 else 0 end) over (partition by series_games.team order by series_games."date" asc nulls first rows between unbounded preceding and current row) + start_table.total_wins`
            .mapWith(Number)
            .as('total_wins'),
        totalDraws:
          sql<number>`sum(case when series_games.draw = true then 1 else 0 end) over (partition by series_games.team order by series_games."date" asc nulls first rows between unbounded preceding and current row) + start_table.total_draws`
            .mapWith(Number)
            .as('total_draws'),
        totalLost:
          sql<number>`sum(case when series_games.lost = true then 1 else 0 end) over (partition by series_games.team order by series_games."date" asc nulls first rows between unbounded preceding and current row) + start_table.total_lost`
            .mapWith(Number)
            .as('total_lost'),
        totalGoalsScored:
          sql<number>`sum(series_games.goals_scored) over (partition by series_games.team order by series_games."date" asc nulls first rows between unbounded preceding and current row) + start_table.total_goals_scored`
            .mapWith(Number)
            .as('total_goals_scored'),
        totalGoalsConceded:
          sql<number>`sum(series_games.goals_conceded) over (partition by series_games.team order by series_games."date" asc nulls first rows between unbounded preceding and current row) + start_table.total_goals_conceded`
            .mapWith(Number)
            .as('total_goals_conceded'),
        totalGoalDifference:
          sql<number>`sum(series_games.goal_difference) over (partition by series_games.team order by series_games."date" asc nulls first rows between unbounded preceding and current row) + start_table.total_goal_difference`
            .mapWith(Number)
            .as('total_goal_difference'),
        totalPoints:
          sql<number>`sum(series_games.points) over (partition by series_games.team order by series_games."date" asc nulls first rows between unbounded preceding and current row) + start_table.total_points`
            .mapWith(Number)
            .as('total_points'),
      })
      .from(seriesGames)
      .leftJoin(startTable, eq(startTable.teamId, seriesGames.teamId)),
  )

  const tableArray = await db
    .with(cte)
    .select({
      date: cte.date,
      teamId: cte.teamId,
      position: cte.position,
      totalGames: cte.totalGames,
      totalWins: cte.totalWins,
      totalDraws: cte.totalDraws,
      totalLost: cte.totalLost,
      totalGoalsScored: cte.totalGoalsScored,
      totalGoalsConceded: cte.totalGoalsConceded,
      totalGoalDifference: cte.totalGoalDifference,
      totalPoints: cte.totalPoints,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
    })
    .from(cte)
    .leftJoin(teams, eq(teams.teamId, cte.teamId))
    .orderBy(asc(cte.date), asc(cte.teamId))

  const start = await db
    .with(startTable)
    .select({
      date: startTable.date,
      teamId: startTable.teamId,
      position: startTable.position,
      totalGames: startTable.totalGames,
      totalWins: startTable.totalWins,
      totalDraws: startTable.totalDraws,
      totalLost: startTable.totalLost,
      totalGoalsScored: startTable.totalGoalsScored,
      totalGoalsConceded: startTable.totalGoalsConceded,
      totalGoalDifference: startTable.totalGoalDifference,
      totalPoints: startTable.totalPoints,
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
    })
    .from(startTable)
    .leftJoin(teams, eq(teams.teamId, startTable.teamId))
  const gameDates = await db
    .with(seriesGames)
    .selectDistinctOn([seriesGames.date], { date: seriesGames.date })
    .from(seriesGames)
    .then((arr) => arr.map((d) => d.date))

  const home = alias(teams, 'home')
  const away = alias(teams, 'away')

  const gameArray = await db
    .select({
      ...getTableColumns(games),
      home: {
        teamId: home.teamId,
        name: home.name,
        shortName: home.shortName,
        casualName: home.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
      away: {
        teamId: away.teamId,
        name: away.name,
        shortName: away.shortName,
        casualName: away.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
    })
    .from(games)
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .where(
      and(
        serie.hasMix
          ? inArray(games.group, [serie.group, 'mix'])
          : eq(games.group, serie.group),

        eq(games.seasonId, serie.seasonId),
        eq(games.played, true),
        or(
          inArray(games.homeTeamId, teamArray),
          inArray(games.awayTeamId, teamArray),
        ),
      ),
    )
    .orderBy(asc(games.date))

  const sortedGames = sortGames({ gameArray })

  const dates = gameDates.map((d) => {
    const dateArray = d.split('-')
    const date = `${parseInt(dateArray[2])}/${parseInt(dateArray[1])}`
    return date
  })

  const sortedTables = tableSorting({
    startTable: start,
    tableArray,
    dateArray: gameDates,
  })

  return { games: sortedGames, tables: sortedTables, dates }
}

type GameDates = string[]

type TableSortingProps = {
  startTable: DevDataTableItem[]
  tableArray: DevDataTableItem[]
  dateArray: GameDates
}

type IntReturnType = {
  date: string
  table: DevDataTableItem[]
}

type ReturnType = {
  date: string
  table: ReturnDevDataTableItem[]
}

function tableSorting({
  startTable,
  tableArray,
  dateArray,
}: TableSortingProps): ReturnType[] {
  const returnArray: IntReturnType[] = []
  const currTable = new Map<string, DevDataTableItem>()
  startTable.forEach((item) => {
    currTable.set(item.teamId.toString(), item)
  })

  dateArray.forEach((date) => {
    tableArray
      .filter((item) => item.date === date)
      .forEach((tbl) => {
        currTable.set(tbl.teamId.toString(), tbl)
      })

    const newTable = Array.from(currTable.values())
      .sort((teamA, teamB) => {
        if (teamA.totalPoints === teamB.totalPoints) {
          if (teamB.totalGoalDifference === teamA.totalGoalDifference) {
            return teamB.totalGoalsScored - teamA.totalGoalsScored
          }
          return teamB.totalGoalDifference - teamA.totalGoalDifference
        }
        return teamB.totalPoints - teamA.totalPoints
      })
      .map((team, index) => {
        return {
          ...team,
          position: index + 1,
        }
      })

    returnArray.push({ date, table: newTable })
  })

  return returnArray.map((date, index, array) => {
    if (index === 0)
      return {
        date: date.date,
        table: date.table.map((tbl) => ({ ...tbl, arrowDirection: null })),
      }
    return {
      date: date.date,
      table: date.table.map((tbl) => {
        const prevPosObject = array[index - 1].table.find(
          (team) => team.teamId === tbl.teamId,
        )
        const currPosObject = array[index].table.find(
          (team) => team.teamId === tbl.teamId,
        )
        if (!prevPosObject || !currPosObject) {
          throw new Error('Missing position objects')
        }
        const prevPos = prevPosObject.position
        const currPos = currPosObject.position
        if (prevPos === currPos) {
          return { ...tbl, arrowDirection: null }
        } else if (prevPos < currPos) {
          return { ...tbl, arrowDirection: 'down' }
        }
        return { ...tbl, arrowDirection: 'up' }
      }),
    }
  })
}

type SortGamesProps = {
  gameArray: Omit<Game, 'season'>[]
}

type SortedDates = {
  [key: string]: Omit<Game, 'season'>[]
}

function sortGames({ gameArray }: SortGamesProps) {
  const sortDates = gameArray.reduce((dates, game) => {
    if (!dates[game.date]) {
      dates[game.date] = []
    }
    dates[game.date].push(game)
    return dates
  }, {} as SortedDates)

  const sortedGameDates = Object.keys(sortDates).map((date) => {
    return {
      date,
      games: sortDates[date],
    }
  })

  return sortedGameDates
}
