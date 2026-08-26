import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import type { NotFoundRouteProps } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import SeasonsList from './-components/SeasonsList'
import SeasonsPagination from './-components/SeasonsPagination'
import { getPaginatedSeasons } from './-functions/getPaginatedSeasons'
import { getSeasonsCount } from './-functions/getSeasonsCount'

export const Route = createFileRoute('/_layout/seasons/')({
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Säsonger',
      },
      {
        name: 'description',
        content: 'Lista över bandysäsonger.',
      },
      {
        property: 'og:description',
        content: 'Lista över bandysäsonger.',
      },
      {
        property: 'og:title',
        content: 'Bandyresultat - Säsonger',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://www.bandyresultat.se/seasons',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),

  loaderDeps: ({ search: { page, women } }) => ({
    page,
    women,
  }),
  loader: async ({ deps }) => {
    const data = getPaginatedSeasons({
      data: { page: deps.page, women: deps.women },
    })
    const count = await getSeasonsCount({
      data: { women: deps.women },
    })
    if (!data || !count)
      throw new Error('Missing seasons data')
    return { count, data }
  },
  component: Seasons,
  notFoundComponent(props) {
    return <NotFound props={props} />
  },
})

function Seasons() {
  return (
    <div className="font-inter text-foreground mx-auto mb-2 min-h-screen w-full px-1">
      <div>
        <CustomCatchBoundary id="Säsongslista">
          <SeasonsPagination />
          <div className="self-center">
            <SeasonsList />
          </div>
          <div className="sm:hidden">
            <SeasonsPagination />
          </div>
        </CustomCatchBoundary>
      </div>
    </div>
  )
}

function NotFound({
  props,
}: {
  props: NotFoundRouteProps
}) {
  const errorString =
    props.data && typeof props.data === 'string'
      ? props.data
      : 'Du blev omdirigerad hit för att föregående länk inte finns.'
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-center">
        <span className="text-xs sm:text-sm font-semibold">
          {errorString}
        </span>
      </div>
      <Seasons />
    </div>
  )
}
