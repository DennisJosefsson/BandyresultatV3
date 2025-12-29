import Loading from '@/components/Loading/Loading'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { SeasonGames } from '../-components/SeasonGames'
import { getGames } from '../-functions/getGames'

export const Route = createFileRoute('/_layout/season/$year/$group/games')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    if (!params.group) throw notFound()
    const data = await getGames({
      data: { group: params.group, year: params.year, women: deps.women },
    })
    if (data.status === 404) {
      throw notFound({ data: data.message })
    }
    return data
  },
  component: SeasonGames,
  pendingComponent: () => <Loading page="seasonGamesList" />,
  notFoundComponent(props) {
    if (
      typeof props === 'object' &&
      props.data &&
      typeof props.data === 'string'
    ) {
      return (
        <div className="mt-2 flex flex-row justify-center">
          <p>{props.data}</p>
        </div>
      )
    }
    return (
      <div className="mt-2 flex flex-row justify-center">
        <p>Något gick fel.</p>
      </div>
    )
  },
})
