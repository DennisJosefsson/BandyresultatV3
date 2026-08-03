import { createFileRoute } from '@tanstack/react-router'
import { zd } from '@/lib/utils/zod'

export const Route = createFileRoute('/_layout/seasons')({
  beforeLoad: () => {
    return { sidebarSection: 'seasons' }
  },
  validateSearch: zd.object({
    page: zd.number().positive().optional().catch(1),
  }),
  staticData: { breadcrumb: 'Säsonger' },
})
