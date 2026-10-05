import type { SeriesGamesV2 } from '@/lib/types/game'
import {
  integer,
  jsonb,
  pgMaterializedView,
} from 'drizzle-orm/pg-core'

export const mvSeriesGames = pgMaterializedView(
  'mv_series_games',
  {
    serieId: integer('serie_id').notNull(),
    played: jsonb('played')
      .array()
      .notNull()
      .$type<Array<SeriesGamesV2>>(),
    unplayed: jsonb('unplayed')
      .array()
      .notNull()
      .$type<Array<SeriesGamesV2>>(),
  },
).existing()
