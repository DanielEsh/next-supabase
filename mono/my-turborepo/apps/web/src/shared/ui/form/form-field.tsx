import { Children, isValidElement, cloneElement } from 'react'
import { Controller, useFormContext, type FieldValues } from 'react-hook-form'

import type { UiDefaultProps } from '@/shared/ui/types'

interface FormFieldProps extends UiDefaultProps {
  name: string
  onBlur?(): void
}

interface childrenFormProps extends FieldValues {
  invalid: boolean
}

export const FormField = (props: FormFieldProps) => {
  const { children, className, name, onBlur } = props
  const { control } = useFormContext()

  const childrenWithFormFieldProps = (fieldProps: childrenFormProps) => {
    return Children.map(children, (child) => {
      // Checking isValidElement is the safe way and avoids a
      // typescript error too.
      if (isValidElement(child)) {
        return cloneElement(child, fieldProps)
      }
      return child
    })
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={className}>
          {childrenWithFormFieldProps({
            invalid: fieldState.invalid,
            ...field,
          })}

          <div className="text-red-500">{fieldState.error?.message}</div>
        </div>
      )}
    />
  )
}
