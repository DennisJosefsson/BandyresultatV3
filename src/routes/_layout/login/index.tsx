import { SignIn } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-row items-center justify-center">
      <SignIn />
    </div>
  )
}
