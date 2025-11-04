import { boolean, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  userId: serial('user_id').primaryKey().notNull(),
  userName: text('user_name').notNull(),
  email: text().notNull(),
  admin: boolean().notNull(),
  password: varchar().notNull(),
})
