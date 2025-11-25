import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  retainSearchParams,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import ClerkProvider from '../integrations/clerk/provider'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import DefaultNotFound from '@/components/ErrorComponents/DefaultNotFound'
import Header from '@/components/Header/Header'
import { FavTeamsProvider } from '@/lib/contexts/favTeamsContext'
import { ThemeProvider } from '@/lib/contexts/themeContext'
import { getFavTeamsServerFn } from '@/lib/favTeams'
import { getThemeServerFn } from '@/lib/theme'
import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

const searchWomen = z.object({ women: z.boolean().catch(false) })

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Bandyresultat',
      },
      {
        name: 'description',
        content: 'Samlade bandyresultat, från 1907 och framåt.',
      },
      {
        property: 'og:title',
        content: 'Bandyresultat',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://www.bandyresultat.se/',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    ],
  }),
  validateSearch: zodValidator(searchWomen),
  search: {
    middlewares: [retainSearchParams(['women'])],
  },
  loader: async () => {
    const favTeams = await getFavTeamsServerFn()
    const theme = await getThemeServerFn()
    return { favTeams, theme }
  },
  notFoundComponent: DefaultNotFound,
  errorComponent: ErrorComponent,
  shellComponent: RootDocument,
})

function RootDocument() {
  const { favTeams, theme } = Route.useLoaderData()
  return (
    <html className={theme} lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ClerkProvider>
          <ThemeProvider theme={theme}>
            <FavTeamsProvider favTeams={favTeams}>
              <Outlet />
              <TanStackDevtools
                config={{
                  position: 'bottom-right',
                }}
                plugins={[
                  {
                    name: 'Tanstack Router',
                    render: <TanStackRouterDevtoolsPanel />,
                  },
                  TanStackQueryDevtools,
                ]}
              />
            </FavTeamsProvider>
          </ThemeProvider>
        </ClerkProvider>

        <Scripts />
      </body>
    </html>
  )
}

function ErrorComponent() {
  return (
    <>
      <Header />
      <div className="flex flex-row justify-center items-center mt-10">
        <p>
          Något gick tyvärr fel,tillbaka till{' '}
          <Link to="/" search={{ women: false }} className="underline">
            förstasidan
          </Link>
          .
        </p>
      </div>
    </>
  )
}
