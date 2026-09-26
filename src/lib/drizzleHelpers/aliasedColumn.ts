import type { GetColumnData } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import type { PgColumn } from 'drizzle-orm/pg-core'

export const aliasedColumn = <T extends PgColumn>(
  column: T,
  alias: string,
) => {
  return sql<GetColumnData<T>>`${column}`.as(alias)
}
