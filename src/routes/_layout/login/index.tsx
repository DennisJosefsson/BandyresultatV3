import { SignIn } from '@clerk/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/login/')({
  staticData: { breadcrumb: 'Inloggning' },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mt-20 flex flex-row items-center justify-center">
      <div className="flex flex-col gap-4">
        <SignIn oauthFlow="popup" />
      </div>
    </div>
  )
}
