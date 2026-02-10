import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { RefObject } from 'react'
import { toast } from 'sonner'
import { deleteGame } from '../-functions/GameFunctions/deleteGame'

type Data = Awaited<ReturnType<typeof deleteGame>>

export const deleteGameMutation = (
  dialogRef: RefObject<HTMLDialogElement | null>,
) => {
  const mutation = useMutation({
    mutationFn: deleteGame,
    onSuccess: (data) => onSuccessDeleteMutation(data),
    onError: (error) => onErrorFunction(error),
  })
  const router = useRouter()

  const onSuccessDeleteMutation = (data: Data) => {
    if (!data) {
      toast.error('Något gick fel.')
    } else {
      toast.success(data.message)
    }
    router.invalidate({
      filter: (route) =>
        route.routeId ===
        '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/games',
    })
    dialogRef.current?.close()
  }

  const onErrorFunction = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel.')
    }
    dialogRef.current?.close()
  }

  return mutation
}
