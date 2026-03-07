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
import { Input } from '@/components/base/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/base/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/base/ui/select'
import { Textarea } from '@/components/base/ui/textarea'

import { useMetadataForm } from '../../../-hooks/useMetadataForm'
const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/metadata/',
)

type TeamSelection = Array<{
  value: string
  label: string
}>

const currDate = new Date().toLocaleDateString('se-SV', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const MetadataForm = () => {
  const teams = route.useLoaderData({
    select: (search) => search.teams,
  })
  const form = useMetadataForm()
  const seasonId = route.useParams({
    select: (s) => s.seasonId,
  })
  const women = route.useSearch({
    select: (search) => search.women,
  })

  const teamSelection: TeamSelection = teams.map((team) => {
    return { value: team.team.name, label: team.team.name }
  })

  const buttonClick = () => {
    form.setFieldValue('finalDate', currDate)
    form.validateField('finalDate', 'blur')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Metadata</CardTitle>
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
              form="metadataForm"
            >
              Skicka
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          id="metadataForm"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-2 items-center gap-4">
              <form.Field
                name="year"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        År
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
                        placeholder="T.ex. 5-3"
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
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Serienamn
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
                        placeholder="T.ex. Elitserien"
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
                name="hostCity"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Finalstad
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
                        placeholder="T.ex. Västerås"
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
                name="finalDate"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Finaldatum
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value,
                            )
                          }
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
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="winnerName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Vinnande lag
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={(val) => {
                          if (!val) {
                            field.handleChange('')
                          } else {
                            field.handleChange(val)
                          }
                        }}
                      >
                        <SelectTrigger
                          id={field.name}
                          aria-invalid={isInvalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Välj" />
                        </SelectTrigger>
                        <SelectContent
                          alignItemWithTrigger={true}
                        >
                          <SelectItem value="auto">
                            {field.state.value}
                          </SelectItem>
                          <SelectSeparator />
                          {teamSelection.map((team) => (
                            <SelectItem
                              key={team.value}
                              value={team.value}
                            >
                              {team.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
            <div className="grid grid-cols-6 gap-2">
              <form.Field
                name="final"
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
                          Final
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
                name="semi"
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
                          Semifinal
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
                name="quarter"
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
                          Kvartsfinal
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
                name="eight"
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
                          Åttondelsfinal
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
                name="northSouth"
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
                          Norr/Söder
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
                name="multipleGroupStages"
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
                          Dubbla gruppspel
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

            <form.Field
              name="comment"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Kommentar
                    </FieldLabel>

                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      aria-invalid={isInvalid}
                      placeholder="Kommentar..."
                      className="min-h-[120px]"
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
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default MetadataForm
