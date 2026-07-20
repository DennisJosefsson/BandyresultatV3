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
    <FieldGroup className="w-16 xs:w-20 msm:w-30">
      <FieldLabel
        htmlFor="women"
        className="border-none dark:bg-primary/10 bg-primary/5 has-data-checked:bg-primary/5 has-data-checked:dark:bg-primary/10"
      >
        <Field
          orientation="horizontal"
          className="has-[>[data-slot=field-content]]:items-center gap-2"
        >
          <FieldContent className="">
            <FieldTitle className="text-[8px]/relaxed msm:text-xs/relaxed md:text-sm/relaxed lg:text-base/relaxed">
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
