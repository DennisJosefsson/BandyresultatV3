import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'

import { Serie } from '@/lib/types/serie'
import { ReturnDevDataTableItem } from '@/lib/types/table'
import { cn } from '@/lib/utils/utils'

type IntervalTableProps = {
  table: ReturnDevDataTableItem[]

  serie: Serie
}

const IntervalTable = ({ table, serie }: IntervalTableProps) => {
  const { favTeams } = useFavTeam()

  return (
    <div className="mx-2 text-[10px] lg:mt-5 lg:text-sm xl:mx-0 xl:mt-7 xl:text-base 2xl:text-lg">
      <Table>
        <TableCaption>{serie.comment}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              scope="col"
              className="text-left text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              P
            </TableHead>
            <TableHead
              scope="col"
              className="text-left text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              Lag
            </TableHead>

            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              M
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              V
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              O
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              F
            </TableHead>
            <TableHead
              scope="col"
              className="hidden text-right text-[10px] md:table-cell lg:text-sm xl:text-base 2xl:text-lg"
            >
              GM
            </TableHead>
            <TableHead
              scope="col"
              className="hidden text-right text-[10px] md:table-cell lg:text-sm xl:text-base 2xl:text-lg"
            >
              IM
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              MS
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[10px] lg:text-sm xl:text-base 2xl:text-lg"
            >
              P
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.map((team, index) => {
            return (
              <TableRow
                key={`${team.teamId}-${index}`}
                className={cn(
                  serie.serieStructure?.includes(index + 1)
                    ? 'border-foreground border-b-2'
                    : null,
                  favTeams.includes(team.teamId) ? 'font-bold' : null,
                )}
              >
                <TableCell className="text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {index + 1}
                </TableCell>
                <TableCell className="truncate text-left text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.team.casualName}
                </TableCell>

                <TableCell className="text-right text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
                  {team.totalGames}
                </TableCell>
                <TableCell className="text-right text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
                  {team.totalWins}
                </TableCell>
                <TableCell className="text-right text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
                  {team.totalDraws}
                </TableCell>
                <TableCell className="text-right text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
                  {team.totalLost}
                </TableCell>
                <TableCell className="hidden text-right text-[10px] tabular-nums md:table-cell lg:text-sm xl:text-base 2xl:text-lg">
                  {team.totalGoalsScored}
                </TableCell>
                <TableCell className="hidden text-right text-[10px] tabular-nums md:table-cell lg:text-sm xl:text-base 2xl:text-lg">
                  {team.totalGoalsConceded}
                </TableCell>
                <TableCell className="text-right text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
                  {team.totalGoalDifference}
                </TableCell>
                <TableCell className="text-right text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
                  {team.totalPoints}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default IntervalTable
