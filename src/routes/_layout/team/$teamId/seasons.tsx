import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CardContent } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { getTeamSeasons } from '../-functions/teamSeasons'

export const Route = createFileRoute('/_layout/team/$teamId/seasons')({
  loader: async ({ params }) => {
    const data = await getTeamSeasons({ data: params.teamId })
    if (!data) {
      throw new Error('Något gick fel.')
    }
    return data
  },
  component: Seasons,
})

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
                    from="/team/$teamId/seasons"
                    to="/team/$teamId/$seasonId"
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
                      from="/team/$teamId/seasons"
                      to="/team/$teamId/$seasonId"
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
