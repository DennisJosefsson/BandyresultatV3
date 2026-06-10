import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'
import type { TeamTable } from '@/lib/types/table'
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
    header: () => (
      <div className="xs:text-[8px] w-12 truncate text-left text-[7px] sm:w-20 sm:text-[10px] md:text-sm lg:w-32 xl:text-base 2xl:text-lg">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] w-12 truncate text-left text-[7px] sm:w-20 sm:text-[10px] md:text-sm lg:w-32 xl:text-base 2xl:text-lg">
        {row.getValue('team_casualName')}
      </div>
    ),
  }),
  columnHelper.accessor('totalGames' as const, {
    header: ({ column }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
        >
          M
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGames')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalWins' as const, {
    header: ({ column }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
        >
          V
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalWins')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalDraws' as const, {
    header: ({ column }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
        >
          O
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalDraws')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalLost' as const, {
    header: ({ column }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
        >
          F
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalLost')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalGoalsScored' as const, {
    header: ({ column }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
        >
          GM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalGoalsConceded' as const, {
    header: ({ column }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
        >
          IM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalGoalDifference' as const, {
    header: ({ column }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
        >
          MS
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalPoints' as const, {
    header: ({ column }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
        >
          P
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="xs:ml-2 ml-1 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalPoints')}
      </div>
    ),
    maxSize: 16,
  }),
]
