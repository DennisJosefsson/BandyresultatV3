import { relations } from 'drizzle-orm'
import { county } from './county.schema'
import { games } from './games.schema'
import { metadata } from './metadata.schema'
import { municipality } from './municipality.schema'
import { seasons } from './seasons.schema'
import { series } from './series.schema'
import { tables } from './tables.schema'
import { tableseasons } from './tableseasons.schema'
import { teamgames } from './teamgames.schema'
import { teams } from './teams.schema'
import { teamseasons } from './teamseasons.schema'
import { teamseries } from './teamseries.schema'

export const tablesRelations = relations(tables, ({ one, many }) => ({
  season: one(seasons, {
    fields: [tables.seasonId],
    references: [seasons.seasonId],
  }),
  series: one(series, {
    fields: [tables.serieId],
    references: [series.serieId],
  }),
  team: one(teams, {
    fields: [tables.teamId],
    references: [teams.teamId],
  }),
  tableseasons: many(tableseasons),
  teamseasons: many(teamseasons),
}))

export const seasonsRelations = relations(seasons, ({ many }) => ({
  tables: many(tables),
  metadata: many(metadata),
  series: many(series),
  tableseasons: many(tableseasons),
  teamseasons: many(teamseasons),
  games: many(games),
  teamgames: many(teamgames),
}))

export const seriesRelations = relations(series, ({ one, many }) => ({
  tables: many(tables),
  season: one(seasons, {
    fields: [series.seasonId],
    references: [seasons.seasonId],
  }),
  teamseries: many(teamseries),
  games: many(games),
  teamgames: many(teamgames),
}))

export const teamsRelations = relations(teams, ({ one, many }) => ({
  tables: many(tables),
  metadata: many(metadata),
  teamseasons: many(teamseasons),
  games_awayTeamId: many(games, {
    relationName: 'games_awayTeamId_teams_teamId',
  }),
  games_homeTeamId: many(games, {
    relationName: 'games_homeTeamId_teams_teamId',
  }),
  teamgames_opponent: many(teamgames, {
    relationName: 'teamgames_opponent_teams_teamId',
  }),
  teamgames_team: many(teamgames, {
    relationName: 'teamgames_team_teams_teamId',
  }),
  county: one(county, {
    fields: [teams.countyId],
    references: [county.countyId],
  }),
  municipality: one(municipality, {
    fields: [teams.municipalityId],
    references: [municipality.municipalityId],
  }),
}))

export const metadataRelations = relations(metadata, ({ one }) => ({
  season: one(seasons, {
    fields: [metadata.seasonId],
    references: [seasons.seasonId],
  }),
  team: one(teams, {
    fields: [metadata.winnerId],
    references: [teams.teamId],
  }),
}))

export const municipalityRelations = relations(
  municipality,
  ({ one, many }) => ({
    county: one(county, {
      fields: [municipality.countyId],
      references: [county.countyId],
    }),
    teams: many(teams),
  }),
)

export const countyRelations = relations(county, ({ many }) => ({
  municipalities: many(municipality),
  teams: many(teams),
}))

export const tableseasonsRelations = relations(tableseasons, ({ one }) => ({
  season: one(seasons, {
    fields: [tableseasons.seasonId],
    references: [seasons.seasonId],
  }),
  table: one(tables, {
    fields: [tableseasons.tableId],
    references: [tables.tableId],
  }),
}))

export const teamseasonsRelations = relations(teamseasons, ({ one }) => ({
  season: one(seasons, {
    fields: [teamseasons.seasonId],
    references: [seasons.seasonId],
  }),
  table: one(tables, {
    fields: [teamseasons.tableId],
    references: [tables.tableId],
  }),
  team: one(teams, {
    fields: [teamseasons.teamId],
    references: [teams.teamId],
  }),
}))

export const teamseriesRelations = relations(teamseries, ({ one }) => ({
  series: one(series, {
    fields: [teamseries.serieId],
    references: [series.serieId],
  }),
}))

export const gamesRelations = relations(games, ({ one, many }) => ({
  series: one(series, {
    fields: [games.serieId],
    references: [series.serieId],
  }),
  team_awayTeamId: one(teams, {
    fields: [games.awayTeamId],
    references: [teams.teamId],
    relationName: 'games_awayTeamId_teams_teamId',
  }),
  team_homeTeamId: one(teams, {
    fields: [games.homeTeamId],
    references: [teams.teamId],
    relationName: 'games_homeTeamId_teams_teamId',
  }),
  season: one(seasons, {
    fields: [games.seasonId],
    references: [seasons.seasonId],
  }),
  teamgames: many(teamgames),
}))

export const teamgamesRelations = relations(teamgames, ({ one }) => ({
  series: one(series, {
    fields: [teamgames.serieId],
    references: [series.serieId],
  }),
  game: one(games, {
    fields: [teamgames.gameId],
    references: [games.gameId],
  }),
  team_opponent: one(teams, {
    fields: [teamgames.opponent],
    references: [teams.teamId],
    relationName: 'teamgames_opponent_teams_teamId',
  }),
  season: one(seasons, {
    fields: [teamgames.seasonId],
    references: [seasons.seasonId],
  }),
  team_team: one(teams, {
    fields: [teamgames.team],
    references: [teams.teamId],
    relationName: 'teamgames_team_teams_teamId',
  }),
}))
