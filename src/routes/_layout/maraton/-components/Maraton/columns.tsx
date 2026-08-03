import type { ColumnDef } from '@tanstack/react-table'
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react'
import type { MaratonTable } from '@/lib/types/table'
import TeamLogo from '@/components/Common/TeamLogo'
import { TeamnameHeader, TeamnameLabel } from '@/components/Common/Tables/Teamname'
import { NumberCell, NumberHeader } from '@/components/Common/Tables/Number'
import { Button } from '@/components/base/ui/button'

export const showColumns = {
  totalDraws: true,
  totalGoalsScored: true,
  totalGoalsConceded: true,
}

export const hideColumns = {
  totalDraws: false,
  totalGoalsScored: false,
  totalGoalsConceded: false,
}

export const gameColumns = {
  'team.casualName': true,
  seasons: true,
  totalGames: true,
  totalWins: true,
  totalDraws: true,
  totalLost: true,
  totalGoalsScored: false,
  totalGoalsConceded: false,
  totalGoalDifference: false,
  totalPoints: true,
}

export const goalsColumns = {
  'team.casualName': true,
  seasons: true,
  totalGames: true,
  totalWins: false,
  totalDraws: false,
  totalLost: false,
  totalGoalsScored: true,
  totalGoalsConceded: true,
  totalGoalDifference: true,
  totalPoints: true,
}

export const columns: Array<ColumnDef<MaratonTable>> = [
  {
    accessorKey: 'team.name',
    header: () => <TeamnameHeader>Lag</TeamnameHeader>,
    cell: ({ row }) => (
      <TeamnameLabel>
        <TeamLogo
          size={32}
          teamId={row.original.teamId}
          className="xs:block hidden size-[1lh] object-scale-down"
          alt={row.original.team.casualName}
          title={row.original.team.casualName}
        />
        <span className="truncate">{row.getValue('team_name')}</span>
      </TeamnameLabel>
    ),
  },
  {
    accessorKey: 'seasons',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm xl:text-base"
        >
          S
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          )}
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => <NumberCell>{row.getValue('seasons')}</NumberCell>,
    maxSize: 16,
  },
  {
    accessorKey: 'totalGames',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm xl:text-base"
        >
          M
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          )}
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => <NumberCell>{row.getValue('totalGames')}</NumberCell>,
    maxSize: 16,
  },
  {
    accessorKey: 'totalWins',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm xl:text-base"
        >
          V
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          )}
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => <NumberCell>{row.getValue('totalWins')}</NumberCell>,
    maxSize: 16,
  },
  {
    accessorKey: 'totalDraws',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm xl:text-base"
        >
          O
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          )}
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => <NumberCell>{row.getValue('totalDraws')}</NumberCell>,
    maxSize: 16,
  },
  {
    accessorKey: 'totalLost',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm xl:text-base"
        >
          F
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          )}
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => <NumberCell>{row.getValue('totalLost')}</NumberCell>,
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsScored',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm xl:text-base"
        >
          GM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          )}
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => <NumberCell>{row.getValue('totalGoalsScored')}</NumberCell>,
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm xl:text-base"
        >
          IM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          )}
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => <NumberCell>{row.getValue('totalGoalsConceded')}</NumberCell>,
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalDifference',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm xl:text-base"
        >
          MS
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          )}
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => <NumberCell>{row.getValue('totalGoalDifference')}</NumberCell>,
    maxSize: 16,
  },
  {
    accessorKey: 'totalPoints',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm xl:text-base"
        >
          P
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          )}
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => <NumberCell>{row.getValue('totalPoints')}</NumberCell>,
    maxSize: 16,
  },
]
