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
import TeamLogo from '@/components/Common/TeamLogo'
import type { teamlogos } from '@/db/schema'
import { useStore } from '@tanstack/react-form'
import { getRouteApi } from '@tanstack/react-router'
import { useEditTeamLogoForm } from '../../../-hooks/teams/useEditTeamLogoForm'

const route = getRouteApi(
  '/_layout/dashboard/teamnames/logos/$teamlogoId/edit',
)

type TeamLogo = typeof teamlogos.$inferSelect

const EditTeamLogo = ({
  teamLogo,
}: {
  teamLogo: TeamLogo
}) => {
  const women = route.useSearch({ select: (s) => s.women })

  const form = useEditTeamLogoForm(teamLogo)

  const logoId = useStore(
    form.store,
    (state) => state.values.logoId,
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ändra TeamLogo</CardTitle>
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
              form="editTeamLogoForm"
            >
              Ändra
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form
          id="editTeamLogoForm"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="flex flex-col gap-6">
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
              <div className="flex flex-row gap-6">
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
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditTeamLogo
