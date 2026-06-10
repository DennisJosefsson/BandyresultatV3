import { User } from 'lucide-react'
import { Show, SignInButton, UserButton } from '@clerk/react'
import { Button } from '@/components/base/ui/button'

export default function HeaderUser() {
  return (
    <div>
      <Show when="signed-in">
        <Button
          variant="outline"
          size="responsive"
          render={<UserButton fallback={<User className="h-[1.2rem] w-[1.2rem]" />} />}
        ></Button>
      </Show>
      <Show when="signed-out">
        <SignInButton mode="modal" oauthFlow="popup">
          <Button variant="outline" size="responsive">
            <User className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </SignInButton>
      </Show>
    </div>
  )
}
