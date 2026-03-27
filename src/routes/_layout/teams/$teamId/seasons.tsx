import {
  CatchBoundary,
  Link,
  createFileRoute,
} from '@tanstack/react-router'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base/ui/accordion'
import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'

import { getTeamSeasons } from './-functions/teamSeasons'

export const Route = createFileRoute(
  '/_layout/teams/$teamId/seasons',
)({
  loader: async ({ params }) => {
    const data = await getTeamSeasons({
      data: params.teamId,
    })
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
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Lagsäsonger',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Lagsäsonger',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Lagsäsonger',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Lagsäsonger',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
          'https://www.bandyresultat.se',
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
  const data = Route.useLoaderData()
  if (data.status === 404) {
    return (
      <div className="flex flex-row justify-center mt-4">
        <span className="font-semibold text-[8px] xs:text-xs sm:text-sm xl:text-base">
          {data.message}
        </span>
      </div>
    )
  }
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent
          id="seasons"
          error={error}
          reset={reset}
        />
      )}
    >
      <Seasons />
    </CatchBoundary>
  )
}

function Seasons() {
  const data = Route.useLoaderData()
  if (data.status === 404) return null

  return (
    <div>
      <Accordion
        defaultValue={['seasons']}
        className="border"
      >
        <AccordionItem
          value="seasons"
          className="mb-2 rounded-md p-2 shadow-md border-b last:border-b-0"
        >
          <AccordionTrigger className="text-sm md:text-base">
            Senaste säsongerna
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
              {data.seasons.map((season) => {
                return (
                  <Link
                    key={season.seasonId}
                    from="/teams/$teamId/seasons"
                    to="/teams/$teamId/$seasonId"
                    params={{ seasonId: season.seasonId }}
                    search={(prev) => ({ ...prev })}
                  >
                    <div className="flex items-center justify-center rounded p-2 text-[10px] font-semibold sm:text-sm md:text-base">
                      {season.year}
                    </div>
                  </Link>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
        {data.rest.length > 0 ? (
          <AccordionItem
            value="rest"
            className="mb-2 rounded-md p-2 shadow-md border-b last:border-b-0"
          >
            <AccordionTrigger className="text-sm md:text-base">
              Övriga
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
                {data.rest.map((season) => {
                  return (
                    <Link
                      key={season.seasonId}
                      from="/teams/$teamId/seasons"
                      to="/teams/$teamId/$seasonId"
                      params={{ seasonId: season.seasonId }}
                      search={(prev) => ({ ...prev })}
                    >
                      <div className="flex items-center justify-center rounded p-2 text-[10px] font-semibold sm:text-sm md:text-base">
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
    </div>
  )
}
