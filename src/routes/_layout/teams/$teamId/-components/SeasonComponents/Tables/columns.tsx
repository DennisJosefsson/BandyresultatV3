import {
  NumberCell,
  NumberHeader,
} from '@/components/Common/Tables/Number'
import {
  TeamnameHeader,
  TeamnameLabel,
} from '@/components/Common/Tables/Teamname'
import { Button } from '@/components/base/ui/button'
import type { TeamTable } from '@/lib/types/table'
import { createColumnHelper } from '@tanstack/react-table'

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
      <TeamnameHeader>
        <span className="invisible">Lag</span>
      </TeamnameHeader>
    ),
    cell: ({ row }) => (
      <TeamnameLabel>
        {row.getValue('team_casualName')}
      </TeamnameLabel>
    ),
  }),
  columnHelper.accessor('totalGames' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          variant="ghost"
          size="sm"
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
  }),
  columnHelper.accessor('totalWins' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          variant="ghost"
          size="sm"
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
  }),
  columnHelper.accessor('totalDraws' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          variant="ghost"
          size="sm"
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
  }),
  columnHelper.accessor('totalLost' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          variant="ghost"
          size="sm"
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
  }),
  columnHelper.accessor('totalGoalsScored' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          variant="ghost"
          size="sm"
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
  }),
  columnHelper.accessor('totalGoalsConceded' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          variant="ghost"
          size="sm"
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
  }),
  columnHelper.accessor('totalGoalDifference' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          variant="ghost"
          size="sm"
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
  }),
  columnHelper.accessor('totalPoints' as const, {
    header: ({ column }) => (
      <NumberHeader>
        <Button
          className="p-0 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm"
          variant="ghost"
          size="sm"
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
  }),
]
