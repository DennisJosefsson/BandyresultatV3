import { db } from '@/db'
import { cronJob, cronJobRunDetails } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import { desc, eq, sql } from 'drizzle-orm'

export const getCronJobDetails = createServerFn({
  method: 'GET',
})
  .middleware([authMiddleware])
  .handler(async () => {
    try {
      const cronJobs = await db
        .select({
          jobId: cronJob.jobId,
          jobPid: cronJobRunDetails.jobPid,
          status: cronJobRunDetails.status,
          returnMessage: cronJobRunDetails.returnMessage,
          startTime: cronJobRunDetails.startTime,
          jobName: cronJob.jobName,
          duration:
            sql`job_run_details.end_time - job_run_details.start_time`
              .mapWith(String)
              .as('duration'),
        })
        .from(cronJobRunDetails)
        .innerJoin(
          cronJob,
          eq(cronJob.jobId, cronJobRunDetails.jobId),
        )
        .orderBy(desc(cronJobRunDetails.startTime))
        .limit(12)

      const getCronJobStats = await cronJobStats()

      const cronJobNames = await db
        .select({
          jobName: cronJob.jobName,
          jobId: cronJob.jobId,
        })
        .from(cronJob)
        .orderBy(cronJob.jobId)

      return {
        cronJobs,
        cronJobStats: getCronJobStats,
        cronJobNames,
      }
    } catch (error) {
      catchError(error)
    }
  })

async function cronJobStats() {
  const cte = db.$with('cte').as(
    db
      .select({
        jobId: cronJobRunDetails.jobId,
        duration:
          sql`job_run_details.end_time - job_run_details.start_time`
            .mapWith(String)
            .as('duration'),
        ranked:
          sql`row_number() over(partition by job_run_details.jobid order by job_run_details.start_time desc)`
            .mapWith(Number)
            .as('ranked'),
      })
      .from(cronJobRunDetails),
  )

  const result = await db
    .with(cte)
    .select({
      jobId:
        cronJobRunDetails.jobId as unknown as SQL<number>,
      averageDuration:
        sql`extract(epoch from avg(job_run_details.end_time - job_run_details.start_time))`
          .mapWith(Number)
          .as('average_duration'),
      latestDuration: sql`extract(epoch from cte.duration)`
        .mapWith(Number)
        .as('latest_duration'),
    })
    .from(cronJobRunDetails)
    .innerJoin(cte, eq(cte.jobId, cronJobRunDetails.jobId))
    .where(eq(cte.ranked, 1))
    .groupBy(cronJobRunDetails.jobId, cte.duration)
    .orderBy(cronJobRunDetails.jobId)

  return result
}
