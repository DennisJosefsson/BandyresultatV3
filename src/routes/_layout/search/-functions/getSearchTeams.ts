import { db } from '@/db'
import { games, seasons, series, teams } from '@/db/schema'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { and, asc, desc, eq, inArray, notInArray, sql } from 'drizzle-orm'

export const getSearchTeams = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .handler(async () => {
    const firstDivTeams = await db
      .select({
        teamId: teams.teamId,
        name: teams.name,
        casualName: teams.casualName,
        women: teams.women,
      })
      .from(teams)
      .where(
        inArray(
          teams.teamId,
          db
            .selectDistinctOn([games.homeTeamId], { teamId: games.homeTeamId })
            .from(games)
            .leftJoin(series, eq(games.serieId, series.serieId))
            .where(
              and(
                eq(series.level, 1.0),
                inArray(
                  games.seasonId,
                  db
                    .select({ seasonId: seasons.seasonId })
                    .from(seasons)
                    .orderBy(desc(seasons.seasonId))
                    .limit(2),
                ),
              ),
            ),
        ),
      )
      .orderBy(asc(sql`casual_name collate "se-SE-x-icu"`))

    const allTeams = await db
      .select({
        teamId: teams.teamId,
        name: teams.name,
        casualName: teams.casualName,
        women: teams.women,
      })
      .from(teams)
      .where(
        notInArray(
          teams.teamId,
          db
            .selectDistinctOn([games.homeTeamId], { teamId: games.homeTeamId })
            .from(games)
            .leftJoin(series, eq(games.serieId, series.serieId))
            .where(
              and(
                eq(series.level, 1.0),
                inArray(
                  games.seasonId,
                  db
                    .select({ seasonId: seasons.seasonId })
                    .from(seasons)
                    .orderBy(desc(seasons.seasonId))
                    .limit(2),
                ),
              ),
            ),
        ),
      )
      .orderBy(asc(sql`casual_name collate "se-SE-x-icu"`))

    const teamArray = [...firstDivTeams, ...allTeams]

    return teamArray
  })
