import { FieldError } from '@/components/base/ui/field'
import { cn } from '@/lib/utils/utils'
import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../base/ui/input-group'

type ErrorField =
  | {
      hasErrorField: true
      errorBoolean: boolean
      errors?: Array<{ message?: string } | undefined>
    }
  | { hasErrorField: false | undefined }

interface CustomNumberInputProps extends Omit<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'type'
> {
  decrementer: () => void
  incrementer: () => void
  error?: ErrorField
}

const CustomNumberInput = ({
  decrementer,
  incrementer,
  className,
  error,
  ...props
}: CustomNumberInputProps) => {
  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        type="number"
        className={cn(
          'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          className,
        )}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          onClick={() => decrementer()}
        >
          -
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          onClick={() => incrementer()}
        >
          +
        </InputGroupButton>
      </InputGroupAddon>
      {error?.hasErrorField && error.errorBoolean && (
        <FieldError errors={error.errors} />
      )}
    </InputGroup>
  )
}

export default CustomNumberInput
