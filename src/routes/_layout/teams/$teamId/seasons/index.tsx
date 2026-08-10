import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base/ui/accordion'
import { createFileRoute } from '@tanstack/react-router'
import { getTeamSeasons } from '../-functions/teamSeasons'

export const Route = createFileRoute(
  '/_layout/teams/$teamId/seasons/',
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
      <div className="mt-4 flex flex-row justify-center">
        <span className="xs:text-xs text-[8px] font-semibold sm:text-sm xl:text-base">
          {data.message}
        </span>
      </div>
    )
  }
  return (
    <CustomCatchBoundary id="teamseasons">
      <Seasons />
    </CustomCatchBoundary>
  )
}

function Seasons() {
  const data = Route.useLoaderData()
  if (data.status === 404) return null

  return (
    <div className="mt-2 sm:mt-4">
      <Accordion
        defaultValue={['seasons']}
        className="border"
      >
        <AccordionItem
          value="seasons"
          className="mb-2 rounded-md border-b p-2 last:border-b-0"
        >
          <AccordionTrigger className="text-[10px] sm:text-xs md:text-sm">
            Senaste säsongerna
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
              {data.seasons.map((season) => {
                return (
                  <Route.Link
                    key={season.seasonId}
                    to="/teams/$teamId/seasons/$seasonId"
                    params={{ seasonId: season.seasonId }}
                    search={(prev) => ({ ...prev })}
                  >
                    <div className="flex items-center justify-center rounded p-2 text-[10px] font-semibold sm:text-xs md:text-sm">
                      {season.year}
                    </div>
                  </Route.Link>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
        {data.rest.length > 0 ? (
          <AccordionItem
            value="rest"
            className="mb-2 rounded-md border-b p-2 last:border-b-0"
          >
            <AccordionTrigger className="text-[10px] sm:text-xs md:text-sm">
              Övriga
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
                {data.rest.map((season) => {
                  return (
                    <Route.Link
                      key={season.seasonId}
                      to="/teams/$teamId/seasons/$seasonId"
                      params={{ seasonId: season.seasonId }}
                      search={(prev) => ({ ...prev })}
                    >
                      <div className="flex items-center justify-center rounded p-2 text-[10px] font-semibold sm:text-xs md:text-sm">
                        {season.year}
                      </div>
                    </Route.Link>
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
