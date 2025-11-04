import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  real,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

import { municipality } from './municipality.schema'
import { county } from './county.schema'

export const teams = pgTable(
  'teams',
  {
    teamId: serial('team_id').primaryKey().notNull(),
    name: varchar(),
    city: varchar({ length: 255 }),
    women: boolean().default(false),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
    casualName: varchar('casual_name', { length: 255 }),
    shortName: varchar('short_name', { length: 255 }),
    lat: real(),
    long: real(),
    countyId: integer('county_id'),
    municipalityId: integer('municipality_id'),
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
