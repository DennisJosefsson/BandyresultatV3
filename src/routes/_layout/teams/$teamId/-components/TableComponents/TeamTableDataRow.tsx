import { TableCell, TableRow } from '@/components/ui/table'

type Table = {
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalPoints: number
}

const TeamTableRow = ({ table }: { table: Table }) => {
  return (
    <TableRow>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {table.totalGames}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {table.totalWins}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {table.totalDraws}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {table.totalLost}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {table.totalGoalsScored}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {table.totalGoalsConceded}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {table.totalGoalDifference}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {table.totalPoints}
      </TableCell>
    </TableRow>
  )
}

export default TeamTableRow
