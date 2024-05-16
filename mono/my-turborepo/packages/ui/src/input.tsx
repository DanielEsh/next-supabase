'use client'

import { ChangeEvent, forwardRef, ReactNode, useState } from 'react'

interface InputProps {
  label: ReactNode
  value: string
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
}

export const Input = (props: InputProps) => {
  const { label, value, onChange, ...restProps } = props

  return (
    <label className="flex gap-3">
      <span>{label}</span>
      <input
        className="text-black"
        value={value}
        onChange={onChange}
        {...restProps}
      />
    </label>
  )
}
