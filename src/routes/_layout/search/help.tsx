import { createFileRoute } from '@tanstack/react-router'
import SearchHelp from './-components/SearchHelp'

export const Route = createFileRoute('/_layout/search/help')({
  component: SearchHelp,
})
