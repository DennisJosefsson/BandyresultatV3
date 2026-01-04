import { getRouteApi } from '@tanstack/react-router'
import { columns } from './columns'
import DataTable from './DataTable'

const route = getRouteApi('/_layout/season/$year/$group/tables/$table')

const TableList = () => {
  const data = route.useLoaderData()

  if (data.tables.length === 0) {
    return (
      <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
        <p className="mx-10 text-center">
          Serietabeller saknas för denna säsong.
        </p>
      </div>
    )
  }
  const teamObject = data.tables.reduce(
    (o, key) => ({ ...o, [key.team.casualName]: key.teamId }),
    {},
  )
  return (
    <div className="mb-6">
      <div
        id={data.serie.group}
        className="group mb-0.5 flex flex-row items-center gap-1"
      >
        <h2 className="text-sm font-bold tracking-wide lg:text-base xl:text-xl">
          {data.serie.serieName}
        </h2>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={data.tables}
          teamObject={teamObject}
          serieStructure={data.serie.serieStructure}
        />
        {data.serie.comment && (
          <p className="bg-background p-1 text-[8px] md:text-xs">
            {data.serie.comment}
          </p>
        )}
      </div>
    </div>
  )
}

export default TableList
