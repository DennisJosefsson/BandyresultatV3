import DefaultNotFound from '@/components/ErrorComponents/DefaultNotFound'
import Header from '@/components/Header/Header'
import { TooltipProvider } from '@/components/base/ui/tooltip'
import { CookieProvider } from '@/lib/contexts/cookieContext'
import { ThemeProvider } from '@/lib/contexts/themeContext'
import { getFavTeamsServerFn } from '@/lib/cookieFunctions/favTeams'
import { getSortGamesServerFn } from '@/lib/cookieFunctions/sortGames'
import { getSortPlayedGamesServerFn } from '@/lib/cookieFunctions/sortPlayedGames'
import { getSortPlayoffGamesServerFn } from '@/lib/cookieFunctions/sortPlayoffGames'
import { getSortUnplayedGamesServerFn } from '@/lib/cookieFunctions/sortUnplayedGames'
import { getThemeServerFn } from '@/lib/cookieFunctions/theme'
import type { QueryClient } from '@tanstack/react-query'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  retainSearchParams,
} from '@tanstack/react-router'
import { z } from 'zod'
import ClerkProvider from '../integrations/clerk/provider'
import appCss from '../styles.css?url'

interface MyRouterContext {
  queryClient: QueryClient
  sidebarSection:
    | 'seasons'
    | 'year'
    | 'teams'
    | 'singleTeam'
    | 'search'
    | 'dashboard'
    | 'about'
    | 'maraton'
    | undefined
}

const searchWomen = z.object({
  women: z.boolean().catch(false),
})

export const Route =
  createRootRouteWithContext<MyRouterContext>()({
    staticData: {
      breadcrumb: 'Bandyresultat',
    },
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
          content:
            'Samlade bandyresultat, från 1907 och framåt.',
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
    validateSearch: searchWomen,
    search: {
      middlewares: [retainSearchParams(['women'])],
    },
    loader: async () => {
      const favTeams = await getFavTeamsServerFn()
      const sortGames = await getSortGamesServerFn()
      const sortPlayoffGames =
        await getSortPlayoffGamesServerFn()
      const sortPlayedGames =
        await getSortPlayedGamesServerFn()
      const sortUnplayedGames =
        await getSortUnplayedGamesServerFn()
      const theme = await getThemeServerFn()
      return {
        favTeams,
        theme,
        sortGames,
        sortPlayoffGames,
        sortPlayedGames,
        sortUnplayedGames,
      }
    },
    notFoundComponent: DefaultNotFound,
    errorComponent: ErrorComponent,
    shellComponent: RootDocument,
  })

function RootDocument() {
  const {
    favTeams,
    theme,
    sortGames,
    sortPlayoffGames,
    sortPlayedGames,
    sortUnplayedGames,
  } = Route.useLoaderData()

  return (
    <html
      className={theme}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body>
        <ClerkProvider>
          <ThemeProvider theme={theme}>
            <CookieProvider
              favTeams={favTeams}
              sortGames={sortGames}
              sortPlayoffGames={sortPlayoffGames}
              sortPlayedGames={sortPlayedGames}
              sortUnplayedGames={sortUnplayedGames}
            >
              <TooltipProvider>
                <Outlet />
              </TooltipProvider>
            </CookieProvider>
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
      <div className="mt-10 flex flex-row items-center justify-center">
        <p>
          Något gick tyvärr fel,tillbaka till{' '}
          <Link
            to="/"
            search={{ women: false }}
            className="underline"
          >
            förstasidan
          </Link>
          .
        </p>
      </div>
    </>
  )
}
