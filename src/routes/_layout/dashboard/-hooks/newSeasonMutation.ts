import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { RefObject } from 'react'
import { toast } from 'sonner'
import { generateNewSeason } from '../-functions/SeasonFunctions/generateNewSeason'

type Data = Awaited<ReturnType<typeof generateNewSeason>>

export const newSeasonMutation = (
  dialogRef: RefObject<HTMLDialogElement | null>,
) => {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: generateNewSeason,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
    router.invalidate()
    dialogRef.current?.close()
  }

  const onMutationError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel')
    }
    dialogRef.current?.close()
  }

  return mutation
}
