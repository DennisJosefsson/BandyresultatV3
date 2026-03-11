import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '../base/ui/field'
import type { RadioGroupProps } from '../base/ui/radio-group'
import {
  RadioGroup,
  RadioGroupItem,
} from '../base/ui/radio-group'

interface RadioBadgesProps extends RadioGroupProps {
  array: Array<{
    value: string
    label: string
    description: string
  }>
  orientation?:
    | 'vertical'
    | 'horizontal'
    | 'responsive'
    | null
    | undefined
}

const RadioBadges = ({
  array,
  orientation,

  ...props
}: RadioBadgesProps) => {
  return (
    <RadioGroup {...props}>
      {array.map((rb, index) => {
        const name = `${rb.value}-${index}`

        return (
          <FieldLabel
            htmlFor={name}
            key={name}
          >
            <Field orientation={orientation}>
              <FieldContent>
                <FieldTitle>{rb.label}</FieldTitle>
                <FieldDescription>
                  {rb.description}
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem
                value={rb.value}
                id={name}
              />
            </Field>
          </FieldLabel>
        )
      })}
    </RadioGroup>
  )
}

export default RadioBadges
