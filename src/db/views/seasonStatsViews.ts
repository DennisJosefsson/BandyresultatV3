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

export const mvSeriesStats = pgMaterializedView(
  'mv_series_stats',
  {
    serieId: integer('serie_id').notNull(),
    allStats: jsonb('all_stats')
      .$type<ScoreStats>()
      .notNull(),
    maxMinGames: jsonb('max_min_games')
      .$type<MaxMinGames>()
      .notNull(),
  },
).existing()

export const mvPlayoffStats = pgMaterializedView(
  'mv_playoff_stats',
  {
    intYear: integer('int_year').notNull(),
    women: boolean('women').notNull(),
    allStats: jsonb('all_stats')
      .$type<ScoreStats>()
      .notNull(),
    maxMinGames: jsonb('max_min_games')
      .$type<MaxMinGames>()
      .notNull(),
  },
).existing()
