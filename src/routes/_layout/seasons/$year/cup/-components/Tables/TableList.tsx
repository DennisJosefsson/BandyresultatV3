import { Button } from '@/components/base/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/base/ui/popover'
import type { TeamSeasonTable } from '@/lib/types/table'
import DataTable from './DataTable'
import MobileDataTable from './MobileDataTable'

type TableListProps = {
  tableArray: Array<TeamSeasonTable>
}

const TableList = ({ tableArray }: TableListProps) => {
  if (tableArray.length === 0) {
    return (
      <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
        <p className="mx-10 text-center">
          Serietabeller saknas för denna säsong.
        </p>
      </div>
    )
  }
  return (
    <div className="mb-6">
      {tableArray.map((serie) => {
        return (
          <div
            key={serie.serie.group}
            className="mb-6 @container/cuptable"
          >
            <div className="flex flex-row gap-x-12 items-center mb-2">
              <h3 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
                {serie.serie.serieName}
              </h3>

              {serie.serie.comment ? (
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button variant="outline">
                        Kommentar
                      </Button>
                    }
                  />
                  <PopoverContent>
                    <span className="p-2 text-xs @sm:text-sm font-semibold">
                      {serie.serie.comment}
                    </span>
                  </PopoverContent>
                </Popover>
              ) : null}
            </div>

            <div className="hidden flex-col gap-2 @lg:flex">
              <DataTable
                data={serie.table}
                serieStructure={serie.serie.serieStructure}
              />
            </div>
            <div className="flex flex-col gap-2 @lg:hidden">
              <MobileDataTable
                data={serie.table}
                serieStructure={serie.serie.serieStructure}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TableList
