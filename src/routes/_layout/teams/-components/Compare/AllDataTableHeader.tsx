import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'

const AllDataTableHeader = () => {
  return (
    <TableHeader>
      <TableRow key={`tableheadAllgames`}>
        <TableHead
          scope="col"
          className="h-6 px-1 py-1 text-left text-[10px] md:h-10 md:w-56 md:py-2 lg:text-sm"
        >
          Lag
        </TableHead>
        <TableHead
          scope="col"
          className="h-6 px-1 py-1 text-right text-[10px] md:h-10 md:w-8 md:py-2 lg:text-sm"
        >
          M
        </TableHead>
        <TableHead
          scope="col"
          className="h-6 px-1 py-1 text-right text-[10px] md:h-10 md:w-8 md:py-2 lg:text-sm"
        >
          V
        </TableHead>
        <TableHead
          scope="col"
          className="h-6 px-1 py-1 text-right text-[10px] md:h-10 md:w-8 md:py-2 lg:text-sm"
        >
          O
        </TableHead>
        <TableHead
          scope="col"
          className="h-6 px-1 py-1 text-right text-[10px] md:h-10 md:w-8 md:py-2 lg:text-sm"
        >
          F
        </TableHead>
        <TableHead
          scope="col"
          className="xs:table-cell hidden h-6 px-1 py-1 text-right text-[10px] md:h-10 md:w-12 md:py-2 lg:text-sm"
        >
          GM
        </TableHead>
        <TableHead
          scope="col"
          className="xs:table-cell hidden h-6 px-1 py-1 text-right text-[10px] md:h-10 md:w-12 md:py-2 lg:text-sm"
        >
          IM
        </TableHead>
        <TableHead
          scope="col"
          className="xs:table-cell hidden h-6 px-1 py-1 text-right text-[10px] md:h-10 md:w-12 md:py-2 lg:text-sm"
        >
          MS
        </TableHead>
        <TableHead
          scope="col"
          className="h-6 px-1 py-1 text-right text-[10px] md:h-10 md:w-8 md:py-2 lg:text-sm"
        >
          P
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default AllDataTableHeader
