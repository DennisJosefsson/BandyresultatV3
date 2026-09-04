import { FieldError } from '@/components/base/ui/field'
import { cn } from '@/lib/utils/utils'
import {
  CircleXIcon,
  MinusIcon,
  PlusIcon,
} from 'lucide-react'
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
  inputGroupClassName?: string
}

const CustomNumberInput = ({
  decrementer,
  incrementer,
  resetter,
  className,
  inputGroupClassName,
  error,
  ...props
}: CustomNumberInputProps) => {
  return (
    <InputGroup className={cn('', inputGroupClassName)}>
      <InputGroupInput
        {...props}
        type="number"
        className={cn(
          'max-w-48 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none items-center placeholder:truncate',
          className,
        )}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          onClick={() => decrementer()}
          className="size-[1lh]"
          aria-label="Minus"
        >
          <MinusIcon />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          onClick={() => incrementer()}
          className="size-[1lh]"
          aria-label="Plus"
        >
          <PlusIcon />
        </InputGroupButton>
      </InputGroupAddon>
      {resetter ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            variant="ghost"
            onClick={() => resetter()}
            className="size-[1lh]"
            aria-label="Ta bort"
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
