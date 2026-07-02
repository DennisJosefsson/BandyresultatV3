import { createEnv } from '@t3-oss/env-core'
import { zd } from '../utils/zod'
export const clientEnv = createEnv({
  runtimeEnv: import.meta.env,
  clientPrefix: 'VITE_',
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: zd.string().min(1),
  },
})
