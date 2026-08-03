import { createEnv } from '@t3-oss/env-core'
import { zd } from '../utils/zod'

export const sharedEnv = createEnv({
  clientPrefix: 'VITE_',
  client: {},
  shared: {
    NODE_ENV: zd.enum(['production', 'development']).default('development'),
    CLERK_SECRET_KEY: zd.string().min(1),
  },
  runtimeEnv: process.env,
})
