import { editTeamObject } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { editTeam } from '../-functions/TeamFunctions/editTeam'

type Data = Awaited<ReturnType<typeof editTeam>>

const route = getRouteApi('/_layout/dashboard/team/$teamId')

export const useEditTeamForm = () => {
  const team = route.useLoaderData({ select: (s) => s.team.team })
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: editTeam,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })
  const defaultValues: zd.input<typeof editTeamObject> = {
    teamId: team.teamId,
    name: team.name,
    city: team.city,
    casualName: team.casualName,
    shortName: team.shortName,
    women: team.women,
    lat: team.lat,
    long: team.long,
    countyId: team.countyId,
    municipalityId: team.municipalityId ?? 0,
  }
  const form = useForm({
    defaultValues,
    validators: {
      onBlur: editTeamObject,
      onChange: editTeamObject,
      onSubmit: editTeamObject,
    },
    onSubmit: ({ value }) => mutation.mutateAsync({ data: value }),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
      router.invalidate({
        filter: (route) => route.routeId === '/_layout/dashboard/teams/',
      })
    }
  }

  const onMutationError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel')
    }
  }

  return form
}
