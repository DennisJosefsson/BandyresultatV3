import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import type { PoolConfig } from 'pg'
import { Pool } from 'pg'

import * as schema from './schema.ts'

config()

const dbConnectionString =
  process.env.NODE_ENV === 'development'
    ? process.env.DB_DEVELOPMENT_URL
    : process.env.DB_PRODUCTION_URL

const prodConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { ca: process.env.PEM },
} satisfies PoolConfig

const dbConfig =
  process.env.NODE_ENV === 'development'
    ? {
        connectionString: dbConnectionString,
      }
    : prodConfig

const pool = new Pool(dbConfig)
export const db = drizzle(pool, { schema })
