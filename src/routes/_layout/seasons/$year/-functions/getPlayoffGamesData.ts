import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  eq,
  getTableColumns,
  inArray,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

import { db } from '@/db'
import type { playoffseason } from '@/db/schema'
import { games, series, teams } from '@/db/schema'
import type { Game } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'
import { sortOrder } from '@/lib/utils/constants'

type FunctionProps = {
  playoffSeason: typeof playoffseason.$inferSelect
}

const home = alias(teams, 'home')
const away = alias(teams, 'away')

export async function getPlayoffGamesData({
  playoffSeason,
}: FunctionProps) {
  const gamesArray = await db
    .select({
      ...getTableColumns(games),
      home: {
        teamId: home.teamId,
        name: home.name,
        casualName: home.casualName,
        shortName: home.shortName,
      } as unknown as SQL<{
        teamId: number
        name: string
        casualName: string
        shortName: string
      }>,
      away: {
        teamId: away.teamId,
        name: away.name,
        casualName: away.casualName,
        shortName: away.shortName,
      } as unknown as SQL<{
        teamId: number
        name: string
        casualName: string
        shortName: string
      }>,
    })
    .from(games)
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .where(
      and(
        eq(games.seasonId, playoffSeason.seasonId),
        eq(games.playoff, true),
      ),
    )
    .orderBy(asc(games.date))

  if (!gamesArray || gamesArray.length === 0) {
    return undefined
  }

  const seriesArray = await db
    .select({ ...getTableColumns(series) })
    .from(series)
    .where(
      and(
        eq(series.seasonId, playoffSeason.seasonId),
        inArray(series.category, [
          'playoffseries',
          'eight',
          'quarter',
          'semi',
          'final',
        ]),
      ),
    )

  const sortedGames = sortGames({ gamesArray, seriesArray })

  return sortedGames
}

type SortedDates = {
  [key: string]: Array<Omit<Game, 'season'>>
}

export const sortGames = ({
  gamesArray,
  seriesArray,
}: {
  gamesArray: Array<Omit<Game, 'season'>>
  seriesArray: Array<Serie>
}) => {
  const playedGames = gamesArray.filter(
    (game) => game.played === true,
  )
  const unplayedGames = gamesArray.filter(
    (game) => !game.played,
  )
  const unplayedGamesLength = unplayedGames.length
  const playedGamesLength = playedGames.length

  return {
    played: gameSortFunction({
      gamesArray: playedGames,
      seriesData: seriesArray,
      played: true,
    }),
    unplayed: gameSortFunction({
      gamesArray: unplayedGames,
      seriesData: seriesArray,
    }),
    unplayedLength: unplayedGamesLength,
    playedLength: playedGamesLength,
  }
}

type SortedGameGroups = {
  [key: string]: Array<Omit<Game, 'season'>>
}

type GameSortFunctionProps = {
  gamesArray: Array<Omit<Game, 'season'>>
  seriesData: Array<Serie>
  played?: boolean
}

function gameSortFunction({
  gamesArray,
  seriesData,
  played = false,
}: GameSortFunctionProps) {
  const sortGroups = gamesArray.reduce((groups, game) => {
    if (!groups[game.group]) {
      groups[game.group] = []
    }
    groups[game.group].push(game)
    return groups
  }, {} as SortedGameGroups)

  const sortedGames = Object.keys(sortGroups).map(
    (group) => {
      const seriesObject = seriesData.find(
        (serie) => serie.group === group,
      )

      return {
        group,
        name: seriesObject?.serieName ?? '',
        comment: seriesObject?.comment ?? '',
        games: sortGroups[group],
        level: seriesObject?.level ?? 1,
      }
    },
  )

  const sortGroupsAndDates = sortedGames.map(
    (groupObject) => {
      const sortDates = groupObject.games.reduce(
        (dates, game) => {
          if (!dates[game.date]) {
            dates[game.date] = []
          }
          dates[game.date].push(game)
          return dates
        },
        {} as SortedDates,
      )

      const sortedGameDates = Object.keys(sortDates).map(
        (date) => {
          return {
            date,
            games: sortDates[date],
          }
        },
      )
      return {
        group: groupObject['group'],
        name: groupObject['name'],
        comment: groupObject['comment'],
        level: groupObject['level'],
        dates: played
          ? sortedGameDates.reverse()
          : sortedGameDates,
      }
    },
  )

  return sortGroupsAndDates.sort((a, b) => {
    if (
      sortOrder.indexOf(a.group) >
      sortOrder.indexOf(b.group)
    ) {
      return 1
    } else if (
      sortOrder.indexOf(a.group) <
      sortOrder.indexOf(b.group)
    ) {
      return -1
    } else {
      return 0
    }
  })
}
