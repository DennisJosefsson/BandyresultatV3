import { newParentSerieObject } from '@/lib/types/serie'
import { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import { newParentSerieInput } from '../-functions/SerieFunctions/newParentSerie'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

type Data = { status: 200; message: string } | undefined

export const useNewParentSerieForm = () => {
  const router = useRouter()

  const serieId = route.useParams({ select: (s) => s.serieId })
  const mutation = useMutation({
    mutationFn: newParentSerieInput,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const defaultValues: zd.input<typeof newParentSerieObject> = {
    childId: serieId,
    parentId: 0,
  }
  const form = useForm({
    validators: {
      onChange: newParentSerieObject,
      onSubmit: newParentSerieObject,
    },
    defaultValues: { ...defaultValues },
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
        route.routeId === '/_layout/dashboard/season/$seasonId',
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
