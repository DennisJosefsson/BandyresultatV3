import { useMutation } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { toast } from 'sonner'
import { refreshMaterializedGroupViews } from '../../-functions/GameFunctions/refreshMaterializedViews'

type Data = Awaited<
  ReturnType<typeof refreshMaterializedGroupViews>
>

export const updateMaterializedGroupViewMutation = () => {
  const refresh = useServerFn(refreshMaterializedGroupViews)
  const mutation = useMutation({
    mutationFn: () => refresh(),
    onSuccess: (data) => onSuccessDeleteMutation(data),
    onError: (error) => onErrorFunction(error),
  })

  const onSuccessDeleteMutation = (data: Data) => {
    if (!data) {
      toast.error('Något gick fel.')
    } else {
      toast.success(data.message)
    }
  }

  const onErrorFunction = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel.')
    }
  }

  return mutation
}
