import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const seasons = pgTable('seasons', {
  seasonId: serial('season_id').primaryKey().notNull(),
  year: varchar({ length: 255 }).notNull(),
  women: boolean().default(false),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
  seasonStructure: varchar('season_structure'),
})
