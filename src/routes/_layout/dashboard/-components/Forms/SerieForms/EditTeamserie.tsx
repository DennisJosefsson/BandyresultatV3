import ConfirmDialog from '@/components/Common/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { zd } from '@/lib/utils/zod'
import { getRouteApi } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { deleteTeamserieMutation } from '../../../-hooks/deleteTeamserieMutation'
import { useEditTeamSeriesForm } from '../../../-hooks/useEditTeamSeriesForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

const EditTeamSerie = () => {
  const teamserieDialogRef = useRef<HTMLDialogElement | null>(null)
  const [teamseriesId, setTeamseriesId] = useState<number | null>(null)
  const [teamName, setTeamName] = useState<string | null>(null)
  const form = useEditTeamSeriesForm()
  const teamArray = route
    .useLoaderData({ select: (s) => s.teamsInSerie })
    .map((team) => {
      return { teamseriesId: team.teamseriesId, teamName: team.team.casualName }
    })
  const mutation = deleteTeamserieMutation(teamserieDialogRef)
  const openDialog = (id: number) => {
    setTeamseriesId(id)
    teamserieDialogRef.current?.showModal()
  }

  const deleteTeamFunction = () => {
    if (!teamseriesId) return
    mutation.mutate({ data: { teamseriesId: teamseriesId } })
  }

  return (
    <>
      <ConfirmDialog
        dialogRef={teamserieDialogRef}
        confirmTitle={`Vill du ta bort ${teamName}?`}
        onClose={() => setTeamName(null)}
        confirmFunction={deleteTeamFunction}
      />
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Ändra Teamserie</CardTitle>
            </div>
            <div className="flex flex-row gap-2">
              <Button type="submit" form="editTeamSerieForm">
                Ändra
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            id="editTeamSerieForm"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field name="teamserie" mode="array">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <FieldSet className="gap-4">
                      <FieldLegend variant="label">
                        <div className="flex flex-row items-center gap-2">
                          <span className="w-40 text-sm">Lag</span>
                          <div className="w-40">Bonuspoäng</div>
                        </div>
                      </FieldLegend>
                      <FieldGroup className="gap-4">
                        {field.state.value.map((team, index) => (
                          <form.Field
                            key={index}
                            name={`teamserie[${index}].bonusPoints`}
                            children={(subField) => {
                              const currTeamName = teamArray.find(
                                (t) => t.teamseriesId === team.teamseriesId,
                              )?.teamName
                              const isSubFieldInvalid =
                                subField.state.meta.isTouched &&
                                !subField.state.meta.isValid
                              return (
                                <Field
                                  orientation="horizontal"
                                  data-invalid={isSubFieldInvalid}
                                >
                                  <FieldContent>
                                    <div className="flex flex-row items-center gap-2">
                                      <span className="w-40 text-sm">
                                        {currTeamName}
                                      </span>
                                      <div className="w-40">
                                        <InputGroup>
                                          <InputGroupInput
                                            id={`form-team-array-bonusPoints-${index}`}
                                            name={subField.name}
                                            value={subField.state.value}
                                            onBlur={subField.handleBlur}
                                            onChange={(e) =>
                                              subField.handleChange(
                                                zd.coerce
                                                  .number()
                                                  .parse(e.target.value),
                                              )
                                            }
                                            aria-invalid={isSubFieldInvalid}
                                            placeholder="0"
                                          />

                                          <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                              type="button"
                                              variant="ghost"
                                              onClick={() => {
                                                setTeamName(
                                                  currTeamName ?? 'Okänt lag',
                                                )
                                                openDialog(team.teamseriesId)
                                              }}
                                              aria-label={`Ta bort lag ${index + 1}`}
                                            >
                                              Ta bort lag
                                            </InputGroupButton>
                                          </InputGroupAddon>
                                        </InputGroup>
                                        {isSubFieldInvalid && (
                                          <FieldError
                                            errors={subField.state.meta.errors}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </FieldContent>
                                </Field>
                              )
                            }}
                          />
                        ))}
                      </FieldGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldSet>
                  )
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default EditTeamSerie
