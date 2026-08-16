import { Button } from '@/components/base/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/base/ui/popover'
import type { Serie } from '@/lib/types/serie'
import type { TeamTable } from '@/lib/types/table'
import MobileDataTable from './MobileDataTable'
import { columns } from './columns'

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
      <div className="flex flex-row gap-x-12 items-center mb-2">
        <h3 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
          {serie.serieName}
        </h3>
        {serie.comment ? (
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline">Kommentar</Button>
              }
            />
            <PopoverContent>
              <span className="p-2 text-xs @sm:text-sm font-semibold">
                {serie.comment}
              </span>
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
      <div>
        <MobileDataTable
          columns={columns}
          data={tables}
          serieStructure={serie.serieStructure}
        />
      </div>
    </div>
  )
}

export default MobileTableList
