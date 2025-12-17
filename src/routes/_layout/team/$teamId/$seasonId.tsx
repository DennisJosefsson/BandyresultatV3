import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { zd } from '@/lib/utils/zod'
import { CatchBoundary, createFileRoute } from '@tanstack/react-router'

import SingleTeamSeason from '../-components/SeasonComponents/SingleTeamSeason'
import { getSingleTeamSeason } from '../-functions/getSingleTeamSeason'

export const Route = createFileRoute('/_layout/team/$teamId/$seasonId')({
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
  component: Season,
})

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
