import type { Column, SQL } from 'drizzle-orm'

import { sql } from 'drizzle-orm'

type Options = {
  orderBy?: Array<SQL>
  filter?: SQL
}

export function jsonAgg<T>(
  expression: SQL,
  options?: Options,
) {
  let orderBySql
  if (
    options &&
    options.orderBy &&
    options.orderBy.length > 0
  ) {
    orderBySql = sql` order by ${sql.join(options.orderBy, sql`, `)}`
  }

  let filterSql
  if (options && options.filter) {
    filterSql = sql` filter (where ${options.filter})`
  }

  return sql<T>`coalesce(json_agg(${expression}${orderBySql})${filterSql}, '[]'::json)`
}

/**
 * @param shape Potential for SQL injections, so you shouldn't allow user-specified key names
 */
export function jsonBuildObject<
  R,
  T extends Record<string, Column | SQL> = Record<
    string,
    Column | SQL
  >,
>(shape: T) {
  const chunks: Array<SQL> = []

  Object.entries(shape).forEach(([key, value]) => {
    if (chunks.length > 0) {
      chunks.push(sql.raw(','))
    }
    chunks.push(sql.raw(`'${key}',`))
    chunks.push(sql`${value}`)
  })

  return sql<R>`json_build_object(${sql.join(chunks)})`
}

export const jsonAggBuildObject = <
  R,
  T extends Record<string, Column | SQL> = Record<
    string,
    Column | SQL
  >,
>(
  shape: T,
  options?: Options,
) => {
  return jsonAgg<R>(jsonBuildObject(shape), options)
}
