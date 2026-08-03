import {
  useRouter,
  useSearch,
} from '@tanstack/react-router'
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from '../base/ui/field'
import { Switch } from '../base/ui/switch'

const SwitchChoiceCard = () => {
  const navigate = useRouter().navigate
  const women = useSearch({
    from: '__root__',
    select: (search) => search.women,
  })

  const updateWomen = () => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        women: !prev.women,
        teamId: undefined,
        opponentId: undefined,
        teamArray: undefined,
      }),
    })
  }
  return (
    <FieldGroup className="xs:w-20 msm:w-30 w-16">
      <FieldLabel
        htmlFor="women"
        className="dark:bg-primary/10 bg-primary/5 has-data-checked:bg-primary/5 has-data-checked:dark:bg-primary/10 border-none"
      >
        <Field
          orientation="horizontal"
          className="gap-2 has-[>[data-slot=field-content]]:items-center"
        >
          <FieldContent className="">
            <FieldTitle className="msm:text-xs text-[8px] md:text-sm lg:text-base leading-2 xxs:leading-3 xs:leading-4 msm:leading-5">
              {women ? 'Herrar' : 'Damer'}
            </FieldTitle>
          </FieldContent>
          <Switch
            size="sm"
            id="women"
            defaultChecked={women}
            checked={women}
            onCheckedChange={updateWomen}
            className="border-primary/10 dark:border-primary/10"
          />
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}

export default SwitchChoiceCard
