import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CardContent } from '@/components/ui/card'
import { CatchBoundary, createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { getTeamSeasons } from './-functions/teamSeasons'

export const Route = createFileRoute('/_layout/teams/$teamId/seasons')({
  loader: async ({ params }) => {
    const data = await getTeamSeasons({ data: params.teamId })
    if (!data) {
      throw new Error('Något gick fel.')
    }
    return data
  },
  component: RouteComponent,
  staticData: { breadcrumb: 'Säsonger' },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.meta.title,
      },
      {
        name: 'description',
        content: loaderData?.meta.description,
      },
      {
        property: 'og:description',
        content: loaderData?.meta.description,
      },
      {
        property: 'og:title',
        content: loaderData?.meta.title,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: loaderData?.meta.url,
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
})

function RouteComponent() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent id="seasons" error={error} reset={reset} />
      )}
    >
      <Seasons />
    </CatchBoundary>
  )
}

function Seasons() {
  const [open, setOpen] = useState('seasons')
  const seasons = Route.useLoaderData({ select: (data) => data.seasons })
  const rest = Route.useLoaderData({ select: (data) => data.rest })

  return (
    <CardContent className="p-1 md:p-2">
      <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
        <AccordionItem
          value="seasons"
          className="bg-background mb-2 rounded-md p-2 shadow-md"
        >
          <AccordionTrigger className="text-sm md:text-base">
            Senaste säsongerna
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
              {seasons.map((season) => {
                return (
                  <Link
                    key={season.seasonId}
                    from="/teams/$teamId/seasons"
                    to="/teams/$teamId/$seasonId"
                    params={{ seasonId: season.seasonId }}
                    search={(prev) => ({ ...prev })}
                  >
                    <div className="bg-muted dark:bg-muted/50 flex items-center justify-center rounded p-2 text-[10px] font-semibold sm:text-sm md:text-base">
                      {season.year}
                    </div>
                  </Link>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
        {rest.length > 0 ? (
          <AccordionItem
            value="rest"
            className="bg-background mb-2 rounded-md p-2 shadow-md"
          >
            <AccordionTrigger className="text-sm md:text-base">
              Övriga
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
                {rest.map((season) => {
                  return (
                    <Link
                      key={season.seasonId}
                      from="/teams/$teamId/seasons"
                      to="/teams/$teamId/$seasonId"
                      params={{ seasonId: season.seasonId }}
                      search={(prev) => ({ ...prev })}
                    >
                      <div className="bg-muted dark:bg-muted/50 flex items-center justify-center rounded p-2 text-[10px] font-semibold sm:text-sm md:text-base">
                        {season.year}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>
    </CardContent>
  )
}
