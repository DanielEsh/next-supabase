import { Button, Input } from '@/shared/ui'

export default function LoginPage() {
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

          <div className="flex flex-col gap-6">
            <Input label="Почта" />
            <Input label="Пароль" />
            <Button>Sign in</Button>
          </div>

          <div className="self-center my-8 text-sm">
            <div>
              <span className="text-foreground-light">
                Don&apos;t have an account? {''}
              </span>
              <a className="underline transition text-foreground hover:text-foreground-light">
                Sign Up Now
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
