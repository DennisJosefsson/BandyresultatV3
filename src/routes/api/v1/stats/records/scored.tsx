import { db } from '@/db'
import {
  seasons,
  series,
  teamgames,
  teams,
} from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { createFileRoute } from '@tanstack/react-router'
import {
  and,
  count,
  desc,
  eq,
  gt,
  gte,
  lte,
  sql,
} from 'drizzle-orm'

type DataType = {
  rank: number
  team: string
  season: string
  data: number
}

export const Route = createFileRoute(
  '/api/v1/stats/records/scored',
)({
  server: {
    handlers: {
      GET: async () => {
        try {
          const subQuery = db
            .select({
              ranking:
                sql`rank() over (order by round(avg(teamgames.goals_scored),2) desc)`
                  .mapWith(Number)
                  .as('ranking'),
              data: sql`round(avg(teamgames.goals_scored),2)`
                .mapWith(Number)
                .as('data'),
              teamId: teamgames.teamId,
              seasonId: teamgames.seasonId,
            })
            .from(teamgames)
            .leftJoin(
              series,
              eq(series.serieId, teamgames.serieId),
            )
            .where(
              and(
                eq(series.division, 1),
                eq(teamgames.category, 'regular'),
                eq(teamgames.women, false),
                gt(teamgames.seasonId, 101),
                eq(teamgames.played, true),
              ),
            )
            .groupBy(teamgames.teamId, teamgames.seasonId)
            .having(gte(count(teamgames.teamGameId), 10))
            .orderBy(
              desc(
                sql`round(avg(teamgames.goals_scored),2)`
                  .mapWith(Number)
                  .as('data'),
              ),
            )
            .as('sq_avg_scored_goals')

          const avg_scored_goals_array = await db
            .select({
              dataObjects:
                sql<DataType>`json_build_object('rank',${subQuery.ranking},'year',${seasons.year},'team',${teams.name},'data',${subQuery.data})`.as(
                  'data_objects',
                ),
            })
            .from(subQuery)
            .leftJoin(
              seasons,
              eq(seasons.seasonId, subQuery.seasonId),
            )
            .leftJoin(
              teams,
              eq(teams.teamId, subQuery.teamId),
            )
            .where(lte(subQuery.ranking, 10))

          return Response.json(avg_scored_goals_array, {
            status: 200,
          })
        } catch (error) {
          catchError(error)
        }
      },
    },
  },
})
