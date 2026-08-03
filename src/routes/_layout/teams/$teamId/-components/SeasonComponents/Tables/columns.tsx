import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'
import type { TeamTable } from '@/lib/types/table'
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
  totalGames: true,
  totalWins: false,
  totalDraws: false,
  totalLost: false,
  totalGoalsScored: true,
  totalGoalsConceded: true,
  totalGoalDifference: true,
  totalPoints: true,
}

const columnHelper = createColumnHelper<TeamTable>()

export const columns = [
  columnHelper.accessor('team.casualName' as const, {
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
        {row.getValue('team_casualName')}
      </TeamnameLabel>
    ),
  }),
  columnHelper.accessor('totalGames' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
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
  }),
  columnHelper.accessor('totalWins' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
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
  }),
  columnHelper.accessor('totalDraws' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
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
  }),
  columnHelper.accessor('totalLost' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
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
  }),
  columnHelper.accessor('totalGoalsScored' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
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
  }),
  columnHelper.accessor('totalGoalsConceded' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
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
  }),
  columnHelper.accessor('totalGoalDifference' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
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
  }),
  columnHelper.accessor('totalPoints' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          variant="ghost"
          size="responsive"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
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
  }),
]
