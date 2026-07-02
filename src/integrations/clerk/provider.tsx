import { clientEnv } from '@/lib/env/clientEnv'
import { svSE } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/react'
import { dark, shadcn } from '@clerk/ui/themes'

const PUBLISHABLE_KEY = clientEnv.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error(
    'Add your Clerk Publishable Key to the .env.local file',
  )
}

export default function AppClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        cssLayerName: 'clerk',
        theme: [dark, shadcn],
        elements: {
          userButtonAvatarBox: {
            width: '1.125rem',
            height: '1.125rem',
          },
        },
      }}
      localization={svSE}
    >
      {children}
    </ClerkProvider>
  )
}
