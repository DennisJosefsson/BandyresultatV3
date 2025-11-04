import { foreignKey, integer, pgTable, serial } from 'drizzle-orm/pg-core'

import { seasons } from './seasons.schema'
import { tables } from './tables.schema'

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
