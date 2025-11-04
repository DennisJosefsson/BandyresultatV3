import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const county = pgTable('county', {
  countyId: integer('county_id').primaryKey().notNull(),
  name: varchar().notNull(),
})
