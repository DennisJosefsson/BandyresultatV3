import type { PoolConfig } from 'pg'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { config } from 'dotenv'
import { sharedEnv } from '@/lib/env/sharedEnv.ts'
import { serverEnv } from '@/lib/env/serverEnv.ts'
import * as schema from './schema.ts'

config()

const dbConnectionString =
  sharedEnv.NODE_ENV === 'development' ? serverEnv.DB_DEVELOPMENT_URL : undefined

const prodConfig = {
  host: serverEnv.DB_HOST,
  port: serverEnv.DB_PORT,
  user: serverEnv.DB_USERNAME,
  password: serverEnv.DB_PASSWORD,
  database: serverEnv.DB_NAME,
  ssl: { ca: serverEnv.PEM },
} satisfies PoolConfig

const dbConfig =
  sharedEnv.NODE_ENV === 'development'
    ? {
        connectionString: dbConnectionString,
      }
    : prodConfig

const pool = new Pool(dbConfig)
export const db = drizzle(pool, { schema })
