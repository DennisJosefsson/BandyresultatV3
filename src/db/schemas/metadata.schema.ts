import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
  unique,
  varchar,
} from 'drizzle-orm/pg-core'

import { teams } from './teams.schema'
import { seasons } from './seasons.schema'

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
