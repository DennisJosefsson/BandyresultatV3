import type { Serie } from '@/lib/types/serie'
import type { TeamTable } from '@/lib/types/table'
import MobileDataTable from './MobileDataTable'
import { columns } from './columns'
import { Comment, SerieName } from './sharedComponents'

type TablesListProps = {
  tables: Array<
    Omit<TeamTable, 'women' | 'group' | 'season'>
  >
  serie: Serie
}

const MobileTableList = ({
  tables,
  serie,
}: TablesListProps) => {
  if (tables.length === 0) {
    return (
      <div className="grid py-5 mx-auto mt-4 text-sm font-bold font-inter text-foreground place-items-center md:text-base">
        <p className="mx-10 text-center">
          Serietabeller saknas för denna säsong.
        </p>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div
        id={serie.group}
        className="group mb-0.5 flex flex-row items-center gap-1"
      >
        <SerieName>{serie.serieName}</SerieName>
      </div>

      <div>
        <MobileDataTable
          columns={columns}
          data={tables}
          serieStructure={serie.serieStructure}
        />
        {serie.comment ? (
          <Comment>serie.comment</Comment>
        ) : null}
      </div>
    </div>
  )
}

export default MobileTableList
