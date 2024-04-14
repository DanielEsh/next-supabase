'use client'

import {
  type FieldValues as ReactHookFormFieldValues,
  type DefaultValues,
  type UseFormReturn,
  useForm as useReactHookForm,
} from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType } from 'zod'

export function useForm<FieldValues extends ReactHookFormFieldValues>(
  formSchema: ZodType<FieldValues>,
  defaultValues?: DefaultValues<FieldValues>,
): UseFormReturn<FieldValues> {
  return useReactHookForm<FieldValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues,
  })
}
