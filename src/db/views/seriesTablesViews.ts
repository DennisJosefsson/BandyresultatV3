import type { TeamSeasonTableV2 } from '@/lib/types/table'
import {
  boolean,
  integer,
  jsonb,
  pgMaterializedView,
  pgView,
} from 'drizzle-orm/pg-core'

export const homeAndAwaySeriesTablesMaterializedView =
  pgMaterializedView('mv_series_tables', {
    serieId: integer('serie_id').notNull(),
    teamId: integer('team_id').notNull(),
    homeGame: boolean('home_game'),
    totalGames: integer('total_games'),
    totalWins: integer('total_wins'),
    totalDraws: integer('total_draws'),
    totalLost: integer('total_lost'),
    totalGoalsScored: integer('total_goals_scored'),
    totalGoalsConceded: integer('total_goals_conceded'),
    totalGoalDifference: integer('total_goal_difference'),
    totalPoints: integer('total_points'),
  }).existing()

export const groupedSeriesTablesView = pgView(
  'grouped_mv_series_tables',
  {
    serieId: integer('serie_id').notNull(),
    teamId: integer('team_id').notNull(),
    totalGames: integer('total_games'),
    totalWins: integer('total_wins'),
    totalDraws: integer('total_draws'),
    totalLost: integer('total_lost'),
    totalGoalsScored: integer('total_goals_scored'),
    totalGoalsConceded: integer('total_goals_conceded'),
    totalGoalDifference: integer('total_goal_difference'),
    totalPoints: integer('total_points'),
  },
).existing()

export const mvSeriesTablesV2 = pgMaterializedView(
  'mv_series_tables_v2',
  {
    serieId: integer('serie_id').notNull(),
    allTables: jsonb('all_tables')
      .array()
      .$type<Array<TeamSeasonTableV2>>(),
    homeTables: jsonb('home_tables')
      .array()
      .$type<Array<TeamSeasonTableV2>>(),
    awayTables: jsonb('away_tables')
      .array()
      .$type<Array<TeamSeasonTableV2>>(),
    neutralTables: jsonb('neutral_tables')
      .array()
      .$type<Array<TeamSeasonTableV2>>(),
  },
).existing()
