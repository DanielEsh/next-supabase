'use client'

import { useRouter } from 'next/navigation'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { ClientUser } from '@/components/client-user'

export default function Login() {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: 'jon@supabase.com2',
      password: '123123',
      options: {
        data: {
          first_name: 'fname',
          username: 'username',
        },
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email: 'test@mail.ru',
      password: '12345',
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
      {/*<ClientUser />*/}
    </div>
  )
}
