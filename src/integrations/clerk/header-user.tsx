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
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="outline" size={matches ? 'icon' : 'smallicon'}>
            <User />
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  )
}
