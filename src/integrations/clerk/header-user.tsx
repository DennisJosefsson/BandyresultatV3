import { Button } from '@/components/ui/button'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'
import { User } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

export default function HeaderUser() {
  const matches = useMediaQuery('(min-width: 430px)')
  return (
    <div>
      <SignedIn>
        <Button variant="outline" size={matches ? 'icon' : 'smallicon'}>
          <UserButton fallback={<User className="h-[1.2rem] w-[1.2rem]" />} />
        </Button>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" oauthFlow="popup">
          <Button variant="outline" size={matches ? 'icon' : 'smallicon'}>
            <User className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  )
}
