import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { createRouter } from '@tanstack/react-router'
import type { BreadcrumbValue } from './components/Header/Breadcrumb'
import { routeTree } from './routeTree.gen'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
// Import the generated route tree
import DefaultNotFound from './components/ErrorComponents/DefaultNotFound'

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: false,
    scrollRestoration: true,
    scrollRestorationBehavior: 'smooth',
    defaultNotFoundComponent: DefaultNotFound,
    Wrap: (props: { children: React.ReactNode }) => {
      return <TanstackQuery.Provider {...rqContext}>{props.children}</TanstackQuery.Provider>
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
