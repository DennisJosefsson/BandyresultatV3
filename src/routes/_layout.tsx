import AppSidebar from '@/components/Common/Sidebar/AppSidebar'
import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Header from '@/components/Header/Header'
import { Card } from '@/components/ui/card'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { CatchBoundary, createFileRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from 'sonner'
export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="px-2">
              <Card className="min-h-screen">
                <CatchBoundary
                  getResetKey={() => 'reset'}
                  onCatch={(error) => {
                    console.error(error)
                  }}
                  errorComponent={({ error, reset }) => (
                    <SimpleErrorComponent
                      id="layout"
                      error={error}
                      reset={reset}
                    />
                  )}
                >
                  <div className="m-2">
                    <Outlet />
                  </div>
                </CatchBoundary>
                <Toaster richColors />
              </Card>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
