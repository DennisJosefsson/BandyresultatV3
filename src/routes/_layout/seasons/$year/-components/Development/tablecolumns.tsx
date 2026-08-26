import {
  NumberCell,
  NumberHeader,
} from '@/components/Common/Tables/Number'
import { TeamnameHeader } from '@/components/Common/Tables/Teamname'
import TeamLogo from '@/components/Common/TeamLogo'
import type { ReturnDevDataTableItem } from '@/lib/types/table'
import type { ColumnDef } from '@tanstack/react-table'
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from 'lucide-react'

const DirectionArrow = ({
  direction,
}: {
  direction: 'up' | 'down' | null
}) => {
  if (direction === null) {
    return null
  }

  if (direction === 'up') {
    return (
      <ArrowUpRightIcon className="size-[1lh] object-scale-down" />
    )
  }

  if (direction === 'down') {
    return (
      <ArrowDownRightIcon className="size-[1lh] object-scale-down" />
    )
  }

  return null
}

export const columns: Array<
  ColumnDef<ReturnDevDataTableItem>
> = [
  {
    accessorKey: 'position',
    header: () => (
      <NumberHeader className="@3xl:w-6">
        <span className="invisible">Pos</span>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell className="@3xl:w-6">
        {row.getValue('position')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'team.casualName',
    header: () => (
      <TeamnameHeader>
        <span className="invisible">Lag</span>
      </TeamnameHeader>
    ),
    cell: ({ row }) => (
      <div className="flex flex-row gap-0.5 @sm:gap-1 @md:gap-2 items-center">
        <TeamLogo
          size={32}
          teamId={row.original.teamId}
          className="hidden @xs:block size-[1lh] object-scale-down"
          aria-label={row.original.team.casualName}
          title={row.original.team.casualName}
        />
        <span className="truncate">
          {row.getValue('team_casualName')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'arrowDirection',
    header: () => (
      <NumberHeader className="text-center @3xl:w-6">
        <span className="invisible">F</span>
      </NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell className="text-center">
        <DirectionArrow
          direction={row.getValue('arrowDirection')}
        />
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalGames',
    header: () => (
      <NumberHeader className="@3xl:w-6">M</NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell className="@3xl:w-6">
        {row.getValue('totalGames')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalWins',
    header: () => (
      <NumberHeader className="@3xl:w-6">V</NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell className="@3xl:w-6">
        {row.getValue('totalWins')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalDraws',
    header: () => (
      <NumberHeader className="@3xl:w-6">O</NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell className="@3xl:w-6">
        {row.getValue('totalDraws')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalLost',
    header: () => (
      <NumberHeader className="@3xl:w-6">F</NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell className="@3xl:w-6">
        {row.getValue('totalLost')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalGoalsScored',
    header: () => (
      <NumberHeader className="@3xl:w-6">GM</NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell className="@3xl:w-6">
        {row.getValue('totalGoalsScored')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: () => (
      <NumberHeader className="@3xl:w-6">IM</NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell className="@3xl:w-6">
        {row.getValue('totalGoalsConceded')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalGoalDifference',
    header: () => (
      <NumberHeader className="@3xl:w-6">MS</NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell className="@3xl:w-6">
        {row.getValue('totalGoalDifference')}
      </NumberCell>
    ),
  },
  {
    accessorKey: 'totalPoints',
    header: () => (
      <NumberHeader className="@3xl:w-6">P</NumberHeader>
    ),
    cell: ({ row }) => (
      <NumberCell className="@3xl:w-6">
        {row.getValue('totalPoints')}
      </NumberCell>
    ),
  },
]
