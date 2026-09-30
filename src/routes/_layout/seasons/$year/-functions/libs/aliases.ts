import {
  teamlogos,
  teamnames,
  teams,
  teamseasons,
  teamseries,
} from '@/db/schema'
import { alias } from 'drizzle-orm/pg-core'

export const home = alias(teams, 'home')
export const away = alias(teams, 'away')
export const homeTeamSeason = alias(
  teamseasons,
  'home_teamseason',
)
export const awayTeamSeason = alias(
  teamseasons,
  'away_teamseason',
)
export const homeTeamName = alias(
  teamnames,
  'home_teamname',
)
export const awayTeamName = alias(
  teamnames,
  'away_teamname',
)
export const homeTeamSeasonName = alias(
  teamnames,
  'home_teamseasonname',
)
export const awayTeamSeasonName = alias(
  teamnames,
  'away_teamseasonname',
)
export const homeLogo = alias(teamlogos, 'home_logo')
export const awayLogo = alias(teamlogos, 'away_logo')
export const homeTeamSeasonLogo = alias(
  teamlogos,
  'home_teamseasonlogo',
)
export const awayTeamSeasonLogo = alias(
  teamlogos,
  'away_teamseasonlogo',
)

export const teamseasonName = alias(
  teamnames,
  'teamseason_name',
)
export const teamseasonLogo = alias(
  teamlogos,
  'teamseason_logo',
)

export const teamTeamseries = alias(
  teamseries,
  'team_teamseries',
)
export const opponentTeamseries = alias(
  teamseries,
  'opponent_teamseries',
)
