'use client'

import { useEffect, useState } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const Permissions = () => {
  const supabase = createClientComponentClient()
  const [permissions, setPermissions] = useState([])

  const getPermissions = async () => {
    const { data, error } = await supabase.from('permission').select('*')
    setPermissions(data)
  }

  useEffect(() => {
    getPermissions()
  }, [])

  return (
    <div>
      <h2>Permissions</h2>
      <div>permissions: {permissions.length}</div>
    </div>
  )
}
