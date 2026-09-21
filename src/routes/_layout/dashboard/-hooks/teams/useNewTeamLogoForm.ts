import { addTeamLogoObject } from '@/lib/types/team'
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
import { addTeamLogo } from '../../-functions/TeamFunctions/addTeamLogo'

type Data = Awaited<ReturnType<typeof addTeamLogo>>

const route = getRouteApi(
  '/_layout/dashboard/teamnames/logos/add',
)

export const useNewTeamLogoForm = (newLogoId: number) => {
  const router = useRouter()
  const navigate = route.useNavigate()
  const women = route.useSearch({ select: (s) => s.women })

  const mutation = useMutation({
    mutationFn: addTeamLogo,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })
  const defaultValues: zd.input<typeof addTeamLogoObject> =
    {
      hasDark: false,
      logoId: newLogoId,
    }
  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: addTeamLogoObject,
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
          r.routeId === '/_layout/dashboard/teamnames/',
      })
      navigate({
        to: '/dashboard/teamnames',
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
