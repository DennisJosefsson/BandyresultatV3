import { db } from '@/db'
import { series } from '@/db/schema'
import { asc, eq, getTableColumns } from 'drizzle-orm'

export async function getCompetitionSeries({
  competitionId,
}: {
  competitionId: number
}) {
  return await db
    .select({ ...getTableColumns(series) })
    .from(series)
    .where(eq(series.competitionId, competitionId))
    .orderBy(asc(series.level))
}
