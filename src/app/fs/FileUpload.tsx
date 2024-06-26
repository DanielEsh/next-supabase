'use client'

import { ChangeEvent } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const FileUpload = () => {
  const supabase = createClientComponentClient()

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let file

    if (e.target.files) {
      file = e.target.files[0]
    }

    const { data, error } = await supabase.storage
      .from('images')
      .upload('public/' + file?.name, file as File)

    if (data) {
      console.log(data)
    } else if (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <input
        type="file"
        accept="image/*"
        className="block w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        onChange={(e) => {
          handleUpload(e)
        }}
      />
    </div>
  )
}
