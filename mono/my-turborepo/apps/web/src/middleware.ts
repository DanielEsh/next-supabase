import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  // console.log('middleware', req)
  const res = NextResponse.next()
  // const supabase = createMiddlewareClient<Database>({ req, res })
  // await supabase.auth.getSession()
  return res
}
