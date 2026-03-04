import { createFileRoute } from '@tanstack/react-router'

import { zd } from '@/lib/utils/zod'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId',
)({
  params: {
    parse: (params) => ({
      serieId: zd.number().int().parse(Number(params.serieId)),
    }),
    stringify: ({ serieId }) => ({ serieId: `${serieId}` }),
  },
})
