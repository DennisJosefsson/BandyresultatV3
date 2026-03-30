import { FieldError } from '@/components/base/ui/field'
import { cn } from '@/lib/utils/utils'
import { CircleXIcon } from 'lucide-react'
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
  resetter?: () => void
  error?: ErrorField
}

const CustomNumberInput = ({
  decrementer,
  incrementer,
  resetter,
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
          'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none items-center',
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
      {resetter ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            variant="ghost"
            onClick={() => resetter()}
          >
            <CircleXIcon className="size-3" />
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
      {error?.hasErrorField && error.errorBoolean && (
        <FieldError errors={error.errors} />
      )}
    </InputGroup>
  )
}

export default CustomNumberInput
