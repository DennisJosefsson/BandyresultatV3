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
  editTeamSeasonTeamName,
  teamSeasonTeamNameObject,
} from '../../-functions/TeamFunctions/editTeamSeasonTeamName'

type Data = Awaited<
  ReturnType<typeof editTeamSeasonTeamName>
>

const route = getRouteApi(
  '/_layout/dashboard/team/$teamId/teamseasons',
)

export const useTeamSeasonTeamNameForm = () => {
  const teamId = route.useParams({
    select: (s) => s.teamId,
  })
  const teamSeasonArray = route.useLoaderData()
  const router = useRouter()
  const navigate = route.useNavigate()
  const women = route.useSearch({ select: (s) => s.women })

  const mutation = useMutation({
    mutationFn: editTeamSeasonTeamName,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })
  const defaultValues: zd.input<
    typeof teamSeasonTeamNameObject
  > = {
    teamId: teamId,
    firstSeason: teamSeasonArray.at(0)?.intYear ?? 1,
    lastSeason: teamSeasonArray.at(-1)?.intYear ?? 9999,
    teamnameId: 0,
  }
  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: teamSeasonTeamNameObject,
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
