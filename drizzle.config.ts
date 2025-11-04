//import { env } from '@/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://devdatabase:devdatabase@localhost:55555/devdatabase',
  },
})
