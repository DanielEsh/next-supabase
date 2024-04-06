import { Input } from '@/shared/ui/input'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <aside className="flex items-center border-r border-neutral-700 p-12">
        <div>
          <h2 className="text-3xl">Welcome back</h2>
          <p>Sign in to your account</p>

          <div className="flex flex-col gap-6">
            <Input label="Почта" />
            <Input label="Пароль" />
          </div>
        </div>
      </aside>
    </div>
  )
}
