import { newStaticTableArray } from '@/lib/types/table'
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
import { addStaticTable } from '../-functions/SerieFunctions/addStaticTable'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit/addTable',
)

type Data = Awaited<ReturnType<typeof addStaticTable>>

export const addStaticTableForm = () => {
  const values = route.useLoaderData({
    select: (s) => s.defaultValues,
  })
  const router = useRouter()
  const navigate = route.useNavigate()

  const mutation = useMutation({
    mutationFn: addStaticTable,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const form = useForm({
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: newStaticTableArray,
    },
    defaultValues: {
      tableArray: values,
    },
    onSubmit: ({ value }) =>
      mutation.mutateAsync({ data: value }),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
    router.invalidate({
      filter: (r) =>
        r.routeId ===
        '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit',
    })
    navigate({
      to: '/dashboard/season/$seasonId/info/serie/$serieId/edit',
      search: (prev) => ({ ...prev }),
    })
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
