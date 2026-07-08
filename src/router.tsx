import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import type { BreadcrumbValue } from './components/Header/Breadcrumb'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import { routeTree } from './routeTree.gen'
// Import the generated route tree
import DefaultErrorComponent from './components/ErrorComponents/DefaultErrorComponent'
import DefaultNotFound from './components/ErrorComponents/DefaultNotFound'

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
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
