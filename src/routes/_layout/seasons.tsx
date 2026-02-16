import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/seasons')({
  staticData: { breadcrumb: 'Säsonger' },
})
