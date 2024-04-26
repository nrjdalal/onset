import { auth, signIn } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await auth()
  if (session) return redirect('/dashboard')

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-8">
      <form
        action={async () => {
          'use server'
          await signIn('github')
        }}
      >
        <button className="rounded-md border px-8 py-2.5" type="submit">
          Signin with GitHub
        </button>
      </form>
    </div>
  )
}

export default Page
