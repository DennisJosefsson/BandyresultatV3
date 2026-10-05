import type { TeamSeasonTableSerieV2 } from '@/lib/types/table'
import {
  integer,
  jsonb,
  pgMaterializedView,
} from 'drizzle-orm/pg-core'

export const mvSeriesData = pgMaterializedView(
  'mv_series_data',
  {
    serieId: integer('serie_id').notNull(),
    serieObject:
      jsonb('serie_object').$type<TeamSeasonTableSerieV2>(),
  },
).existing()
