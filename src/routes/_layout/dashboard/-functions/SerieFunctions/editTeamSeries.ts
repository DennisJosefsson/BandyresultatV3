import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import type { SQL } from 'drizzle-orm'
import { inArray, sql } from 'drizzle-orm'

import { db } from '@/db'
import { teamseries } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { editTeamSeriesArray } from '@/lib/types/serie'

export const editTeamSerie = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .inputValidator(zodValidator(editTeamSeriesArray))
  .handler(async ({ data: { teamserie } }) => {
    try {
      if (teamserie.length === 0) {
        throw new Error('TeamserieArray måste ha data.')
      }

      const sqlChunks: Array<SQL> = []
      const ids: Array<number> = []
      sqlChunks.push(sql`(case`)

      for (const input of teamserie) {
        sqlChunks.push(
          sql`when ${teamseries.teamseriesId} = ${input.teamseriesId} then cast(${input.bonusPoints} as integer)`,
        )
        ids.push(input.teamseriesId)
      }

      sqlChunks.push(sql`end)`)
      const finalSql: SQL = sql.join(
        sqlChunks,
        sql.raw(' '),
      )
      await db
        .update(teamseries)
        .set({ bonusPoints: finalSql })
        .where(inArray(teamseries.teamseriesId, ids))

      return {
        status: 200,
        message: 'TeamSerie uppdaterade.',
      }
    } catch (error) {
      catchError(error)
    }
  })
