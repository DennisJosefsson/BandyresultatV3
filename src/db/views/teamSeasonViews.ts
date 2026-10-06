import type { SeriesGamesV2 } from '@/lib/types/game'
import type { TeamSeasonTableV2 } from '@/lib/types/table'
import {
  integer,
  jsonb,
  pgMaterializedView,
} from 'drizzle-orm/pg-core'

export const mvTeamSeasonTables = pgMaterializedView(
  'mv_team_season_serie_tables',
  {
    teamId: integer('team_id').notNull(),
    seasonId: integer('season_id').notNull(),
    serieId: integer('serie_id').notNull(),
    tables: jsonb('table_array')
      .array()
      .$type<Array<TeamSeasonTableV2>>(),
  },
).existing()

export const mvTeamSeasonGames = pgMaterializedView(
  'mv_team_season_serie_game_arrays',
  {
    teamId: integer('team_id').notNull(),
    seasonId: integer('season_id').notNull(),
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
