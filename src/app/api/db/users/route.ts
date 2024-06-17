import { auth } from '@/lib/auth'
import { db, users } from '@/lib/database'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()

  if (!session) {
    return NextResponse.redirect('/access')
  }

  return NextResponse.json({
    ...session.user,
  })
}
