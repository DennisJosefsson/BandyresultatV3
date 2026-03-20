import {
  TableCell,
  TableRow,
} from '@/components/base/ui/table'

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
  const matchup = team.opponent
    ? `${team.team.casualName}-${team.opponent.casualName}`
    : team.team.casualName
  const smMatchup = team.opponent
    ? `${team.team.shortName}-${team.opponent.shortName}`
    : team.team.shortName
  return (
    <TableRow>
      <TableCell className="px-1 py-1 text-left text-[10px] md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        <span className="sm:hidden">{matchup}</span>
        <span className="hidden sm:inline-block">
          {smMatchup}
        </span>
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[10px] tabular-nums md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalGames}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[10px] tabular-nums md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalWins}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[10px] tabular-nums md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalDraws}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[10px] tabular-nums md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalLost}
      </TableCell>
      <TableCell className="xs:table-cell hidden px-1 py-1 text-right text-[10px] tabular-nums md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalGoalsScored}
      </TableCell>
      <TableCell className="xs:table-cell hidden px-1 py-1 text-right text-[10px] tabular-nums md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalGoalsConceded}
      </TableCell>
      <TableCell className="xs:table-cell hidden px-1 py-1 text-right text-[10px] tabular-nums md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalGoalDifference}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[10px] tabular-nums md:py-2 lg:text-sm xl:text-base 2xl:text-lg">
        {team.totalPoints}
      </TableCell>
    </TableRow>
  )
}

export default DataTableRow
