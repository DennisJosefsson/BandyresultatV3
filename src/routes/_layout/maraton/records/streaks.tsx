import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import {
  CatchBoundary,
  createFileRoute,
} from '@tanstack/react-router'
import Streaks from '../-components/Records/Streaks/Streaks'
import { getStreakMeta } from '../-functions/getStreakMeta'
import { getStreakRecords } from '../-functions/getStreakRecords'

export const Route = createFileRoute(
  '/_layout/maraton/records/streaks',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const streakMeta = await getStreakMeta({
      data: { women: deps.women },
    })
    const data = getStreakRecords({
      data: { women: deps.women },
    })
    if (!data || !streakMeta)
      throw new Error('Missing data')

    return { data, streakMeta }
  },
  component: RouteComponent,

  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Sviter',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.streakMeta.meta.title ??
          'Bandyresultat - Rekord: Sviter',
      },
      {
        name: 'description',
        content:
          loaderData?.streakMeta.meta.description ??
          'Bandyresultat - Rekord: Sviter',
      },
      {
        property: 'og:description',
        content:
          loaderData?.streakMeta.meta.description ??
          'Bandyresultat - Rekord: Sviter',
      },
      {
        property: 'og:title',
        content:
          loaderData?.streakMeta.meta.title ??
          'Bandyresultat - Rekord: Sviter',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.streakMeta.meta.url ??
          'https://www.bandyresultat.se/maraton/records/streaks',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  pendingComponent: () => <Loading page="streaks" />,
})

function RouteComponent() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent
          id="streaks"
          error={error}
          reset={reset}
        />
      )}
    >
      <Streaks />
    </CatchBoundary>
  )
}
