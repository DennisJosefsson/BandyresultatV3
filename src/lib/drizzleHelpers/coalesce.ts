import type {
  Column,
  GetColumnData,
  SQL,
} from 'drizzle-orm'
import { sql } from 'drizzle-orm'

type AnySql = SQL | Column
// oxlint-disable-next-line typescript/array-type
type Coalesce<Array extends AnySql[]> = Array extends [
  ...infer Optionals,
  infer Last,
]
  ?
      | Exclude<
          ExtractSqlType<Optionals[number]>,
          null | undefined
        >
      | ExtractSqlType<Last>
  : never
type ExtractSqlType<S> =
  S extends SQL<infer T>
    ? T
    : S extends Column
      ? GetColumnData<S, 'query'>
      : never

export function coalesce<
  Args extends [AnySql, AnySql, ...Array<AnySql>],
>(...args: Args) {
  return sql<Coalesce<Args>>`coalesce(${sql.join(
    args.map((a) => sql`${a}`),
    sql.raw(','),
  )})`
}
