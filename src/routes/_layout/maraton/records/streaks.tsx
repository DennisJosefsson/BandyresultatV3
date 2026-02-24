import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import { CatchBoundary, createFileRoute } from '@tanstack/react-router'
import Streaks from '../-components/Records/Streaks/Streaks'
import { getStreakRecords } from '../-functions/getStreakRecords'

export const Route = createFileRoute('/_layout/maraton/records/streaks')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getStreakRecords({
      data: { women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: RouteComponent,

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
        <SimpleErrorComponent id="streaks" error={error} reset={reset} />
      )}
    >
      <Streaks />
    </CatchBoundary>
  )
}
