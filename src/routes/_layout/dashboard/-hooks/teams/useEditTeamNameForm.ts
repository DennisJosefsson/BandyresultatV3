import { editTeamNameObject } from '@/lib/types/team'
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
import { editTeamName } from '../../-functions/TeamFunctions/editTeamName'

type Data = Awaited<ReturnType<typeof editTeamName>>

const route = getRouteApi(
  '/_layout/dashboard/teamnames/$teamnameId',
)

type TeamName = {
  name: string
  logoId: number | null
  teamnameId: number
  casualName: string
  shortName: string
}

export const useEditTeamNameForm = (teamName: TeamName) => {
  const router = useRouter()
  const navigate = route.useNavigate()
  const women = route.useSearch({ select: (s) => s.women })

  const mutation = useMutation({
    mutationFn: editTeamName,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })
  const defaultValues: zd.input<typeof editTeamNameObject> =
    {
      ...teamName,
      logoId:
        teamName.logoId === undefined ||
        teamName.logoId === null
          ? 0
          : teamName.logoId,
    }
  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: editTeamNameObject,
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
