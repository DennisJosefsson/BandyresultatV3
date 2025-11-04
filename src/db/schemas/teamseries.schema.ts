import { foreignKey, integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { series } from './series.schema'

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
