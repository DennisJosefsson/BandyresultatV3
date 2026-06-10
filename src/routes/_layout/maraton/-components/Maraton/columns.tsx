import type { ColumnDef } from '@tanstack/react-table'
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react'
import type { MaratonTable } from '@/lib/types/table'
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
    accessorKey: 'team.casualName',
    header: () => (
      <div className="xs:text-[8px] w-10 truncate text-left text-[7px] sm:w-20 sm:text-[10px] md:text-sm lg:w-40 xl:w-48 xl:text-base 2xl:text-lg">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] w-10 truncate text-left text-[7px] sm:w-20 sm:text-[10px] md:text-sm lg:w-40 xl:w-48 xl:text-base 2xl:text-lg">
        {row.getValue('team_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'seasons',
    header: ({ column }) => (
      <div className="xs:text-[8px] max-w-10 text-center text-[7px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="xs:text-[8px] text-[7px] sm:text-[10px] md:text-sm"
        >
          S
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
        {row.getValue('seasons')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGames',
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
  },
  {
    accessorKey: 'totalWins',
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
  },
  {
    accessorKey: 'totalDraws',
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
  },
  {
    accessorKey: 'totalLost',
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
  },
  {
    accessorKey: 'totalGoalsScored',
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
  },
  {
    accessorKey: 'totalGoalsConceded',
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
  },
  {
    accessorKey: 'totalGoalDifference',
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
  },
  {
    accessorKey: 'totalPoints',
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
  },
]
