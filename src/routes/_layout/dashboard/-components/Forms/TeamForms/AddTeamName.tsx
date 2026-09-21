import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/base/ui/field'
import { Input } from '@/components/base/ui/input'
import CustomNumberInput from '@/components/Common/CustomNumberInput'
import TeamLogo from '@/components/Common/TeamLogo'
import { useStore } from '@tanstack/react-form'
import { getRouteApi } from '@tanstack/react-router'
import { useTeamLogo } from '../../../-hooks/teams/useGetTeamLogo'
import { useNewTeamNameForm } from '../../../-hooks/teams/useNewTeamNameForm'

const route = getRouteApi(
  '/_layout/dashboard/teamnames/add',
)

const AddTeamName = () => {
  const women = route.useSearch({ select: (s) => s.women })
  const form = useNewTeamNameForm()
  const logoId = useStore(
    form.store,
    (state) => state.values.logoId,
  )
  const { data, error } = useTeamLogo(logoId ?? 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <div>
            <CardTitle>Nytt TeamName</CardTitle>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Button
                nativeButton={false}
                render={
                  <route.Link
                    to="/dashboard"
                    search={{ women }}
                  >
                    Tillbaka
                  </route.Link>
                }
              />

              <Button
                type="submit"
                form="newTeamNameForm"
              >
                Lägg till
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex flex-row justify-center mb-4">
            <span className="text-sm">{error.message}</span>
          </div>
        ) : null}
        <form
          id="newTeamNameForm"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-2 items-center gap-x-4 gap-y-8">
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Namn
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        aria-invalid={isInvalid}
                        placeholder="T.ex. IFK Oxelösund"
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
                name="casualName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Vanligt namn
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        aria-invalid={isInvalid}
                        placeholder="T.ex. Oxelösund"
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
                name="shortName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Kort namn
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        aria-invalid={isInvalid}
                        placeholder="T.ex. IFKÖ"
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
                name="logoId"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        logoId
                      </FieldLabel>
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          <CustomNumberInput
                            inputGroupClassName="w-60"
                            id={field.name}
                            name={field.name}
                            value={
                              field.state.value ?? undefined
                            }
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(
                                e.target.valueAsNumber,
                              )
                            }
                            aria-invalid={isInvalid}
                            placeholder="Position"
                            incrementer={() => {
                              if (
                                field.state.value ===
                                undefined
                              ) {
                                return 1
                              }
                              field.setValue(
                                field.state.value + 1,
                              )
                            }}
                            decrementer={() => {
                              if (
                                field.state.value ===
                                undefined
                              ) {
                                return
                              }
                              field.setValue(
                                field.state.value - 1,
                              )
                            }}
                            resetter={() =>
                              field.setValue(0)
                            }
                            error={{
                              hasErrorField: true,
                              errorBoolean: isInvalid,
                              errors:
                                field.state.meta.errors,
                            }}
                          />
                          {isInvalid && (
                            <FieldError
                              errors={
                                field.state.meta.errors
                              }
                            />
                          )}
                        </div>
                        <div>
                          {data ? (
                            <TeamLogo
                              className="xs:w-16 w-8 object-scale-down"
                              size={64}
                              logoId={data.logoId}
                              hasDark={data.hasDark}
                            />
                          ) : null}
                        </div>
                      </div>
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

export default AddTeamName
