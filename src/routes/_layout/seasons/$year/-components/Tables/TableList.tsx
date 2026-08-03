import { getRouteApi } from '@tanstack/react-router'
import DataTable from './DataTable'
import Comment from './Comment'
import { columns } from './columns'

const route = getRouteApi('/_layout/seasons/$year/$group/tables/$table')

const TableList = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null

  if (data.tables.length === 0) {
    return (
      <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
        <p className="mx-10 text-center">Serietabeller saknas för denna säsong.</p>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div id={data.serie.group} className="group mb-0.5 flex flex-row items-center gap-1">
        <h2 className="text-sm font-bold tracking-wide lg:text-base xl:text-xl">
          {data.serie.serieName}
        </h2>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={data.tables}
          serieStructure={data.serie.serieStructure}
        />
        {data.serie.comment ? <Comment comment={data.serie.comment} /> : null}
      </div>
    </div>
  )
}

export default TableList
