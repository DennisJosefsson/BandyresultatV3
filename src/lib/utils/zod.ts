import * as z from 'zod'
import 'zod/compile'
import { sv } from 'zod/locales'

z.config(sv())

export { z as zd }
