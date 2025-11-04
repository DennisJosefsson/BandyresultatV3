import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core'

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
