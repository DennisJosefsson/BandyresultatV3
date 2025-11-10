import { config } from 'dotenv'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { createServerOnlyFn } from '@tanstack/react-start'
import * as schema from './schema.ts'

config()

const dbConnectionString =
  process.env.NODE_ENV === 'development'
    ? process.env.DB_DEVELOPMENT_URL
    : process.env.DB_PRODUCTION_URL

const pool = new Pool({
  connectionString: dbConnectionString,
})
export const db = drizzle(pool, { schema })

export type DB = typeof db

export const dbServerConnection = createServerOnlyFn(() => db)
