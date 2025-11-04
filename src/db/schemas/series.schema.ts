import {
  foreignKey,
  integer,
  pgTable,
  serial,
  smallint,
  text,
  varchar,
} from 'drizzle-orm/pg-core'
import { seasons } from './seasons.schema'

export const series = pgTable(
  'series',
  {
    serieId: serial('serie_id').primaryKey().notNull(),
    serieGroupCode: varchar('serie_group_code').notNull(),
    serieCategory: varchar('serie_category').notNull(),
    serieName: varchar('serie_name'),
    serieStructure: integer('serie_structure').array(),
    seasonId: integer('season_id'),
    bonusPoints: varchar('bonus_points'),
    comment: text(),
    level: smallint(),
  },
  (table) => [
    foreignKey({
      columns: [table.seasonId],
      foreignColumns: [seasons.seasonId],
      name: 'series_season_id_fkey',
    }),
  ],
)
