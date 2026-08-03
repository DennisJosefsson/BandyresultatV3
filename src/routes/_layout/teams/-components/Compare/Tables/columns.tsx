import {
  NumberCell,
  NumberHeader,
} from '@/components/Common/Tables/Number'
import type { CompareBaseTable } from '@/lib/types/compare'
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
  totalGames: true,
  totalWins: false,
  totalDraws: false,
  totalLost: false,
  totalGoalsScored: true,
  totalGoalsConceded: true,
  totalGoalDifference: true,
  totalPoints: true,
}

export const columns: Array<ColumnDef<CompareBaseTable>> = [
  {
    accessorKey: 'totalGames',
    header: () => <NumberHeader>M</NumberHeader>,
    cell: ({ row }) => (
      <NumberCell>{row.getValue('totalGames')}</NumberCell>
    ),
  },
  {
    accessorKey: 'totalWins',
    header: () => <NumberHeader>V</NumberHeader>,
    cell: ({ row }) => (
      <NumberCell>{row.getValue('totalWins')}</NumberCell>
    ),
  },
  {
    accessorKey: 'totalDraws',
    header: () => <NumberHeader>O</NumberHeader>,
    cell: ({ row }) => (
      <NumberCell>{row.getValue('totalDraws')}</NumberCell>
    ),
  },
  {
    accessorKey: 'totalLost',
    header: () => <NumberHeader>F</NumberHeader>,
    cell: ({ row }) => (
      <NumberCell>{row.getValue('totalLost')}</NumberCell>
    ),
  },
  {
    accessorKey: 'totalGoalsScored',
    header: () => <NumberHeader>GM</NumberHeader>,
    cell: ({ row }) => (
      <NumberCell>
        {row.getValue('totalGoalsScored')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: () => <NumberHeader>IM</NumberHeader>,
    cell: ({ row }) => (
      <NumberCell>
        {row.getValue('totalGoalsConceded')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalGoalDifference',
    header: () => <NumberHeader>MS</NumberHeader>,
    cell: ({ row }) => (
      <NumberCell>
        {row.getValue('totalGoalDifference')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalPoints',
    header: () => <NumberHeader>P</NumberHeader>,
    cell: ({ row }) => (
      <NumberCell>{row.getValue('totalPoints')}</NumberCell>
    ),
  },
]
