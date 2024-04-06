'use client'

import { useState } from 'react'
import type { ChangeEvent } from 'react'

import { classNames } from '@/shared/utils'

export interface InputProps {
  label: string
}

export const Input = (props: InputProps) => {
  const { label } = props
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState<string>()

  const classes = classNames('absolute top-5 transition-transform', {
    'transform scale-75 -translate-y-4': focused || value,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <label className="block relative w-[460px] bg-neutral-800 text-white border border-neutral-700 h-16 px-6 rounded-md">
      <span className={classes}>{label}</span>
      <span className="w-full h-full">
        <input
          value={value}
          className="w-full mt-7 bg-transparent outline-none"
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </span>
    </label>
  )
}
