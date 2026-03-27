import {
  CatchBoundary,
  createFileRoute,
} from '@tanstack/react-router'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { zd } from '@/lib/utils/zod'

import SingleTeamSeason from './-components/SeasonComponents/SingleTeamSeason'
import { getSingleTeamSeason } from './-functions/getSingleTeamSeason'

export const Route = createFileRoute(
  '/_layout/teams/$teamId/$seasonId',
)({
  params: {
    parse: (params) => ({
      seasonId: zd
        .number()
        .int()
        .parse(Number(params.seasonId)),
    }),
    stringify: ({ seasonId }) => ({
      seasonId: `${seasonId}`,
    }),
  },
  loader: async ({ params: { teamId, seasonId } }) => {
    const data = await getSingleTeamSeason({
      data: { teamId: teamId, seasonId },
    })
    if (!data) {
      throw new Error('Något gick fel.')
    }

    return data
  },
  component: RouteComponent,
  staticData: {
    breadcrumb: (match) =>
      match.loaderData.seasonYear ?? 'Säsong',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Lagsäsong',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Lagsäsong',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Lagsäsong',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Lagsäsong',
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
          id="singleTeamSeason"
          error={error}
          reset={reset}
        />
      )}
    >
      <SingleTeamSeason />
    </CatchBoundary>
  )
}
