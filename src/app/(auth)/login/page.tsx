import { Input } from '@/shared/ui/input'

export default function LoginPage() {
  return (
    <div>
      Login
      <div className="text-white">123</div>
      <div className="flex flex-col gap-3">
        <Input label="Почта" />
        <Input label="Пароль" />
      </div>
    </div>
  )
}
