import { db } from '@/db'
import type { playoffseason } from '@/db/schema'
import { games, series } from '@/db/schema'
import { coalesce } from '@/lib/drizzleHelpers/coalesce'
import type { Game } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import { sortOrder } from '@/lib/utils/constants'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  eq,
  getTableColumns,
  inArray,
} from 'drizzle-orm'
import {
  away,
  awayLogo,
  awayTeamName,
  awayTeamSeason,
  awayTeamSeasonLogo,
  awayTeamSeasonName,
  home,
  homeLogo,
  homeTeamName,
  homeTeamSeason,
  homeTeamSeasonLogo,
  homeTeamSeasonName,
} from '../libs/aliases'

type FunctionProps = {
  playoffSeason: typeof playoffseason.$inferSelect
}

export async function getPlayoffGamesData({
  playoffSeason,
}: FunctionProps) {
  const gamesArray = await db
    .select({
      ...getTableColumns(games),
      group: series.group as unknown as SQL<string>,
      category: series.category as unknown as SQL<string>,
      home: {
        teamId: home.teamId,
        name: coalesce(
          homeTeamSeasonName.name,
          homeTeamName.name,
        ),
        casualName: coalesce(
          homeTeamSeasonName.casualName,
          homeTeamName.casualName,
        ),
        shortName: coalesce(
          homeTeamSeasonName.shortName,
          homeTeamName.shortName,
        ),
        logo: {
          logoId: coalesce(
            homeTeamSeasonLogo.logoId,
            homeLogo.logoId,
          ),
          hasDark: coalesce(
            homeTeamSeasonLogo.hasDark,
            homeLogo.hasDark,
          ),
        },
      } as unknown as SQL<TeamBaseWithLogo>,
      away: {
        teamId: away.teamId,
        name: coalesce(
          awayTeamSeasonName.name,
          awayTeamName.name,
        ),
        casualName: coalesce(
          awayTeamSeasonName.casualName,
          awayTeamName.casualName,
        ),
        shortName: coalesce(
          awayTeamSeasonName.shortName,
          awayTeamName.shortName,
        ),
        logo: {
          logoId: coalesce(
            awayTeamSeasonLogo.logoId,
            awayLogo.logoId,
          ),
          hasDark: coalesce(
            awayTeamSeasonLogo.hasDark,
            awayLogo.hasDark,
          ),
        },
      } as unknown as SQL<TeamBaseWithLogo>,
    })
    .from(games)
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .leftJoin(
      homeTeamSeason,
      and(
        eq(homeTeamSeason.seasonId, games.seasonId),
        eq(homeTeamSeason.teamId, games.homeTeamId),
      ),
    )
    .leftJoin(
      awayTeamSeason,
      and(
        eq(awayTeamSeason.seasonId, games.seasonId),
        eq(awayTeamSeason.teamId, games.awayTeamId),
      ),
    )
    .leftJoin(
      homeTeamName,
      eq(home.teamnameId, homeTeamName.teamnameId),
    )
    .leftJoin(
      awayTeamName,
      eq(away.teamnameId, awayTeamName.teamnameId),
    )
    .leftJoin(
      homeTeamSeasonName,
      eq(
        homeTeamSeason.teamnameId,
        homeTeamSeasonName.teamnameId,
      ),
    )
    .leftJoin(
      awayTeamSeasonName,
      eq(
        awayTeamSeason.teamnameId,
        awayTeamSeasonName.teamnameId,
      ),
    )
    .leftJoin(
      homeLogo,
      eq(homeTeamName.logoId, homeLogo.logoId),
    )
    .leftJoin(
      awayLogo,
      eq(awayTeamName.logoId, awayLogo.logoId),
    )
    .leftJoin(
      homeTeamSeasonLogo,
      eq(
        homeTeamSeasonName.logoId,
        homeTeamSeasonLogo.logoId,
      ),
    )
    .leftJoin(
      awayTeamSeasonLogo,
      eq(
        awayTeamSeasonName.logoId,
        awayTeamSeasonLogo.logoId,
      ),
    )
    .leftJoin(series, eq(series.serieId, games.serieId))
    .where(
      and(
        eq(games.seasonId, playoffSeason.seasonId),
        inArray(series.category, [
          'playoffseries',
          'eight',
          'quarter',
          'semi',
          'bronze',
          'final',
        ]),
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
          'bronze',
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
    if (!game.group) {
      throw new Error('Grupp ska finnas här')
    }
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
