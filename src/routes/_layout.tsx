import AppSidebar from '@/components/Common/Sidebar/AppSidebar'
import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Header from '@/components/Header/Header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/base/ui/sidebar'
import { Toaster } from '@/components/base/ui/sonner'
import {
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'
export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="font-sans font-medium [--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="size-full lg:peer-data-[state=collapsed]:max-w-[calc(100vw-var(--sidebar-width-icon))] lg:peer-data-[state=expanded]:max-w-[calc(100vw-var(--sidebar-width))]">
            <div className="bg-main-background mx-0 min-h-screen p-0.5 sm:p-1 md:ml-2 lg:p-2">
              <CustomCatchBoundary id={Route.id}>
                <div>
                  <Outlet />
                </div>
              </CustomCatchBoundary>
              <Toaster richColors />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
