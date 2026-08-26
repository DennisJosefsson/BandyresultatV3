import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import { Checkbox } from '@/components/base/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from '@/components/base/ui/field'
import { Input } from '@/components/base/ui/input'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/base/ui/radio-group'
import { getRouteApi } from '@tanstack/react-router'
import { useEditCompetitionForm } from '../../../-hooks/useEditCompetitionForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/edit',
)

const divisionArray = [
  {
    label: 'Högsta divisionen',
    value: 'Högsta divisionen',
  },
  {
    label: 'Kval till högsta divisionen',
    value: 'Kval till högsta divisionen',
  },
  {
    label: 'Näst högsta divisionen',
    value: 'Näst högsta divisionen',
  },
  {
    label: 'Kval till näst högsta divisionen',
    value: 'Kval till näst högsta divisionen',
  },
  {
    label: 'Tredje högsta divisionen',
    value: 'Tredje högsta divisionen',
  },
  {
    label: 'Kval till tredje högsta divisionen',
    value: 'Kval till tredje högsta divisionen',
  },
  {
    label: 'Fjärde högsta divisionen',
    value: 'Fjärde högsta divisionen',
  },
  {
    label: 'Svenska Cupen',
    value: 'Svenska Cupen',
  },
  {
    label: 'Allsvenska supercupen',
    value: 'Allsvenska supercupen',
  },
  {
    label: 'World Cup',
    value: 'World Cup',
  },
]

type DivisionValues = Record<string, number>

const divisionValues: DivisionValues = {
  'Högsta divisionen': 1,
  'Kval till högsta divisionen': 1.5,
  'Näst högsta divisionen': 2,
  'Kval till näst högsta divisionen': 2.5,
  'Tredje högsta divisionen': 3,
  'Kval till tredje högsta divisionen': 3.5,
  'Fjärde högsta divisionen': 4,
  'Svenska Cupen': 10,
  'World Cup': 11,
  'Allsvenska supercupen': 12,
}

const EditCompetition = () => {
  const data = route.useLoaderData()
  const seasonId = route.useParams({
    select: (s) => s.seasonId,
  })
  const women = route.useSearch({ select: (s) => s.women })
  const form = useEditCompetitionForm()

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              Ändra turnering{' '}
              {data.status === 200 &&
                data.competition.competitionName}
            </CardTitle>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              render={
                <route.Link
                  to="/dashboard/season/$seasonId"
                  params={{ seasonId }}
                  search={{ women }}
                >
                  Tillbaka
                </route.Link>
              }
              nativeButton={false}
            />

            <Button
              type="submit"
              form="newCompetitionForm"
            >
              Skicka
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          id="newCompetitionForm"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="flex flex-col gap-4 w-64">
              <form.Field
                name="competitionName"
                listeners={{
                  onChange: ({ value }) => {
                    if (
                      divisionValues[value] === undefined
                    ) {
                      form.setFieldValue('division', 11)
                    } else {
                      form.setFieldValue(
                        'division',
                        divisionValues[value],
                      )
                    }
                  },
                }}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <span className="text-sm">
                        Turneringsnamn
                      </span>
                      <RadioGroup
                        id={`id-${field.name}`}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onValueChange={(value) =>
                          field.setValue(value)
                        }
                        aria-invalid={isInvalid}
                      >
                        {divisionArray.map((rb, index) => {
                          const name = `${rb.value}-${index}`

                          return (
                            <FieldLabel
                              htmlFor={name}
                              key={name}
                            >
                              <Field orientation="horizontal">
                                <FieldContent>
                                  <FieldTitle className="text-[8px] xxs:text-[10px] sm:text-xs">
                                    {rb.label}
                                  </FieldTitle>
                                </FieldContent>
                                <RadioGroupItem
                                  value={rb.value}
                                  id={name}
                                  className="focus-visible:ring-2 md:focus-visible:ring-3"
                                />
                              </Field>
                            </FieldLabel>
                          )
                        })}
                      </RadioGroup>
                      <span className="text-sm">
                        Annat turneringsnamn
                      </span>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        aria-invalid={isInvalid}
                        placeholder="T.ex. Svenska Cupen"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="division"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm"
                      >
                        Division
                      </FieldLabel>
                      <div className="w-24">
                        <Input
                          type="number"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.valueAsNumber,
                            )
                          }
                          aria-invalid={isInvalid}
                          placeholder="Division"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
              <div className="grid grid-cols-5 gap-2">
                <form.Field
                  name="isCup"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <Field
                          orientation="horizontal"
                          data-invalid={isInvalid}
                        >
                          <Checkbox
                            id={field.name}
                            name={field.name}
                            checked={Boolean(
                              field.state.value,
                            )}
                            onCheckedChange={(checked) =>
                              field.handleChange(
                                checked === true,
                              )
                            }
                          />
                          <FieldLabel
                            htmlFor={field.name}
                            className="font-normal"
                          >
                            isCup
                          </FieldLabel>
                        </Field>
                        {isInvalid && (
                          <FieldError
                            errors={field.state.meta.errors}
                          />
                        )}
                      </Field>
                    )
                  }}
                />
              </div>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditCompetition
