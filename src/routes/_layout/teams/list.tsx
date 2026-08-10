import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import { createFileRoute } from '@tanstack/react-router'
import TeamsList from './-components/TeamsList/TeamsList'
import { getTeams } from './-functions/getTeams'

export const Route = createFileRoute('/_layout/teams/list')(
  {
    loaderDeps: ({ search: { women } }) => ({ women }),
    loader: async ({ deps }) => {
      const data = await getTeams({ data: deps.women })
      if (!data) throw new Error('Missing teams data')

      return data
    },
    staticData: { breadcrumb: 'Laglista' },
    component: Teams,
    pendingComponent: () => <Loading page="teamsList" />,
    head: () => ({
      meta: [
        {
          title: 'Bandyresultat - Laglista',
        },
        {
          name: 'description',
          content:
            'Bandyresultat - Lista över svenska bandylag',
        },
        {
          property: 'og:description',
          content:
            'Bandyresultat - Lista över svenska bandylag',
        },
        {
          property: 'og:title',
          content: 'Bandyresultat - Laglista',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: 'https://bandyresultat.se/teams',
        },
        {
          property: 'og:image',
          content:
            'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
        },
      ],
    }),
  },
)

function Teams() {
  return (
    <CustomCatchBoundary id="teamslist">
      <TeamsList />
    </CustomCatchBoundary>
  )
}
