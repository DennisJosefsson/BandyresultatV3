import { Checkbox } from '@/components/base/ui/checkbox'
import type { CheckboxRootProps } from '@base-ui/react'
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from '../base/ui/field'

interface CheckboxBadgeProps extends CheckboxRootProps {
  title: string
  orientation?:
    | 'vertical'
    | 'horizontal'
    | 'responsive'
    | null
    | undefined
}

const CheckboxBadge = ({
  id,
  checked,
  onCheckedChange,
  title,
  orientation,
  ...props
}: CheckboxBadgeProps) => {
  return (
    <FieldLabel
      htmlFor={id}
      key={id}
    >
      <Field orientation={orientation}>
        <FieldContent>
          <FieldTitle>{title}</FieldTitle>
        </FieldContent>
        <Checkbox
          name="categoryArray"
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          {...props}
        />
      </Field>
    </FieldLabel>
  )
}

export default CheckboxBadge
