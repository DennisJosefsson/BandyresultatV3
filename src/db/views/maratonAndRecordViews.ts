import type {
  CurrInoffChampObject,
  GameRecordStreakV2,
  GeneralStatItemV2,
  GoalRecordGames,
  RecordDataV2,
  SeasonRecordStreakV2,
} from '@/lib/types/records'
import type { MaratonTableV2 } from '@/lib/types/table'
import {
  boolean,
  jsonb,
  pgMaterializedView,
} from 'drizzle-orm/pg-core'

export const mvMaratonTable = pgMaterializedView(
  'mv_maraton_tables',
  {
    women: boolean().notNull(),
    allTables: jsonb('all_tables')
      .array()
      .$type<Array<MaratonTableV2>>()
      .notNull(),
    homeTables: jsonb('home_tables')
      .array()
      .$type<Array<MaratonTableV2>>()
      .notNull(),
    awayTables: jsonb('away_tables')
      .array()
      .$type<Array<MaratonTableV2>>()
      .notNull(),
  },
).existing()

export const mvGeneralStats = pgMaterializedView(
  'mv_generalstats_records',
  {
    women: boolean().notNull(),
    golds: jsonb('golds')
      .array()
      .$type<Array<GeneralStatItemV2>>()
      .notNull(),
    finals: jsonb('finals')
      .array()
      .$type<Array<GeneralStatItemV2>>()
      .notNull(),
    allPlayoffs: jsonb('all_playoffs')
      .array()
      .$type<Array<GeneralStatItemV2>>()
      .notNull(),
    firstDivPlayoffs: jsonb('first_div_playoffs')
      .array()
      .$type<Array<GeneralStatItemV2>>()
      .notNull(),
    allSeasons: jsonb('all_seasons')
      .array()
      .$type<Array<GeneralStatItemV2>>()
      .notNull(),
    firstDivSeasons: jsonb('first_div_seasons')
      .array()
      .$type<Array<GeneralStatItemV2>>()
      .notNull(),
  },
).existing()

export const mvTeamStreakRecords = pgMaterializedView(
  'mv_team_streaks_records',
  {
    women: boolean().notNull(),
    finalStreak: jsonb('final_streak_array')
      .array()
      .$type<Array<SeasonRecordStreakV2>>()
      .notNull(),
    finalWinStreak: jsonb('final_win_streak_array')
      .array()
      .$type<Array<SeasonRecordStreakV2>>()
      .notNull(),
    playoffStreak: jsonb('playoff_streak_array')
      .array()
      .$type<Array<SeasonRecordStreakV2>>()
      .notNull(),
    unbeatenStreak: jsonb('unbeaten_streak_array')
      .array()
      .$type<Array<GameRecordStreakV2>>()
      .notNull(),
    noWinStreak: jsonb('nowin_streak_array')
      .array()
      .$type<Array<GameRecordStreakV2>>()
      .notNull(),
    winStreak: jsonb('win_streak_array')
      .array()
      .$type<Array<GameRecordStreakV2>>()
      .notNull(),
    drawStreak: jsonb('draw_streak_array')
      .array()
      .$type<Array<GameRecordStreakV2>>()
      .notNull(),
    losingStreak: jsonb('losing_streak_array')
      .array()
      .$type<Array<GameRecordStreakV2>>()
      .notNull(),
    currInoffChamp: jsonb('curr_champ_array')
      .$type<CurrInoffChampObject>()
      .notNull(),
  },
).existing()

export const mvConcededRecords = pgMaterializedView(
  'mv_conceded_records',
  {
    women: boolean().notNull(),
    averageMax: jsonb('average_max')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMin: jsonb('average_min')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMaxHome: jsonb('average_max_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMinHome: jsonb('average_min_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMaxAway: jsonb('average_max_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMinAway: jsonb('average_min_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMax: jsonb('sum_max')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMin: jsonb('sum_min')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMaxHome: jsonb('sum_max_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMinHome: jsonb('sum_min_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMaxAway: jsonb('sum_max_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMinAway: jsonb('sum_min_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
  },
).existing()

export const mvScoredRecords = pgMaterializedView(
  'mv_scored_records',
  {
    women: boolean().notNull(),
    averageMax: jsonb('average_max')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMin: jsonb('average_min')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMaxHome: jsonb('average_max_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMinHome: jsonb('average_min_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMaxAway: jsonb('average_max_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMinAway: jsonb('average_min_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMax: jsonb('sum_max')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMin: jsonb('sum_min')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMaxHome: jsonb('sum_max_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMinHome: jsonb('sum_min_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMaxAway: jsonb('sum_max_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMinAway: jsonb('sum_min_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    maxGoalGames: jsonb('max_goal_games')
      .$type<GoalRecordGames>()
      .notNull(),
    minGoalGames: jsonb('min_goal_games')
      .$type<GoalRecordGames>()
      .notNull(),
  },
).existing()

export const mvPointsRecords = pgMaterializedView(
  'mv_points_records',
  {
    women: boolean().notNull(),
    averageMax: jsonb('average_max')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMin: jsonb('average_min')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMaxHome: jsonb('average_max_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMinHome: jsonb('average_min_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMaxAway: jsonb('average_max_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    averageMinAway: jsonb('average_min_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMax: jsonb('sum_max')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMin: jsonb('sum_min')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMaxHome: jsonb('sum_max_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMinHome: jsonb('sum_min_home')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMaxAway: jsonb('sum_max_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
    sumMinAway: jsonb('sum_min_away')
      .array()
      .$type<Array<RecordDataV2>>()
      .notNull(),
  },
).existing()
