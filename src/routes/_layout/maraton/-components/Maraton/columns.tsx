import { Button } from '@/components/base/ui/button'
import TeamLogo from '@/components/Common/TeamLogo'
import type { MaratonTable } from '@/lib/types/table'
import type { ColumnDef } from '@tanstack/react-table'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
} from 'lucide-react'

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
    header: () => (
      <div className="xs:text-[10px] w-20 truncate text-left text-108px] sm:w-28 sm:text-[10px] md:text-sm lg:w-40 xl:w-48 xl:text-base ">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-20 truncate text-left text-[8px] sm:w-28 sm:text-[10px] md:text-sm lg:w-40 xl:w-48 xl:text-base flex flex-row items-center gap-1 sm:gap-2">
        <TeamLogo
          size={32}
          teamId={row.original.teamId}
          className="object-scale-down w-2 xs:w-3 sm:w-4 md:w-5"
          alt={row.original.team.casualName}
          title={row.original.team.casualName}
        />
        <span className="truncate">
          {row.getValue('team_name')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'seasons',
    header: ({ column }) => (
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="xs:text-[10px] text-[8px] sm:text-[10px] md:text-sm"
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
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('seasons')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGames',
    header: ({ column }) => (
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="xs:text-[10px] text-[8px] sm:text-[10px] md:text-sm"
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
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalGames')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalWins',
    header: ({ column }) => (
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="xs:text-[10px] text-[8px] sm:text-[10px] md:text-sm"
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
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalWins')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalDraws',
    header: ({ column }) => (
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="xs:text-[10px] text-[8px] sm:text-[10px] md:text-sm"
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
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalDraws')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalLost',
    header: ({ column }) => (
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="xs:text-[10px] text-[8px] sm:text-[10px] md:text-sm"
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
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalLost')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsScored',
    header: ({ column }) => (
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="xs:text-[10px] text-[8px] sm:text-[10px] md:text-sm"
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
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: ({ column }) => (
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="xs:text-[10px] text-[8px] sm:text-[10px] md:text-sm"
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
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalDifference',
    header: ({ column }) => (
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="xs:text-[10px] text-[8px] sm:text-[10px] md:text-sm"
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
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalPoints',
    header: ({ column }) => (
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] sm:text-[10px] md:text-sm">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
          className="xs:text-[10px] text-[8px] sm:text-[10px] md:text-sm"
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
      <div className="xs:text-[10px] max-w-7 text-center text-[8px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalPoints')}
      </div>
    ),
    maxSize: 16,
  },
]
