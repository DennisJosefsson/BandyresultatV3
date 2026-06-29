import type { SingleTeamTableItem } from '@/lib/types/table'
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

export const columns: Array<
  ColumnDef<SingleTeamTableItem>
> = [
  {
    accessorKey: 'totalGames',
    header: () => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] sm:text-[10px] md:text-sm">
        M
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalGames')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalWins',
    header: () => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] sm:text-[10px] md:text-sm">
        V
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalWins')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalDraws',
    header: () => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] sm:text-[10px] md:text-sm">
        O
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalDraws')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalLost',
    header: () => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] sm:text-[10px] md:text-sm">
        F
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalLost')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsScored',
    header: () => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] sm:text-[10px] md:text-sm">
        GM
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: () => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] sm:text-[10px] md:text-sm">
        IM
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalDifference',
    header: () => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] sm:text-[10px] md:text-sm">
        MS
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalPoints',
    header: () => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] sm:text-[10px] md:text-sm">
        P
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[8px] w-8 text-center text-[7px] tabular-nums sm:text-[10px] md:text-sm xl:text-base ">
        {row.getValue('totalPoints')}
      </div>
    ),
    maxSize: 16,
  },
]
