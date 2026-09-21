import { addTeamNameObject } from '@/lib/types/team'
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
import { addTeamName } from '../../-functions/TeamFunctions/addTeamName'

type Data = Awaited<ReturnType<typeof addTeamName>>

const route = getRouteApi(
  '/_layout/dashboard/teamnames/add',
)

export const useNewTeamNameForm = () => {
  const router = useRouter()
  const navigate = route.useNavigate()
  const women = route.useSearch({ select: (s) => s.women })

  const mutation = useMutation({
    mutationFn: addTeamName,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })
  const defaultValues: zd.input<typeof addTeamNameObject> =
    {
      name: '',
      casualName: '',
      shortName: '',
      logoId: 0,
    }
  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: addTeamNameObject,
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
