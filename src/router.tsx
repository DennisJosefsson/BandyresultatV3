import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import DefaultNotFound from './components/ErrorComponents/DefaultNotFound'
import type { BreadcrumbValue } from './components/Header/Breadcrumb'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import { routeTree } from './routeTree.gen'
// Import the generated route tree
import DefaultErrorComponent from './components/ErrorComponents/DefaultErrorComponent'
import { logError } from './lib/middlewares/errors/logError'

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: { ...rqContext, sidebarSection: undefined },
    defaultPreload: false,
    scrollRestoration: (opts) => {
      if (opts.location.pathname.includes('/search'))
        return false
      return true
    },
    scrollRestorationBehavior: 'smooth',
    defaultNotFoundComponent: DefaultNotFound,
    defaultErrorComponent: (errorProps) => (
      <DefaultErrorComponent {...errorProps} />
    ),
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <TanstackQuery.Provider {...rqContext}>
          {props.children}
        </TanstackQuery.Provider>
      )
    },
    defaultOnCatch: async (error, errorInfo) => {
      console.log('LOGGAR')
      const errorData = {
        name: error.name,
        message: error.message,
        origin: errorInfo.componentStack ?? 'Ingen stack',
        date: new Date().toISOString(),
        backend: false,
      }
      const insertedError = await logError({
        data: errorData,
      })
      if (!insertedError) {
        console.log('Något gick fel vid felloggning')
      }
      console.log(insertedError?.message)
    },
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    breadcrumb?: BreadcrumbValue
  }
  interface HistoryState {
    origin?: string
    redirectCause?: string
  }
}
