import { db } from '@/db'
import { cronJobRunDetails } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { createServerFn } from '@tanstack/react-start'
import { desc, getTableColumns, sql } from 'drizzle-orm'

export const getCronJobDetails = createServerFn({
  method: 'GET',
})
  .middleware([authMiddleware])
  .handler(async () => {
    try {
      const cronJobs = await db
        .select({
          ...getTableColumns(cronJobRunDetails),
          duration:
            sql`job_run_details.end_time - job_run_details.start_time`
              .mapWith(String)
              .as('duration'),
        })
        .from(cronJobRunDetails)
        .orderBy(desc(cronJobRunDetails.startTime))
        .limit(5)

      return cronJobs
    } catch (error) {
      catchError(error)
    }
  })
