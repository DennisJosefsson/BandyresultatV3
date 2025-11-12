import { db } from '@/db'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { asc, sql } from 'drizzle-orm'
import { z } from 'zod'

const women = z.boolean()

export const getTeams = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(women))
  .handler(async ({ data: women }) => {
    const teams = await db.query.teams.findMany({
      columns: { teamId: true, name: true, casualName: true },
      where: (teams, { eq, ne, and }) =>
        and(eq(teams.women, women), ne(teams.teamId, 176)),
      orderBy: [asc(sql`casual_name collate "se-SE-x-icu"`)],
    })

    return teams
  })
