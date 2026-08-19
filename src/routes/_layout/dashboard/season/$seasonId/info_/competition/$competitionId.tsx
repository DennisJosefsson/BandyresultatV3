import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId',
)({
  params: {
    parse: (params) => ({
      competitionId: zd
        .number()
        .int()
        .parse(Number(params.competitionId)),
    }),
    stringify: ({ competitionId }) => ({
      competitionId: `${competitionId}`,
    }),
  },
})
