import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  date,
  foreignKey,
  integer,
  pgTable,
  real,
  serial,
  smallint,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core'

export const county = pgTable('county', {
  countyId: integer('county_id').primaryKey().notNull(),
  name: varchar().notNull(),
})

export const teams = pgTable(
  'teams',
  {
    teamId: serial('team_id').primaryKey().notNull(),
    name: varchar().notNull(),
    city: varchar({ length: 255 }).notNull(),
    women: boolean().default(false).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
    casualName: varchar('casual_name', { length: 255 }).notNull(),
    shortName: varchar('short_name', { length: 255 }).notNull(),
    lat: real(),
    long: real(),
    countyId: integer('county_id').notNull(),
    municipalityId: integer('municipality_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.countyId],
      foreignColumns: [county.countyId],
      name: 'teams_county_fk',
    }),
    foreignKey({
      columns: [table.municipalityId],
      foreignColumns: [municipality.municipalityId],
      name: 'teams_municipality_fk',
    }),
  ],
)

export const errors = pgTable('errors', {
  errorId: serial('error_id').primaryKey().notNull(),
  name: varchar(),
  message: varchar(),
  origin: varchar(),
  body: varchar(),
  production: boolean(),
  backend: boolean(),
  date: varchar(),
})

export const games = pgTable(
  'games',
  {
    gameId: serial('game_id').primaryKey().notNull(),
    date: date().notNull(),
    seasonId: integer('season_id').notNull(),
    homeTeamId: integer('home_team_id').notNull(),
    awayTeamId: integer('away_team_id').notNull(),
    women: boolean().default(false).notNull(),
    result: varchar({ length: 255 }),
    homeGoal: integer('home_goal'),
    awayGoal: integer('away_goal'),
    round: integer(),
    category: varchar().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
    halftimeResult: varchar('halftime_result', { length: 255 }),
    halftimeHomeGoal: integer('halftime_home_goal'),
    halftimeAwayGoal: integer('halftime_away_goal'),
    playoff: boolean().default(false),
    extraTime: boolean('extra_time').default(false),
    penalties: boolean().default(false),
    group: varchar().default('elitserien').notNull(),
    mix: boolean().default(false),
    serieId: integer('serie_id'),
    played: boolean(),
  },
  (table) => [
    foreignKey({
      columns: [table.serieId],
      foreignColumns: [series.serieId],
      name: 'fk_serie_id',
    }),
    foreignKey({
      columns: [table.awayTeamId],
      foreignColumns: [teams.teamId],
      name: 'games_away_team_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.homeTeamId],
      foreignColumns: [teams.teamId],
      name: 'games_home_team_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.seasonId],
      foreignColumns: [seasons.seasonId],
      name: 'games_season_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
)

export const metadata = pgTable(
  'metadata',
  {
    metadataId: serial('metadata_id').primaryKey().notNull(),
    seasonId: integer('season_id').notNull(),
    name: varchar({ length: 255 }).notNull(),
    year: varchar({ length: 255 }).notNull(),
    winnerId: integer('winner_id'),
    winnerName: varchar('winner_name', { length: 255 }),
    hostCity: varchar('host_city', { length: 255 }),
    finalDate: varchar('final_date', { length: 255 }),
    northSouth: boolean('north_south').notNull(),
    multipleGroupStages: boolean('multiple_group_stages').notNull(),
    eight: boolean().notNull(),
    quarter: boolean().notNull(),
    semi: boolean().notNull(),
    final: boolean().notNull(),
    comment: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.seasonId],
      foreignColumns: [seasons.seasonId],
      name: 'metadata_season_id_fkey',
    }),
    foreignKey({
      columns: [table.winnerId],
      foreignColumns: [teams.teamId],
      name: 'metadata_winner_id_fkey',
    }),
    unique('metadata_unique_season_id').on(table.seasonId),
  ],
)

export const municipality = pgTable(
  'municipality',
  {
    municipalityId: integer('municipality_id').primaryKey().notNull(),
    name: varchar().notNull(),
    countyId: integer('county_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.countyId],
      foreignColumns: [county.countyId],
      name: 'municipality_county_fk',
    }),
  ],
)

export const seasons = pgTable('seasons', {
  seasonId: serial('season_id').primaryKey().notNull(),
  year: varchar({ length: 255 }).notNull(),
  women: boolean().default(false),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
  seasonStructure: varchar('season_structure'),
})

export const series = pgTable(
  'series',
  {
    serieId: serial('serie_id').primaryKey().notNull(),
    serieGroupCode: varchar('serie_group_code').notNull(),
    serieCategory: varchar('serie_category').notNull(),
    serieName: varchar('serie_name').notNull(),
    serieStructure: integer('serie_structure').array(),
    seasonId: integer('season_id').notNull(),
    bonusPoints: varchar('bonus_points'),
    comment: text(),
    level: smallint().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.seasonId],
      foreignColumns: [seasons.seasonId],
      name: 'series_season_id_fkey',
    }),
  ],
)

export const tables = pgTable(
  'tables',
  {
    tableId: serial('table_id').primaryKey().notNull(),
    teamId: integer('team_id').notNull(),
    seasonId: integer('season_id').notNull(),
    games: integer().notNull(),
    position: integer().notNull(),
    won: integer().notNull(),
    draw: integer().notNull(),
    lost: integer().notNull(),
    scoredGoals: integer('scored_goals').notNull(),
    concededGoals: integer('conceded_goals').notNull(),
    goalDifference: integer('goal_difference').notNull(),
    points: integer().notNull(),
    qualification: boolean().default(false),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
    women: boolean().default(false).notNull(),
    group: varchar().default('elitserien').notNull(),
    category: varchar().notNull(),
    serieId: integer('serie_id'),
  },
  (table) => [
    foreignKey({
      columns: [table.seasonId],
      foreignColumns: [seasons.seasonId],
      name: 'tables_season_id_fkey',
    }),
    foreignKey({
      columns: [table.serieId],
      foreignColumns: [series.serieId],
      name: 'tables_series_fk',
    }),
    foreignKey({
      columns: [table.teamId],
      foreignColumns: [teams.teamId],
      name: 'tables_team_id_fkey',
    }),
  ],
)

export const tableseasons = pgTable(
  'tableseasons',
  {
    tableseasonId: serial('tableseason_id').primaryKey().notNull(),
    seasonId: integer('season_id').notNull(),
    tableId: integer('table_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.seasonId],
      foreignColumns: [seasons.seasonId],
      name: 'tableseasons_season_id_fkey',
    }),
    foreignKey({
      columns: [table.tableId],
      foreignColumns: [tables.tableId],
      name: 'tableseasons_table_id_fkey',
    }),
  ],
)

export const teamgames = pgTable(
  'teamgames',
  {
    teamGameId: serial('team_game_id').primaryKey().notNull(),
    gameId: integer('game_id').notNull(),
    teamId: integer('team').notNull(),
    opponentId: integer('opponent').notNull(),
    goalsScored: integer('goals_scored'),
    goalsConceded: integer('goals_conceded'),
    goalDifference: integer('goal_difference'),
    points: integer(),
    win: boolean(),
    lost: boolean(),
    draw: boolean(),
    qualificationGame: boolean('qualification_game'),
    women: boolean().notNull(),
    category: varchar({ length: 30 }).notNull(),
    group: varchar({ length: 30 }).notNull(),
    date: date().notNull(),
    playoff: boolean(),
    mix: boolean().default(false),
    seasonId: integer('season_id').notNull(),
    homeGame: boolean('home_game').default(false),
    serieId: integer('serie_id').notNull(),
    totalGoals: integer('total_goals').generatedAlwaysAs(
      sql`(goals_scored + goals_conceded)`,
    ),
    played: boolean(),
    currInoffChamp: boolean('curr_inoff_champ'),
  },
  (table) => [
    foreignKey({
      columns: [table.serieId],
      foreignColumns: [series.serieId],
      name: 'fk_serie_id',
    }),
    foreignKey({
      columns: [table.gameId],
      foreignColumns: [games.gameId],
      name: 'teamgames_game_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.opponentId],
      foreignColumns: [teams.teamId],
      name: 'teamgames_opponent_fkey',
    }),
    foreignKey({
      columns: [table.seasonId],
      foreignColumns: [seasons.seasonId],
      name: 'teamgames_season_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.teamId],
      foreignColumns: [teams.teamId],
      name: 'teamgames_team_fkey',
    }),
  ],
)

export const teamseasons = pgTable(
  'teamseasons',
  {
    teamseasonId: serial('teamseason_id').primaryKey().notNull(),
    seasonId: integer('season_id').notNull(),
    teamId: integer('team_id').notNull(),
    tableId: integer('table_id'),
    qualification: boolean(),
    women: boolean().default(false),
    promoted: boolean().default(false),
    relegated: boolean().default(false),
    position: smallint(),
    points: smallint(),
    playoff: boolean().default(false),
    eight: boolean().default(false),
    quarter: boolean().default(false),
    semi: boolean().default(false),
    final: boolean().default(false),
    gold: boolean().default(false),
    negQualification: boolean('neg_qualification').default(false),
  },
  (table) => [
    foreignKey({
      columns: [table.seasonId],
      foreignColumns: [seasons.seasonId],
      name: 'teamseasons_season_id_fkey',
    }),
    foreignKey({
      columns: [table.tableId],
      foreignColumns: [tables.tableId],
      name: 'teamseasons_table_id_fkey',
    }),
    foreignKey({
      columns: [table.teamId],
      foreignColumns: [teams.teamId],
      name: 'teamseasons_team_id_fkey',
    }),
  ],
)

export const teamseries = pgTable(
  'teamseries',
  {
    teamseriesId: serial('teamseries_id').primaryKey().notNull(),
    teamId: integer('team_id').notNull(),
    serieId: integer('serie_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.serieId],
      foreignColumns: [series.serieId],
      name: 'teamseries_series_fk',
    }),
  ],
)

export const users = pgTable('users', {
  userId: serial('user_id').primaryKey().notNull(),
  userName: text('user_name').notNull(),
  email: text().notNull(),
  admin: boolean().notNull(),
  password: varchar().notNull(),
})

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
    fields: [teamgames.opponentId],
    references: [teams.teamId],
    relationName: 'opponent',
  }),
  season: one(seasons, {
    fields: [teamgames.seasonId],
    references: [seasons.seasonId],
  }),
  team_team: one(teams, {
    fields: [teamgames.teamId],
    references: [teams.teamId],
    relationName: 'team',
  }),
}))
