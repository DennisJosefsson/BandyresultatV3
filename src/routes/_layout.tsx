import AppSidebar from '@/components/Common/Sidebar/AppSidebar'
import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Header from '@/components/Header/Header'
import { Card } from '@/components/ui/card'
// import Header from '@/components/Header/Header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { CatchBoundary, createFileRoute, Outlet } from '@tanstack/react-router'
export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-background text-foreground flex w-full flex-col">
          <Header />

          <Card className="m-2 p-2">
            <CatchBoundary
              getResetKey={() => 'reset'}
              onCatch={(error) => {
                console.error(error)
              }}
              errorComponent={({ error, reset }) => (
                <SimpleErrorComponent id="layout" error={error} reset={reset} />
              )}
            >
              <Outlet />
            </CatchBoundary>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
