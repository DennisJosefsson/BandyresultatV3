import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import { zd } from '@/lib/utils/zod'
import {
  CatchBoundary,
  createFileRoute,
  Link,
  Outlet,
} from '@tanstack/react-router'
import TeamHeader from './$teamId/-components/TeamHeader'
import { getSingleTeam } from './$teamId/-functions/getSingleTeam'

export const Route = createFileRoute('/_layout/teams/$teamId')({
  params: {
    parse: (params) => ({
      teamId: zd.number().int().parse(Number(params.teamId)),
    }),
    stringify: ({ teamId }) => ({ teamId: `${teamId}` }),
  },
  loader: async ({ params }) => {
    const team = await getSingleTeam({ data: params.teamId })

    if (!team) throw new Error('Något oväntat gick fel.')
    return team
  },
  component: SingleTeam,
  pendingComponent: () => <Loading page="singleTeam" />,
  notFoundComponent: NotFound,
  staticData: {
    breadcrumb: (match) => match.loaderData.breadCrumb,
  },
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

function SingleTeam() {
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
        <div className="font-inter text-foreground mt-2 flex min-h-screen flex-col">
          <TeamHeader />
          <Outlet />
        </div>
      </CatchBoundary>
    </div>
  )
}

function NotFound() {
  return (
    <div className="mt-2 flex flex-row justify-center">
      <p>
        Finns tyvärr inget sådant lag, men det finns en{' '}
        <Link to="/teams" search={{ women: false }} className="underline">
          lista
        </Link>{' '}
        och man kan också söka via{' '}
        <Link to="/teams/map" search={{ women: false }} className="underline">
          karta
        </Link>
        .
      </p>
    </div>
  )
}
