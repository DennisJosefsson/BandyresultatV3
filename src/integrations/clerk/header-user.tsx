import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react'
import { User } from 'lucide-react'

import { Button } from '@/components/base/ui/button'

export default function HeaderUser() {
  return (
    <div>
      <SignedIn>
        <Button
          variant="outline"
          size="responsive"
          render={
            <UserButton
              fallback={
                <User className="h-[1.2rem] w-[1.2rem]" />
              }
            />
          }
        ></Button>
      </SignedIn>
      <SignedOut>
        <SignInButton
          mode="modal"
          oauthFlow="popup"
        >
          <Button
            variant="outline"
            size="responsive"
          >
            <User className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  )
}
