'use client'

import { useState, useEffect } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const ClientUser = () => {
  const supabase = createClientComponentClient()
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const { data, error } = await supabase.from('users').select('*')
    setUsers(data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <h2>This is a client component</h2>
      <div>users: {users.length}</div>
    </div>
  )
}
