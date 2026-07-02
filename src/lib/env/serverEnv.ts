import { createEnv } from '@t3-oss/env-core'
import { zd } from '../utils/zod'

export const serverEnv = createEnv({
  server: {
    NODE_ENV: zd
      .enum(['production', 'development'])
      .default('development'),
    DB_DEVELOPMENT_URL: zd.string().min(1).optional(),
    DB_HOST: zd.string().min(1),
    DB_PORT: zd.coerce.number().positive().int(),
    DB_USERNAME: zd.string().min(1),
    DB_PASSWORD: zd.string().min(1),
    DB_NAME: zd.string().min(1),
    PEM: zd
      .base64()
      .transform((val) =>
        Buffer.from(val, 'base64').toString('utf-8'),
      ),
  },
  runtimeEnv: process.env,
  isServer: typeof window === 'undefined',
})
