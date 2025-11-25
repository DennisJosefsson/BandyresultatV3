import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Header from '@/components/Header/Header'
import { CatchBoundary, createFileRoute, Outlet } from '@tanstack/react-router'
export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col bg-background text-foreground w-full">
      <Header />

      <div className="w-full">
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
      </div>
    </div>
  )
}
