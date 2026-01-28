import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
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
import { updateResult } from '../../../-functions/GameFunctions.ts/updateResult'

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
  homeTeamId: zd.number().int().positive(),
  awayTeamId: zd.number().int().positive(),
  result: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat.' }),
  halftimeResult: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat, halvtid.' })
    .or(zd.literal('')),
  otResult: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, {
      message: 'Fel resultatformat, övertid eller straffar.',
    })
    .or(zd.literal('')),
  date: zd.iso.date({ message: 'Fel datumformat.' }),
  extraTime: zd.boolean(),
  penalties: zd.boolean(),
  women: zd.boolean(),
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
    mutationFn: updateResult,
    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onErrorFunction(error),
  })

  const form = useForm({
    defaultValues: {
      gameId: game.gameId,
      result: game.result ?? '',
      halftimeResult: game.halftimeResult ?? '',
      date: game.date,
      women: game.women,
      homeTeamId: game.homeTeamId,
      awayTeamId: game.awayTeamId,
      penalties: game.penalties ?? false,
      extraTime: game.extraTime ?? false,
      otResult: game.otResult ?? '',
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
        <CardTitle>Redigera resultat</CardTitle>
        <CardDescription>
          {game.home.name} - {game.away.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="edit-game-result"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="result"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Slutresultat</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="T.ex. 5-3"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="halftimeResult"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Halvtidsresultat
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="T.ex. 2-3"
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
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
            <form.Field
              name="otResult"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Resultat efter SD/Straffar
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="T.ex. 2-3"
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <div className="grid grid-cols-2 items-center">
              <div>
                <form.Field
                  name="extraTime"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <FieldSet>
                        <FieldGroup data-slot="checkbox-group">
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <Checkbox
                              id="extraTime"
                              name={field.name}
                              checked={field.state.value}
                              onCheckedChange={(checked) =>
                                field.handleChange(checked === true)
                              }
                            />
                            <FieldLabel
                              htmlFor="extraTime"
                              className="font-normal"
                            >
                              Övertid
                            </FieldLabel>
                          </Field>
                        </FieldGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </FieldSet>
                    )
                  }}
                />
              </div>
              <div>
                <form.Field
                  name="penalties"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <FieldSet>
                        <FieldGroup data-slot="checkbox-group">
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <Checkbox
                              id="penalties"
                              name={field.name}
                              checked={field.state.value}
                              onCheckedChange={(checked) =>
                                field.handleChange(checked === true)
                              }
                            />
                            <FieldLabel
                              htmlFor="penalties"
                              className="font-normal"
                            >
                              Straffar
                            </FieldLabel>
                          </Field>
                        </FieldGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </FieldSet>
                    )
                  }}
                />
              </div>
            </div>
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
          <Button type="submit" form="edit-game-result">
            Skicka
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default ResultUpdateForm
