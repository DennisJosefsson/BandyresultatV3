import {
  integer,
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
