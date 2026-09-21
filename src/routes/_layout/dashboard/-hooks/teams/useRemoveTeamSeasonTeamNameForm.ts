import type { zd } from '@/lib/utils/zod'
import {
  revalidateLogic,
  useForm,
} from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import {
  getRouteApi,
  useRouter,
} from '@tanstack/react-router'
import { toast } from 'sonner'

import {
  removeTeamSeasonTeamName,
  removeTeamSeasonTeamNameObject,
} from '../../-functions/TeamFunctions/removeTeamSeasonTeamName'

type Data = Awaited<
  ReturnType<typeof removeTeamSeasonTeamName>
>

const route = getRouteApi(
  '/_layout/dashboard/team/$teamId/remove',
)

export const useRemoveTeamSeasonTeamNameForm = () => {
  const teamId = route.useParams({
    select: (s) => s.teamId,
  })
  const teamSeasonArray = route.useLoaderData()
  const router = useRouter()
  const navigate = route.useNavigate()
  const women = route.useSearch({ select: (s) => s.women })

  const mutation = useMutation({
    mutationFn: removeTeamSeasonTeamName,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })
  const defaultValues: zd.input<
    typeof removeTeamSeasonTeamNameObject
  > = {
    teamId: teamId,
    firstSeason: teamSeasonArray.at(0)?.intYear ?? 1,
    lastSeason: teamSeasonArray.at(-1)?.intYear ?? 9999,
  }
  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: removeTeamSeasonTeamNameObject,
    },
    onSubmit: ({ value }) =>
      mutation.mutateAsync({ data: value }),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
      router.invalidate({
        filter: (r) =>
          r.routeId === '/_layout/dashboard/teams/',
      })
      navigate({
        to: '/dashboard/teams',
        search: { women },
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
