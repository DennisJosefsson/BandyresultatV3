import Loading from '@/components/Loading/Loading'
import { createFileRoute, notFound } from '@tanstack/react-router'
import PlayoffGames from '../-components/Playoff/PlayoffGames'
import { getPlayoffGames } from '../-functions/getPlayoffGames'

export const Route = createFileRoute('/_layout/season/$year/playoff/games')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const data = await getPlayoffGames({
      data: { year: params.year, women: deps.women },
    })
    if (!data) throw new Error('Missing data')
    if (data.status === 404) {
      throw notFound({ data: data.message })
    }
    return data
  },
  component: PlayoffGames,
  pendingComponent: () => <Loading page="seasonGamesList" />,
  notFoundComponent(props) {
    if (props.data && typeof props.data === 'string') {
      return (
        <div className="mt-4 flex flex-row justify-center">
          <p>{props.data}</p>
        </div>
      )
    }
    return (
      <div className="mt-4 flex flex-row justify-center">
        <p>Något gick tyvärr fel.</p>
      </div>
    )
  },
})
