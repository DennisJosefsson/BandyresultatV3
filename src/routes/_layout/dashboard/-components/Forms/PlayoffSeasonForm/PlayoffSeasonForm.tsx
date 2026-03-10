import { getRouteApi } from '@tanstack/react-router'

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
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/base/ui/field'

import { usePlayoffSeasonForm } from '../../../-hooks/usePlayoffSeasonForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/playoffseason/',
)

const PlayoffSeasonForm = () => {
  const form = usePlayoffSeasonForm()
  const seasonId = route.useParams({
    select: (s) => s.seasonId,
  })
  const women = route.useSearch({
    select: (search) => search.women,
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>PlayoffSeason</CardTitle>
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
              form="playoffseasonForm"
            >
              Skicka
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          id="playoffseasonForm"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-4 gap-2">
              <form.Field
                name="hasEight"
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
                          checked={field.state.value}
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
                          hasEight
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
              <form.Field
                name="hasQuarter"
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
                          checked={field.state.value}
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
                          hasQuarter
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
              <form.Field
                name="playoffAsSeries"
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
                          checked={field.state.value}
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
                          playoffAsSeries
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
              <form.Field
                name="uefaSorting"
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
                          checked={field.state.value}
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
                          uefaSorting
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
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default PlayoffSeasonForm
