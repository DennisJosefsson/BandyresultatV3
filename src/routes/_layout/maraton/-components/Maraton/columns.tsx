import {
  NumberCell,
  NumberHeader,
} from '@/components/Common/Tables/Number'
import {
  TeamnameHeader,
  TeamnameLabel,
} from '@/components/Common/Tables/Teamname'
import { Button } from '@/components/base/ui/button'
import type { MaratonTable } from '@/lib/types/table'
import type { ColumnDef } from '@tanstack/react-table'

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
    header: () => <TeamnameHeader></TeamnameHeader>,
    cell: ({ row }) => (
      <TeamnameLabel className="truncate">
        {row.getValue('team_name')}
      </TeamnameLabel>
    ),
  },
  {
    accessorKey: 'seasons',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          size="sm"
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          S
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell>{row.getValue('seasons')}</NumberCell>
    ),
  },
  {
    accessorKey: 'totalGames',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          size="sm"
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          M
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell>{row.getValue('totalGames')}</NumberCell>
    ),
  },
  {
    accessorKey: 'totalWins',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          size="sm"
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          V
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell>{row.getValue('totalWins')}</NumberCell>
    ),
  },
  {
    accessorKey: 'totalDraws',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          size="sm"
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          O
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell>{row.getValue('totalDraws')}</NumberCell>
    ),
  },
  {
    accessorKey: 'totalLost',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          size="sm"
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          F
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell>{row.getValue('totalLost')}</NumberCell>
    ),
  },
  {
    accessorKey: 'totalGoalsScored',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          size="sm"
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          GM
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell>
        {row.getValue('totalGoalsScored')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          size="sm"
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          IM
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell>
        {row.getValue('totalGoalsConceded')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalGoalDifference',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          size="sm"
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          MS
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell>
        {row.getValue('totalGoalDifference')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalPoints',
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          size="sm"
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }
        >
          P
        </Button>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell>{row.getValue('totalPoints')}</NumberCell>
    ),
  },
]
