import { foreignKey, integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { county } from './county.schema'

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
