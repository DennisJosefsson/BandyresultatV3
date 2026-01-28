import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { updateDate } from '../../../-functions/GameFunctions.ts/updateDate'

const route = getRouteApi('/_layout/dashboard/games/$today/$gameId')

const currDate = new Date().toLocaleDateString('se-SV', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

type Data =
  | {
      status: 404
      message: string
    }
  | {
      status: 200
      message: string
    }
  | undefined

const submitGameResult = zd.object({
  gameId: zd.number().int().positive(),
  date: zd.iso.date({ message: 'Fel datumformat.' }),
  homeTeamGameId: zd.number().int().positive(),
  awayTeamGameId: zd.number().int().positive(),
})

const ResultUpdateForm = () => {
  const game = route.useLoaderData()
  const router = useRouter()
  const today = route.useParams({ select: (s) => s.today })
  const women = route.useSearch({
    select: (search) => search.women,
  })

  const navigate = route.useNavigate()

  const mutation = useMutation({
    mutationFn: updateDate,
    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onErrorFunction(error),
  })

  const form = useForm({
    defaultValues: {
      gameId: game.gameId,
      date: game.date,
      homeTeamGameId: game.home.teamGameId,
      awayTeamGameId: game.away.teamGameId,
    },
    validators: { onSubmit: submitGameResult, onBlur: submitGameResult },
    onSubmit: ({ value }) => mutation.mutateAsync({ data: value }),
  })

  const close = () => {
    navigate({
      to: '/dashboard/games/$today',
      search: { women },
      params: { today },
    })
  }

  const onSuccessSubmit = (data: Data) => {
    router.invalidate({
      filter: (route) => route.routeId === '/_layout/dashboard/games/$today',
    })
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }

    close()
  }

  const onErrorFunction = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel.')
    }
  }

  const buttonClick = () => {
    form.setFieldValue('date', currDate)
    form.validateField('date', 'blur')
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Redigera datum</CardTitle>
        <CardDescription>
          {game.home.name} - {game.away.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="edit-game-date"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="date"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Datum</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="T.ex. 2025-12-26"
                        aria-invalid={isInvalid}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          variant="secondary"
                          onClick={buttonClick}
                        >
                          Idag
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={close}>
            Stäng
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="edit-game-date">
            Skicka
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default ResultUpdateForm
