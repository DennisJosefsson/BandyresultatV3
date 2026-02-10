import { createFileRoute } from '@tanstack/react-router'
import MaratonHelp from '../-components/Help/MaratonHelp'

export const Route = createFileRoute('/_layout/maraton/help/')({
  component: MaratonHelp,
})
