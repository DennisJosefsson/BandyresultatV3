import type {
  TeamPlayoffStreakV2,
  TeamRecord,
  TeamStatCount,
  TeamStreakV2,
} from '@/lib/types/team'
import {
  integer,
  jsonb,
  pgMaterializedView,
} from 'drizzle-orm/pg-core'

export const homeTeamRecordData = pgMaterializedView(
  'home_team_records_data',
  {
    teamId: integer('team').notNull(),
    maxScored: integer('max_scored'),
    maxConceded: integer('max_conceded'),
    maxGoalDifference: integer('max_goal_difference'),
    minGoalDifference: integer('min_goal_difference'),
    maxTotalGoals: integer('max_total_goals'),
    minTotalGoals: integer('min_total_goals'),
  },
).existing()

export const awayTeamRecordData = pgMaterializedView(
  'away_team_records_data',
  {
    teamId: integer('team').notNull(),
    maxScored: integer('max_scored'),
    maxConceded: integer('max_conceded'),
    maxGoalDifference: integer('max_goal_difference'),
    minGoalDifference: integer('min_goal_difference'),
    maxTotalGoals: integer('max_total_goals'),
    minTotalGoals: integer('min_total_goals'),
  },
).existing()

export const mvHomeTeamRecords = pgMaterializedView(
  'mv_home_team_records',
  {
    teamId: integer('team_id').notNull(),
    maxScored: jsonb('max_scored_game_array')
      .array()
      .$type<Array<TeamRecord>>(),
    maxConceded: jsonb('max_conceded_game_array')
      .array()
      .$type<Array<TeamRecord>>(),
    maxGoalDifference: jsonb(
      'max_goal_difference_game_array',
    )
      .array()
      .$type<Array<TeamRecord>>(),
    minGoalDifference: jsonb(
      'min_goal_difference_game_array',
    )
      .array()
      .$type<Array<TeamRecord>>(),
    maxTotalGoals: jsonb('max_total_goals_game_array')
      .array()
      .$type<Array<TeamRecord>>(),
    minTotalGoals: jsonb('min_total_goals_game_array')
      .array()
      .$type<Array<TeamRecord>>(),
  },
).existing()

export const mvAwayTeamRecords = pgMaterializedView(
  'mv_away_team_records',
  {
    teamId: integer('team_id').notNull(),
    maxScored: jsonb('max_scored_game_array')
      .array()
      .$type<Array<TeamRecord>>(),
    maxConceded: jsonb('max_conceded_game_array')
      .array()
      .$type<Array<TeamRecord>>(),
    maxGoalDifference: jsonb(
      'max_goal_difference_game_array',
    )
      .array()
      .$type<Array<TeamRecord>>(),
    minGoalDifference: jsonb(
      'min_goal_difference_game_array',
    )
      .array()
      .$type<Array<TeamRecord>>(),
    maxTotalGoals: jsonb('max_total_goals_game_array')
      .array()
      .$type<Array<TeamRecord>>(),
    minTotalGoals: jsonb('min_total_goals_game_array')
      .array()
      .$type<Array<TeamRecord>>(),
  },
).existing()

export const mvTeamStreaks = pgMaterializedView(
  'mv_team_streaks',
  {
    teamId: integer('team_id').notNull(),
    losingStreaks: jsonb('losing_streak_array')
      .array()
      .notNull()
      .$type<Array<TeamStreakV2>>(),
    winStreaks: jsonb('winning_streak_array')
      .array()
      .notNull()
      .$type<Array<TeamStreakV2>>(),
    drawStreaks: jsonb('draw_streak_array')
      .array()
      .notNull()
      .$type<Array<TeamStreakV2>>(),
    unbeatenStreaks: jsonb('unbeaten_streak_array')
      .array()
      .notNull()
      .$type<Array<TeamStreakV2>>(),
    noWinStreaks: jsonb('nowin_streak_array')
      .array()
      .notNull()
      .$type<Array<TeamStreakV2>>(),
    playoffStreaks: jsonb('playoff_streak_array')
      .array()
      .notNull()
      .$type<Array<TeamPlayoffStreakV2>>(),
    finalStreaks: jsonb('final_streak_array')
      .array()
      .notNull()
      .$type<Array<TeamPlayoffStreakV2>>(),
    finalWinStreaks: jsonb('final_win_streak_array')
      .array()
      .notNull()
      .$type<Array<TeamPlayoffStreakV2>>(),
  },
).existing()

export const mvTeamStats = pgMaterializedView(
  'mv_team_stats',
  {
    teamId: integer('team_id').notNull(),
    firstDivisionSeasons: integer('first_division_seasons'),
    qualificationSeasons: integer('qualification_seasons'),
    firstAndLatestSeason: jsonb('first_and_latest_seasons')
      .notNull()
      .$type<Omit<TeamStatCount, 'count'>>(),
    finalCount: jsonb('final_count')
      .notNull()
      .$type<Omit<TeamStatCount, 'first'>>(),
    finalWinCount: jsonb('final_win_count')
      .notNull()
      .$type<Omit<TeamStatCount, 'first'>>(),
    playoffCount: jsonb('playoff_count')
      .notNull()
      .$type<Omit<TeamStatCount, 'first'>>(),
    swedishCupWinCount: jsonb('swedish_cup_win_count')
      .notNull()
      .$type<Omit<TeamStatCount, 'first'>>(),
  },
).existing()
