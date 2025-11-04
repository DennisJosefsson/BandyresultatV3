import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

import { seasons } from './seasons.schema'
import { series } from './series.schema'
import { teams } from './teams.schema'

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
    women: boolean().default(false),
    group: varchar().default('elitserien'),
    category: varchar(),
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
