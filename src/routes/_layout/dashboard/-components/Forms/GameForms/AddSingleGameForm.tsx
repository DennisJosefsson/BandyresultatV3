import { Button } from '@/components/ui/button'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zd } from '@/lib/utils/zod'
import { getRouteApi } from '@tanstack/react-router'
import { useAddSingleGameForm } from '../../../-hooks/useAddSingleGameForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/singlegame',
)

const currDate = new Date().toLocaleDateString('se-SV', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const AddSingleGameForm = () => {
  const teams = route.useLoaderData({ select: (s) => s.teams })
  const form = useAddSingleGameForm()

  const buttonClick = () => {
    form.setFieldValue('date', currDate)
    form.validateField('date', 'blur')
  }

  return (
    <div className="flex min-h-100 flex-col gap-2 p-2">
      <div className="flex flex-row justify-end gap-2">
        <Button type="submit" form="singlenewgameform">
          Skicka
        </Button>
      </div>
      <form
        id="singlenewgameform"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <form.Field
              name="homeTeamId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Hemmalag</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value.toString()}
                      onValueChange={(value) => {
                        field.handleChange(zd.coerce.number().parse(value))
                      }}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={isInvalid}
                        className="w-full min-w-[120px]"
                      >
                        <SelectValue placeholder="Välj" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">
                          {field.state.value}
                        </SelectItem>
                        <SelectSeparator />
                        {teams.map((team) => (
                          <SelectItem
                            key={team.value}
                            value={team.value.toString()}
                          >
                            {team.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="awayTeamId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Bortalag</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value.toString()}
                      onValueChange={(value) => {
                        field.handleChange(zd.coerce.number().parse(value))
                      }}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={isInvalid}
                        className="w-full min-w-[120px]"
                      >
                        <SelectValue placeholder="Välj" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">
                          {field.state.value}
                        </SelectItem>
                        <SelectSeparator />
                        {teams.map((team) => (
                          <SelectItem
                            key={team.value}
                            value={team.value.toString()}
                          >
                            {team.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="result"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Slutresultat</FieldLabel>
                    <Input
                      className="h-9"
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
                      className="h-9"
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
                      className="h-9"
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
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddSingleGameForm
