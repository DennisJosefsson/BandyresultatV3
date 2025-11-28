import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: App,
})

function App() {
  return (
    <div className="mx-auto mb-2 flex h-100 flex-col gap-2 font-inter">
      <div className="min-w-[9/10] m-2 xl:mx-10 2xl:mx-16 py-4 px-12 rounded-md bg-muted border-dashed border-primary border-2">
        <div className="flex flex-col gap-1 lg:flex-row md:gap-4">
          <div>
            <p className="text-primary text-[10px] md:text-sm mb-2 font-semibold">
              2025-08-18: Lagt in spelschema för Elitserien och Bandyallsvenskan
              Herr.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col my-10 md:my-20 xl:mx-10 2xl:mx-16 ">
        <div className="mb-3 md:mb-6">
          <h1 className="pl-2 text-base font-bold text-primary sm:text-2xl lg:text-4xl">
            Ett stycke bandyhistoria
          </h1>
        </div>
        <div className="w-[280px] pl-2 md:w-[500px] lg:w-full">
          <h2 className="mb-4 text-sm text-primary font-bold sm:text-base lg:text-2xl">
            Samlade resultat från de högsta serierna - 1907 och framåt
          </h2>
        </div>
      </div>
    </div>
  )
}
