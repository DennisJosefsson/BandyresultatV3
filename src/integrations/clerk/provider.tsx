import { ClerkProvider } from '@clerk/clerk-react'
import { svSE } from '@clerk/localizations'
import { dark, shadcn } from '@clerk/themes'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
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
