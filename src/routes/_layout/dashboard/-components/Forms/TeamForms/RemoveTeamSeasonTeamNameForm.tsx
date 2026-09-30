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
import CustomNumberInput from '@/components/Common/CustomNumberInput'
import { getRouteApi } from '@tanstack/react-router'
import { useRemoveTeamSeasonTeamNameForm } from '../../../-hooks/teams/useRemoveTeamSeasonTeamNameForm'

const route = getRouteApi('/_layout/dashboard/team/$teamId')

const RemoveTeamSeasonTeamNameForm = () => {
  const women = route.useSearch({ select: (s) => s.women })

  const form = useRemoveTeamSeasonTeamNameForm()

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="w-full">
            <CardTitle className="grid grid-cols-5 w-full">
              <span>Ta bort lagnamn</span>
            </CardTitle>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              nativeButton={false}
              render={
                <route.Link
                  to="/dashboard/teams"
                  search={{ women }}
                >
                  Tillbaka
                </route.Link>
              }
            />

            <Button
              type="submit"
              form="removeteamSeasonTeamNameForm"
            >
              Ändra
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form
          id="removeteamSeasonTeamNameForm"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-3 gap-20">
              <form.Field
                name="firstSeason"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Första säsong
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
                      </div>
                    </Field>
                  )
                }}
              />
              <form.Field
                name="lastSeason"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Sista säsong
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

export default RemoveTeamSeasonTeamNameForm
