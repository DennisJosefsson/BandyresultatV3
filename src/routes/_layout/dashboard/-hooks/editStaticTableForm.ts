import { editStaticTableArray } from '@/lib/types/table'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { editStaticTable } from '../-functions/SerieFunctions/editStaticTable'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/editTable',
)

type Data = Awaited<ReturnType<typeof editStaticTable>>

export const editStaticTableForm = () => {
  const values = route.useLoaderData({ select: (s) => s.defaultValues })
  const router = useRouter()
  const navigate = route.useNavigate()

  const mutation = useMutation({
    mutationFn: editStaticTable,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const form = useForm({
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: editStaticTableArray,
    },
    defaultValues: {
      tableArray: values,
    },
    onSubmit: ({ value }) => mutation.mutateAsync({ data: value }),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
    router.invalidate({
      filter: (route) =>
        route.routeId ===
        '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
    })
    navigate({
      to: '/dashboard/season/$seasonId/info/$serieId/edit',
      search: (prev) => ({ women: prev.women }),
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
