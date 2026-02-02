import { newSeriesObject } from '@/lib/types/serie'
import { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouter, useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'
import { newSerieInput } from '../-functions/SerieFunctions/newSerie'

type Data = { status: 200; message: string } | undefined

export const useNewSerieForm = ({ seasonId }: { seasonId: number }) => {
  const router = useRouter()
  const navigate = useNavigate({
    from: '/dashboard/season/$seasonId/info/newSerie',
  })
  const women = useSearch({ from: '__root__', select: (s) => s.women })
  const mutation = useMutation({
    mutationFn: newSerieInput,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const defaultValues: zd.input<typeof newSeriesObject> = {
    seasonId,
    group: '',
    category: 'regular',
    serieName: '',
    serieStructure: [],
    comment: '',
    level: 1,
    hasMix: false,
    hasParent: false,
    allParentGames: false,
    hasStatic: false,
  }
  const form = useForm({
    validators: { onBlur: newSeriesObject, onSubmit: newSeriesObject },
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
    navigate({ to: '/dashboard/season/$seasonId', search: { women } })
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
