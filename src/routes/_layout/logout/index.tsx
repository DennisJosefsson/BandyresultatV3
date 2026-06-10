import { createFileRoute } from '@tanstack/react-router'
import { SignOutButton } from '@clerk/react'
import { Button } from '@/components/base/ui/button'

export const Route = createFileRoute('/_layout/logout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mt-20 flex flex-row items-center justify-center">
      <SignOutButton>
        <Button variant="outline">
          <span className="text-base font-semibold">Logga ut</span>
        </Button>
      </SignOutButton>
    </div>
  )
}
