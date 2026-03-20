import type { ColumnDef } from '@tanstack/react-table'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
} from 'lucide-react'

import { Button } from '@/components/base/ui/button'
import type { MaratonTable } from '@/lib/types/table'

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
      <div className="w-10 truncate text-left text-[7px] xs:text-[8px] sm:w-20 sm:text-[10px] lg:w-40 xl:w-48 md:text-sm xl:text-base 2xl:text-lg">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-10 truncate text-left text-[7px] xs:text-[8px] sm:w-20 sm:text-[10px] lg:w-40 xl:w-48 md:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('team_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'seasons',
    header: ({ column }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm max-w-10">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm"
        >
          S
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] tabular-nums md:text-sm xl:text-base 2xl:text-lg max-w-10">
        {row.getValue('seasons')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGames',
    header: ({ column }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm max-w-10">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm"
        >
          M
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] tabular-nums md:text-sm xl:text-base 2xl:text-lg max-w-10">
        {row.getValue('totalGames')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalWins',
    header: ({ column }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm max-w-10">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm"
        >
          V
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] tabular-nums md:text-sm xl:text-base 2xl:text-lg max-w-10">
        {row.getValue('totalWins')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalDraws',
    header: ({ column }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm max-w-10">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm"
        >
          O
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] tabular-nums md:text-sm xl:text-base 2xl:text-lg max-w-10">
        {row.getValue('totalDraws')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalLost',
    header: ({ column }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm max-w-10">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm"
        >
          F
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] tabular-nums md:text-sm xl:text-base 2xl:text-lg max-w-10">
        {row.getValue('totalLost')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsScored',
    header: ({ column }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm max-w-10">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm"
        >
          GM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] tabular-nums md:text-sm xl:text-base 2xl:text-lg max-w-10">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: ({ column }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm max-w-10">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm"
        >
          IM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] tabular-nums md:text-sm xl:text-base 2xl:text-lg max-w-10">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalDifference',
    header: ({ column }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm max-w-10">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm"
        >
          MS
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] tabular-nums md:text-sm xl:text-base 2xl:text-lg max-w-10">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalPoints',
    header: ({ column }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm max-w-10">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-sm"
        >
          P
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          ) : (
            <ChevronsUpDownIcon className="ml-1 xs:ml-2 size-2.5 sm:size-3 lg:size-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-[7px] xs:text-[8px] sm:text-[10px] tabular-nums md:text-sm xl:text-base 2xl:text-lg max-w-10">
        {row.getValue('totalPoints')}
      </div>
    ),
    maxSize: 16,
  },
]
