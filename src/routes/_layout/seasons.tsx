import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'
import { parsePage } from './seasons/-functions/getPaginatedSeasons'

export const Route = createFileRoute('/_layout/seasons')({
  validateSearch: zd.object({ page: parsePage }),
  staticData: { breadcrumb: 'Säsonger' },
})
