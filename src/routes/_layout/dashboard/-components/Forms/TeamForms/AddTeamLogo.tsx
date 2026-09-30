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
import CustomNumberInput from '@/components/Common/CustomNumberInput'
import TeamLogo from '@/components/Common/TeamLogo'
import { useStore } from '@tanstack/react-form'
import { getRouteApi } from '@tanstack/react-router'
import { useNewTeamLogoForm } from '../../../-hooks/teams/useNewTeamLogoForm'

const route = getRouteApi(
  '/_layout/dashboard/teamnames/logos/add',
)

const AddTeamLogo = ({
  newLogoId,
}: {
  newLogoId: number
}) => {
  const women = route.useSearch({ select: (s) => s.women })

  const form = useNewTeamLogoForm(newLogoId)

  const logoId = useStore(
    form.store,
    (state) => state.values.logoId,
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ny TeamLogo</CardTitle>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              nativeButton={false}
              render={
                <route.Link
                  to="/dashboard/teamnames"
                  search={{ women }}
                >
                  Tillbaka
                </route.Link>
              }
            />

            <Button
              type="submit"
              form="newTeamLogoForm"
            >
              Lägg till
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form
          id="newTeamLogoForm"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-2 gap-6 text-sm items-center">
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
                      </div>
                    </Field>
                  )
                }}
              />

              <form.Field
                name="hasDark"
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
                          hasDark
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
              <TeamLogo
                className="xs:w-16 w-8 object-scale-down md:w-24 lg:w-32"
                size={128}
                logoId={logoId}
                hasDark={false}
              />
              <TeamLogo
                className="xs:w-16 w-8 object-scale-down md:w-24 lg:w-32"
                size={128}
                logoId={logoId}
                hasDark={true}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddTeamLogo
