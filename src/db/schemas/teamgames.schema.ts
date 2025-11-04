import { sql } from 'drizzle-orm'

import {
  boolean,
  date,
  foreignKey,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core'

import { games } from './games.schema'
import { series } from './series.schema'
import { teams } from './teams.schema'
import { seasons } from './seasons.schema'

export const teamgames = pgTable(
  'teamgames',
  {
    teamGameId: serial('team_game_id').primaryKey().notNull(),
    gameId: integer('game_id'),
    team: integer(),
    opponent: integer(),
    goalsScored: integer('goals_scored'),
    goalsConceded: integer('goals_conceded'),
    goalDifference: integer('goal_difference'),
    points: integer(),
    win: boolean(),
    lost: boolean(),
    draw: boolean(),
    qualificationGame: boolean('qualification_game'),
    women: boolean(),
    category: varchar({ length: 30 }),
    group: varchar({ length: 30 }),
    date: date(),
    playoff: boolean(),
    mix: boolean().default(false),
    seasonId: integer('season_id'),
    homeGame: boolean('home_game').default(false),
    serieId: integer('serie_id'),
    totalGoals: integer('total_goals').generatedAlwaysAs(
      sql`(goals_scored + goals_conceded)`,
    ),
    played: boolean(),
    currInoffChamp: boolean('curr_inoff_champ'),
  },
  (table) => [
    foreignKey({
      columns: [table.serieId],
      foreignColumns: [series.serieId],
      name: 'fk_serie_id',
    }),
    foreignKey({
      columns: [table.gameId],
      foreignColumns: [games.gameId],
      name: 'teamgames_game_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.opponent],
      foreignColumns: [teams.teamId],
      name: 'teamgames_opponent_fkey',
    }),
    foreignKey({
      columns: [table.seasonId],
      foreignColumns: [seasons.seasonId],
      name: 'teamgames_season_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.team],
      foreignColumns: [teams.teamId],
      name: 'teamgames_team_fkey',
    }),
  ],
)
