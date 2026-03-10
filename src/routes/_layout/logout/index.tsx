import { Button } from '@/components/base/ui/button'
import { SignOutButton } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/logout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-row items-center justify-center mt-20">
      <SignOutButton>
        <Button variant="outline">
          <span className="text-base font-semibold">
            Logga ut
          </span>
        </Button>
      </SignOutButton>
    </div>
  )
}
