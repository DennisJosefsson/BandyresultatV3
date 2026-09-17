import { db } from '@/db'
import { asc, sql } from 'drizzle-orm'

export const preparedTeamsList = db.query.teams
  .findMany({
    with: { teamname: { with: { logo: true } } },
    where: (teams, { eq, ne, and }) =>
      and(
        eq(teams.women, sql.placeholder('women')),
        ne(teams.teamId, 176),
      ),
    orderBy: [asc(sql`casual_name collate "se-SE-x-icu"`)],
  })
  .prepare('teamListQuery')
