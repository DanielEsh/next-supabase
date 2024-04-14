import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type ElementType,
} from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { classNames } from '@/shared/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-lg text-sm transition-colors disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-white border border-input text-gray-700 disabled:bg-slate-100 rounded-md shadow-sm hover:bg-slate-200',
        ghost: 'bg-transparent border-none hover:bg-gray-200',
        primary: 'bg-neutral-800 border border-neutral-800 text-white',
      },
      size: {
        default: 'h-10 py-2 px-4',
        xs: 'p-2 rounded-md',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const COMPONENT_NAME = 'Button'

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  addonLeft?: ReactNode
  addonRight?: ReactNode
  children: ReactNode
  as?: ElementType
}

type ButtonElement = HTMLButtonElement | HTMLAnchorElement

export const Button = forwardRef<ButtonElement, BaseButtonProps>(
  (props, forwardedRef) => {
    const {
      className,
      as: Component = 'button',
      type = 'button',
      variant,
      size,
      children,
      addonLeft,
      addonRight,
      ...restProps
    } = props

    const classes = classNames(buttonVariants({ variant, size, className }))

    return (
      <Component
        ref={forwardedRef}
        className={classes}
        type={type}
        {...restProps}
      >
        {addonLeft && <span>{addonLeft}</span>}
        <span>{children}</span>
        {addonRight && <span>{addonRight}</span>}
      </Component>
    )
  },
)

Button.displayName = COMPONENT_NAME
