import type { ColumnDef } from '@tanstack/react-table'
import type { ReturnDevDataTableItem } from '@/lib/types/table'
import TeamLogo from '@/components/Common/TeamLogo'
import { TeamnameHeader, TeamnameLabel } from '@/components/Common/Tables/Teamname'
import { NumberCell, NumberHeader } from '@/components/Common/Tables/Number'

export const columns: Array<ColumnDef<ReturnDevDataTableItem>> = [
  {
    accessorKey: 'team.casualName',
    header: () => <TeamnameHeader>Lag</TeamnameHeader>,
    cell: ({ row }) => (
      <TeamnameLabel>
        <TeamLogo
          size={32}
          teamId={row.original.teamId}
          className="size-[1lh] object-scale-down"
          alt={row.original.team.casualName}
          title={row.original.team.casualName}
        />
        <span className="truncate">{row.getValue('team_casualName')}</span>
      </TeamnameLabel>
    ),
    maxSize: 160,
  },

  {
    accessorKey: 'totalGames',
    header: () => <NumberHeader>M</NumberHeader>,
    cell: ({ row }) => <NumberCell>{row.getValue('totalGames')}</NumberCell>,
  },
  {
    accessorKey: 'totalWins',
    header: () => <NumberHeader>V</NumberHeader>,
    cell: ({ row }) => <NumberCell>{row.getValue('totalWins')}</NumberCell>,
  },
  {
    accessorKey: 'totalDraws',
    header: () => <NumberHeader>O</NumberHeader>,
    cell: ({ row }) => <NumberCell>{row.getValue('totalDraws')}</NumberCell>,
  },
  {
    accessorKey: 'totalLost',
    header: () => <NumberHeader>F</NumberHeader>,
    cell: ({ row }) => <NumberCell>{row.getValue('totalLost')}</NumberCell>,
  },
  {
    accessorKey: 'totalGoalsScored',
    header: () => <NumberHeader>GM</NumberHeader>,
    cell: ({ row }) => <NumberCell>{row.getValue('totalGoalsScored')}</NumberCell>,
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: () => <NumberHeader>IM</NumberHeader>,
    cell: ({ row }) => <NumberCell>{row.getValue('totalGoalsConceded')}</NumberCell>,
  },
  {
    accessorKey: 'totalGoalDifference',
    header: () => <NumberHeader>MS</NumberHeader>,
    cell: ({ row }) => <NumberCell>{row.getValue('totalGoalDifference')}</NumberCell>,
  },
  {
    accessorKey: 'totalPoints',
    header: () => <NumberHeader>P</NumberHeader>,
    cell: ({ row }) => <NumberCell>{row.getValue('totalPoints')}</NumberCell>,
  },
]
