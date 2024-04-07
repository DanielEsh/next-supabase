'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { getAll } from '@/entities/test/get-all'

export function Login() {
  const supabase = createClientComponentClient<any>()

  const handleSignIn = async () => {
    const data = await supabase.auth.signInWithPassword({
      email: 'jon@supabase.com2',
      password: '123123',
    })

    console.log('data', data)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const handleRequest = async () => {
    const data = await getAll()
    console.log('DATA', data)
  }

  return (
    <div className="flex gap-2">
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
      <button onClick={handleRequest}>Request</button>
      {/*<ClientUser />*/}
    </div>
  )
}
