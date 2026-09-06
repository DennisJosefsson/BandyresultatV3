import ConfirmDialog from '@/components/Common/ConfirmDialog'
import CustomNumberInput from '@/components/Common/CustomNumberInput'
import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/base/ui/field'
import { getRouteApi } from '@tanstack/react-router'
import { useRef, useState } from 'react'

import { deleteTeamserieMutation } from '../../../-hooks/deleteTeamserieMutation'
import { useEditTeamSeriesForm } from '../../../-hooks/useEditTeamSeriesForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit',
)

const EditTeamSerie = () => {
  const teamserieDialogRef =
    useRef<HTMLDialogElement | null>(null)
  const [teamseriesId, setTeamseriesId] = useState<
    number | null
  >(null)
  const [teamName, setTeamName] = useState<string | null>(
    null,
  )
  const form = useEditTeamSeriesForm()

  const teamArray = route
    .useLoaderData({ select: (s) => s.teamsInSerie })
    .map((team) => {
      return {
        teamseriesId: team.teamseriesId,
        teamName: team.team.casualName,
        teamId: team.team.teamId,
      }
    })

  const mutation = deleteTeamserieMutation(
    teamserieDialogRef,
  )
  const openDialog = (id: number) => {
    setTeamseriesId(id)
    teamserieDialogRef.current?.showModal()
  }

  const deleteTeamFunction = () => {
    if (!teamseriesId) return
    mutation.mutate({
      data: { teamseriesId: teamseriesId },
    })
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
              <Button
                type="submit"
                form="editTeamSerieForm"
              >
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
              <form.Field
                name="teamserie"
                mode="array"
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <FieldSet className="gap-4">
                      <FieldLegend
                        variant="label"
                        className="w-full"
                      >
                        <div className="grid grid-cols-5 items-center gap-2">
                          <span className="text-sm">
                            Lag
                          </span>
                          <span className="text-sm">
                            TeamId
                          </span>
                          <span className="text-sm">
                            Bonuspoäng
                          </span>
                          <span className="text-sm">
                            Sortering
                          </span>
                          <span className="invisible">
                            Fält
                          </span>
                        </div>
                      </FieldLegend>
                      <FieldGroup className="gap-4">
                        {field.state.value.map(
                          (team, index) => {
                            const currTeamName =
                              teamArray.find(
                                (t) =>
                                  t.teamseriesId ===
                                  team.teamseriesId,
                              )?.teamName
                            const currTeamId =
                              teamArray.find(
                                (t) =>
                                  t.teamseriesId ===
                                  team.teamseriesId,
                              )?.teamId
                            return (
                              <div
                                key={`div-${index}`}
                                className="grid grid-cols-5 gap-2"
                              >
                                <span className="text-sm">
                                  {currTeamName}
                                </span>
                                <span className="text-sm">
                                  {currTeamId}
                                </span>
                                <form.Field
                                  name={`teamserie[${index}].bonusPoints`}
                                  children={(subField) => {
                                    const isSubFieldInvalid =
                                      subField.state.meta
                                        .isTouched &&
                                      !subField.state.meta
                                        .isValid
                                    return (
                                      <Field
                                        orientation="horizontal"
                                        data-invalid={
                                          isSubFieldInvalid
                                        }
                                      >
                                        <FieldContent>
                                          <div className="flex flex-row items-center gap-2">
                                            <div className="w-24">
                                              <CustomNumberInput
                                                id={
                                                  subField.name
                                                }
                                                name={
                                                  subField.name
                                                }
                                                value={
                                                  subField
                                                    .state
                                                    .value
                                                }
                                                onBlur={
                                                  subField.handleBlur
                                                }
                                                onChange={(
                                                  e,
                                                ) =>
                                                  subField.handleChange(
                                                    e.target
                                                      .valueAsNumber,
                                                  )
                                                }
                                                aria-invalid={
                                                  isSubFieldInvalid
                                                }
                                                placeholder="0"
                                                incrementer={() =>
                                                  subField.setValue(
                                                    subField
                                                      .state
                                                      .value +
                                                      1,
                                                  )
                                                }
                                                decrementer={() =>
                                                  subField.setValue(
                                                    subField
                                                      .state
                                                      .value -
                                                      1,
                                                  )
                                                }
                                                error={{
                                                  hasErrorField: true,
                                                  errorBoolean:
                                                    isSubFieldInvalid,
                                                  errors:
                                                    subField
                                                      .state
                                                      .meta
                                                      .errors,
                                                }}
                                              />
                                              {isSubFieldInvalid && (
                                                <FieldError
                                                  errors={
                                                    subField
                                                      .state
                                                      .meta
                                                      .errors
                                                  }
                                                />
                                              )}
                                            </div>
                                          </div>
                                        </FieldContent>
                                      </Field>
                                    )
                                  }}
                                />
                                <form.Field
                                  name={`teamserie[${index}].sortPriority`}
                                  children={(subField) => {
                                    const isSubFieldInvalid =
                                      subField.state.meta
                                        .isTouched &&
                                      !subField.state.meta
                                        .isValid
                                    return (
                                      <Field
                                        orientation="horizontal"
                                        data-invalid={
                                          isSubFieldInvalid
                                        }
                                      >
                                        <FieldContent>
                                          <div className="flex flex-row items-center gap-2">
                                            <div className="w-24">
                                              <CustomNumberInput
                                                id={
                                                  subField.name
                                                }
                                                name={
                                                  subField.name
                                                }
                                                value={
                                                  subField
                                                    .state
                                                    .value
                                                }
                                                onBlur={
                                                  subField.handleBlur
                                                }
                                                onChange={(
                                                  e,
                                                ) =>
                                                  subField.handleChange(
                                                    e.target
                                                      .valueAsNumber,
                                                  )
                                                }
                                                aria-invalid={
                                                  isSubFieldInvalid
                                                }
                                                placeholder="0"
                                                incrementer={() =>
                                                  subField.setValue(
                                                    subField
                                                      .state
                                                      .value +
                                                      1,
                                                  )
                                                }
                                                decrementer={() =>
                                                  subField.setValue(
                                                    subField
                                                      .state
                                                      .value -
                                                      1,
                                                  )
                                                }
                                                error={{
                                                  hasErrorField: true,
                                                  errorBoolean:
                                                    isSubFieldInvalid,
                                                  errors:
                                                    subField
                                                      .state
                                                      .meta
                                                      .errors,
                                                }}
                                              />
                                              {isSubFieldInvalid && (
                                                <FieldError
                                                  errors={
                                                    subField
                                                      .state
                                                      .meta
                                                      .errors
                                                  }
                                                />
                                              )}
                                            </div>
                                          </div>
                                        </FieldContent>
                                      </Field>
                                    )
                                  }}
                                />
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setTeamName(
                                      currTeamName ??
                                        'Okänt lag',
                                    )
                                    openDialog(
                                      team.teamseriesId,
                                    )
                                  }}
                                >
                                  Ta bort
                                </Button>
                              </div>
                            )
                          },
                        )}
                      </FieldGroup>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
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
