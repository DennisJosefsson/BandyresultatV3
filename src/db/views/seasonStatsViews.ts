import type {
  DivisionScoreStats,
  MaxMinGames,
  ScoreStats,
} from '@/lib/types/stats'
import {
  boolean,
  integer,
  jsonb,
  pgMaterializedView,
} from 'drizzle-orm/pg-core'

export const mvSeasonStats = pgMaterializedView(
  'mv_season_stats',
  {
    intYear: integer('int_year').notNull(),
    women: boolean('women').notNull(),
    allStats: jsonb('all_stats')
      .$type<ScoreStats>()
      .notNull(),
    divisionStats: jsonb('division_stats')
      .array()
      .$type<Array<DivisionScoreStats>>()
      .notNull(),
    maxMinGames: jsonb('max_min_games')
      .$type<MaxMinGames>()
      .notNull(),
  },
).existing()
