import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await auth()
  if (!session) return redirect('/access')

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-8">
      <div className="text-center">
        {Object.entries(session.user).map(([key, value]) => (
          <p key={key}>
            <span className="font-bold">{key}</span>: {value}
          </p>
        ))}
      </div>

      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button className="rounded-md border px-8 py-2" type="submit">
          Sign Out
        </button>
      </form>
    </div>
  )
}

export default Page
