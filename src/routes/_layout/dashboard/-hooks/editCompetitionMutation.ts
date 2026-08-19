import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { editCompetition } from '../-functions/CompetitionFunctions/editCompetition'

type Data = { status: 200; message: string } | undefined

export const useEditCompetitionMutation = () => {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: editCompetition,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }

    router.invalidate({
      filter: (r) =>
        r.routeId === '/_layout/dashboard/season/$seasonId',
    })
  }

  const onMutationError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel')
    }
  }

  return mutation
}
