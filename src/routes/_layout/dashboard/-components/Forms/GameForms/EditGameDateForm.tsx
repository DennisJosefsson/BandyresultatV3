import { Button } from '@/components/base/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/base/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/base/ui/input-group'
import { getRouteApi } from '@tanstack/react-router'
import { useInledDateEditForm } from '../../../-hooks/games/useInlineDateEditForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit/date/$gameId',
)

const currDate = new Date().toLocaleDateString('se-SV', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const EditGameDateForm = () => {
  const game = route.useLoaderData()

  const navigate = route.useNavigate()

  const form = useInledDateEditForm({ game })

  const close = () => {
    navigate({
      to: '/dashboard/season/$seasonId/info/serie/$serieId/edit/games',
      search: (prev) => ({ ...prev }),
    })
  }

  const buttonClick = () => {
    form.setFieldValue('date', currDate)
    form.validateField('date', 'change')
  }

  return (
    <div
      className="mt-4 flex w-full flex-col gap-4 px-8 min-h-120"
      id="gameedit"
    >
      <div className="flex flex-row justify-between">
        <div>
          <h3 className="mb-4 text-base">
            Redigera resultat
          </h3>
          <h4 className="text-sm">
            {game.home.name} - {game.away.name}
          </h4>
        </div>
        <div>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={close}
            >
              Stäng
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="edit-game"
            >
              Skicka
            </Button>
          </Field>
        </div>
      </div>
      <div>
        <form
          id="edit-game"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <form.Field
                name="date"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Datum
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
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}

export default EditGameDateForm
