import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { createRouter } from '@tanstack/react-router'
import type { BreadcrumbValue } from './components/Header/Breadcrumb'
import { routeTree } from './routeTree.gen'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import DefaultNotFound from './components/ErrorComponents/DefaultNotFound'
// Import the generated route tree
import DefaultErrorComponent from './components/ErrorComponents/DefaultErrorComponent'

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: { ...rqContext, sidebarSection: undefined },
    defaultPreload: false,
    scrollRestoration: (opts) => {
      if (opts.location.pathname.includes('/search')) return false
      return true
    },
    scrollRestorationBehavior: 'smooth',
    defaultNotFoundComponent: DefaultNotFound,
    defaultErrorComponent: (errorProps) => <DefaultErrorComponent {...errorProps} />,
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
