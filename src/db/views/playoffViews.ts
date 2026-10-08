import type {
  FinalAndBronze,
  PlayoffSeries,
  PlayoffTree,
} from '@/lib/types/table'
import {
  integer,
  jsonb,
  pgMaterializedView,
  varchar,
} from 'drizzle-orm/pg-core'

export const mvPlayoff = pgMaterializedView('mv_playoff', {
  seasonId: integer('season_id').notNull(),
  competitionId: integer('competition_id').notNull(),
  competitionName: varchar('competition_name').notNull(),
  division: integer('division').notNull(),
  year: varchar('year').notNull(),
  finalGames: jsonb('final_games').$type<FinalAndBronze>(),
  bronzeGames:
    jsonb('bronze_games').$type<FinalAndBronze>(),
  playoffTree: jsonb('playoff_tree')
    .array()
    .$type<Array<PlayoffTree>>(),
  playoffSeries: jsonb('playoff_series')
    .array()
    .$type<Array<PlayoffSeries>>(),
}).existing()
