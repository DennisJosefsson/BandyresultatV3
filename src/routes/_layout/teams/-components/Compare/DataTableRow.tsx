import { TableCell, TableRow } from '@/components/ui/table'
import { useMediaQuery } from 'usehooks-ts'

interface TableRowData {
  team: {
    shortName: string
    casualName: string
  }
  opponent?: {
    shortName: string
    casualName: string
  }
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalPoints: number
}

const DataTableRow = ({ team }: { team: TableRowData }) => {
  const matches = useMediaQuery('(min-width: 640px)')
  return (
    <TableRow>
      <TableCell className="px-1 py-1 text-left text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.opponent && (
          <>
            {!matches
              ? `${team.team.shortName}-${team.opponent.shortName}`
              : `${team.team.casualName}-${team.opponent.casualName}`}
          </>
        )}
        {!team.opponent && (
          <>{!matches ? team.team.shortName : team.team.casualName}</>
        )}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalGames}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalWins}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalDraws}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalLost}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalGoalsScored}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalGoalsConceded}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalGoalDifference}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalPoints}
      </TableCell>
    </TableRow>
  )
}

export default DataTableRow
