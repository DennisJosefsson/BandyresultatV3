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

interface CustomNumberInputProps extends Omit<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'type'
> {
  decrementer: () => void
  incrementer: () => void
}

const CustomNumberInput = ({
  decrementer,
  incrementer,
  className,
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
    </InputGroup>
  )
}

export default CustomNumberInput
