'use client'

//
import Link from 'next/link'

import { z } from 'zod'

import { Button, Input } from '@/shared/ui'
import { Form, useForm } from '@/shared/ui/form'

const loginFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(8).max(32),
})

export type LoginForm = z.infer<typeof loginFormSchema>

export default function LoginPage() {
  const formMethods = useForm(loginFormSchema)

  const handleSubmit = async (form: LoginForm) => {
    console.log('SUBMIT', form)
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex items-center border-r border-neutral-700 p-20 text-white bg-studio">
        <div className="">
          <div className="mb-10">
            <h1 className="mt-8 mb-4 text-2xl lg:text-5xl">Welcome back</h1>
            <h2 className="text-xl text-foreground-light">
              Sign in to your account
            </h2>
          </div>

          <Form
            className="flex flex-col gap-6"
            methods={formMethods}
            onSubmit={handleSubmit}
          >
            <Form.Field name="email">
              <Input label="Почта" />
            </Form.Field>

            <Form.Field name="password">
              <Input label="Пароль" />
            </Form.Field>

            <Button
              className="h-[42px]"
              type="submit"
            >
              Sign in
            </Button>
          </Form>

          <div className="self-center my-8 text-sm">
            <div>
              <span className="text-foreground-light">
                Don&apos;t have an account? {''}
              </span>
              <Link
                href="/sign-up"
                className="underline transition text-foreground hover:text-foreground-light"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
