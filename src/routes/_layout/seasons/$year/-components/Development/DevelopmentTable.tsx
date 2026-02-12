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
import { getRouteApi } from '@tanstack/react-router'
import { ArrowDownRightIcon, ArrowUpRightIcon } from 'lucide-react'

const route = getRouteApi('/_layout/seasons/$year/$group/development')

const DevelopmentTable = () => {
  const { favTeams } = useFavTeam()
  const index = route.useSearch({ select: (s) => s.index })
  const serie = route.useLoaderData({ select: (s) => s.serie })
  const tables = route.useLoaderData({ select: (s) => s.tables })

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
            <TableHead className="xs:table-cell hidden"></TableHead>
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
          {tables[index]?.table.map((team, index) => {
            return (
              <TableRow
                key={`${team.teamId}-${index}`}
                className={`${
                  serie.serieStructure?.includes(index + 1)
                    ? 'border-foreground border-b-2'
                    : null
                } ${favTeams.includes(team.teamId) ? 'font-bold' : null}`}
              >
                <TableCell className="text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.position}
                </TableCell>
                <TableCell className="truncate text-left text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.team.casualName}
                </TableCell>
                <TableCell className="xs:table-cell hidden text-[8px] text-slate-100 sm:text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
                  {team.arrowDirection === 'up' ? (
                    <ArrowUpRightIcon />
                  ) : team.arrowDirection === 'down' ? (
                    <ArrowDownRightIcon />
                  ) : null}
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

export default DevelopmentTable
