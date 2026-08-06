import { Checkbox } from '@/components/base/ui/checkbox'
import { cn } from '@/lib/utils/utils'
import type { CheckboxRootProps } from '@base-ui/react'
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from '../base/ui/field'

interface CheckboxBadgeProps extends CheckboxRootProps {
  name: string
  title: string
  orientation?:
    | 'vertical'
    | 'horizontal'
    | 'responsive'
    | null
    | undefined
}

const CheckboxBadge = ({
  name,
  id,
  checked,
  onCheckedChange,
  title,
  orientation,
  className,
  ...props
}: CheckboxBadgeProps) => {
  return (
    <FieldLabel
      htmlFor={id}
      key={id}
      className={cn('', className)}
    >
      <Field orientation={orientation}>
        <FieldContent>
          <FieldTitle className="text-[8px] xxs:text-[10px] sm:text-xs">
            {title}
          </FieldTitle>
        </FieldContent>
        <Checkbox
          name={name}
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
