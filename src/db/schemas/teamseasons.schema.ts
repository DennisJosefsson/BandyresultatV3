import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  serial,
  smallint,
} from 'drizzle-orm/pg-core'

import { teams } from './teams.schema'
import { seasons } from './seasons.schema'
import { tables } from './tables.schema'

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
