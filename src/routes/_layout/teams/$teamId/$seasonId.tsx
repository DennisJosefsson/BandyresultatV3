import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { zd } from '@/lib/utils/zod'
import { CatchBoundary, createFileRoute } from '@tanstack/react-router'

import SingleTeamSeason from './-components/SeasonComponents/SingleTeamSeason'
import { getSingleTeamSeason } from './-functions/getSingleTeamSeason'

export const Route = createFileRoute('/_layout/teams/$teamId/$seasonId')({
  params: {
    parse: (params) => ({
      seasonId: zd.number().int().parse(Number(params.seasonId)),
    }),
    stringify: ({ seasonId }) => ({ seasonId: `${seasonId}` }),
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
  staticData: { breadcrumb: (match) => match.loaderData.seasonYear },
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
        <SimpleErrorComponent id="season" error={error} reset={reset} />
      )}
    >
      <Season />
    </CatchBoundary>
  )
}

function Season() {
  return (
    <div>
      <CatchBoundary
        getResetKey={() => 'reset'}
        onCatch={(error) => {
          console.error(error)
        }}
        errorComponent={({ error, reset }) => (
          <SimpleErrorComponent id="singleteam" error={error} reset={reset} />
        )}
      >
        <div className="font-inter text-foreground mt-2 flex min-h-screen w-full flex-col">
          <SingleTeamSeason />
        </div>
      </CatchBoundary>
    </div>
  )
}
