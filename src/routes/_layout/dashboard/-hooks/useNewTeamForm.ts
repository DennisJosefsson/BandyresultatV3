import { newTeam } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { addTeam } from '../-functions/TeamFunctions/addTeam'

type Data = Awaited<ReturnType<typeof addTeam>>

const route = getRouteApi('/_layout/dashboard/teams/add')

export const useNewTeamForm = () => {
  const router = useRouter()
  const navigate = route.useNavigate()
  const women = route.useSearch({ select: (s) => s.women })
  const mutation = useMutation({
    mutationFn: addTeam,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })
  const defaultValues: zd.input<typeof newTeam> = {
    name: '',
    city: '',
    casualName: '',
    shortName: '',
    women: false,
    lat: 62,
    long: 15,
    countyId: 1,
    municipalityId: 0,
  }
  const form = useForm({
    defaultValues,
    validators: { onBlur: newTeam, onChange: newTeam, onSubmit: newTeam },
    onSubmit: ({ value }) => mutation.mutateAsync({ data: value }),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
      router.invalidate({
        filter: (route) => route.routeId === '/_layout/dashboard/teams/',
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
