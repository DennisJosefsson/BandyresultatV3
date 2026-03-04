import { createFileRoute } from '@tanstack/react-router'

import { zd } from '@/lib/utils/zod'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId')({
  params: {
    parse: (params) => ({
      seasonId: zd.number().int().parse(Number(params.seasonId)),
    }),
    stringify: ({ seasonId }) => ({ seasonId: `${seasonId}` }),
  },
})
