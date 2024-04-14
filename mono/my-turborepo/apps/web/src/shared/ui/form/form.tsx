import { forwardRef } from 'react'
import {
  FormProvider,
  type FieldValues as ReactHookFormFieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form'

import type { UiDefaultProps } from '@/shared/ui/types'

import { FormField } from './form-field'

export interface FormProps<FieldValues extends ReactHookFormFieldValues>
  extends UiDefaultProps {
  methods: UseFormReturn<FieldValues>
  id?: string
  onReset?: () => void
  onSubmit: SubmitHandler<FieldValues>
}

const COMPONENT_NAME = 'Form'

export const _Form = forwardRef<HTMLFormElement, FormProps<any>>(
  (props, forwardedRef) => {
    const { children, className, methods, onSubmit, onReset, ...restProps } =
      props

    return (
      <FormProvider {...methods}>
        <form
          ref={forwardedRef}
          className={className}
          onReset={onReset}
          onSubmit={methods.handleSubmit(onSubmit)}
          {...restProps}
        >
          {children}
        </form>
      </FormProvider>
    )
  },
)

export const Form = Object.assign(_Form, {
  Field: FormField,
})

Form.displayName = COMPONENT_NAME
