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
import { InlineEditGame } from '@/lib/types/game'
import { Dispatch, SetStateAction } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useInledDateEditForm } from '../../-hooks/useInlineDateEditForm'
import { useInlineEditGameForm } from '../../-hooks/useInlineEditGameForm'

type GameEdit =
  | { editGame: null }
  | { editGame: 'result'; gameId: number }
  | { editGame: 'date'; gameId: number }

type GamesListItemProps = {
  game: InlineEditGame
  edit: GameEdit
  setEdit: Dispatch<SetStateAction<GameEdit>>
}

const currDate = new Date().toLocaleDateString('se-SV', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const GamesListItem = ({ game, edit, setEdit }: GamesListItemProps) => {
  const matches768 = useMediaQuery('(min-width: 768px)')

  const resultForm = useInlineEditGameForm({ game })

  const dateForm = useInledDateEditForm({ game })

  const buttonClick = () => {
    resultForm.setFieldValue('date', currDate)
    resultForm.validateField('date', 'blur')
  }

  const dateFormButtonClick = () => {
    dateForm.setFieldValue('date', currDate)
    dateForm.validateField('date', 'blur')
  }

  const matchup = `${matches768 ? game.home.casualName : game.home.shortName} - ${matches768 ? game.away.casualName : game.away.shortName}`

  if (edit.editGame === 'result' && edit.gameId === game.gameId) {
    return (
      <div className="mb-4">
        <form
          id="edit-game-result"
          onSubmit={(e) => {
            e.preventDefault()
            resultForm.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="flex flex-row items-center gap-4">
              <span className="text-base">{matchup}</span>
              <resultForm.Field
                name="result"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid} className="h-9 max-w-48">
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Slutresultat"
                        autoComplete="off"
                        className="h-9"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <resultForm.Field
                name="halftimeResult"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid} className="h-9 max-w-48">
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Halvtidsresultat"
                        aria-invalid={isInvalid}
                        className="h-9"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <resultForm.Field
                name="date"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid} className="h-9 max-w-48">
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Datum"
                          aria-invalid={isInvalid}
                          className="h-9"
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
              <resultForm.Field
                name="otResult"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid} className="h-9 max-w-48">
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Resultat efter SD/Straffar"
                        aria-invalid={isInvalid}
                        className="h-9"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
            </div>
            <div className="grid w-240 grid-cols-5 items-center gap-10">
              <resultForm.Field
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

              <resultForm.Field
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

              <Button
                type="button"
                variant="outline"
                onClick={() => setEdit({ editGame: null })}
              >
                Stäng
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => resultForm.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="edit-game-result">
                Skicka
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    )
  } else if (edit.editGame === 'date' && edit.gameId === game.gameId) {
    return (
      <div className="mb-4">
        <form
          id="edit-game-date"
          onSubmit={(e) => {
            e.preventDefault()
            dateForm.handleSubmit()
          }}
        >
          <div className="flex flex-row items-center gap-10">
            <span className="text-base">{matchup}</span>
            <FieldGroup className="h-9 max-w-48">
              <dateForm.Field
                name="date"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid} className="h-9 max-w-48">
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Datum"
                          aria-invalid={isInvalid}
                          autoFocus
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            variant="secondary"
                            onClick={dateFormButtonClick}
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
            </FieldGroup>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEdit({ editGame: null })}
            >
              Stäng
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => dateForm.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="edit-game-date">
              Skicka
            </Button>
          </div>
        </form>
      </div>
    )
  } else if (!edit.editGame || (edit.editGame && edit.gameId !== game.gameId)) {
    return (
      <div className="w-full">
        <div
          id={game.gameId?.toString()}
          className="mb-1 flex flex-row justify-evenly gap-1 px-1 py-0.5 text-[10px] transition-colors md:grid md:max-w-240 md:grid-cols-9 md:gap-4 md:px-2 md:text-sm"
        >
          <span>{game.date}</span>
          <span>{matches768 ? game.home.casualName : game.home.shortName}</span>
          <span className="w-1 text-center xl:w-4"> - </span>
          <span>{matches768 ? game.away.casualName : game.away.shortName}</span>

          <span className="text-right tabular-nums md:w-16">{game.result}</span>

          <span className="text-right tabular-nums md:w-16">
            {game.halftimeResult ? `(${game.halftimeResult})` : null}
          </span>
          <span className="text-right tabular-nums md:w-16">
            {game.otResult ? `otResult: (${game.otResult})` : null}
          </span>
          <span>
            <Button
              size={matches768 ? 'default' : 'textxxs'}
              onClick={() =>
                setEdit({ editGame: 'result', gameId: game.gameId })
              }
            >
              Resultat
            </Button>
          </span>
          <span>
            <Button
              size={matches768 ? 'default' : 'textxxs'}
              onClick={() => setEdit({ editGame: 'date', gameId: game.gameId })}
            >
              Datum
            </Button>
          </span>
        </div>
      </div>
    )
  }
}

export default GamesListItem
