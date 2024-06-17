/* eslint-disable @next/next/no-img-element */
import { auth, signOut } from '@/lib/auth'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()
  if (!session) return redirect('/access')

  return (
    <div className="container max-w-screen-sm space-y-12">
      <div className="space-y-1 border-b pb-4">
        <h1 className="text-2xl font-medium">Account</h1>
        <p className="text-primary/50">Easily manage your account</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-1">
          <h2 className="font-medium text-primary/50">User ID</h2>
          <p className="text-xl">{session.user.publicId}</p>
          <p className="text-xs text-primary/45">
            Please use this as reference ID when contacting support
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="font-medium text-primary/50">Name</h2>
          <div className="flex justify-between">
            <p className="text-xl">{session.user.name}</p>
            <Pencil1Icon className="h-6 w-6 cursor-not-allowed text-primary/50" />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="font-medium text-primary/50">Email</h2>
          <div className="flex justify-between">
            <p className="text-xl">{session.user.email}</p>
            <Pencil1Icon className="h-6 w-6 cursor-not-allowed text-primary/50" />
          </div>
        </div>

        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button
            className="mt-7 w-full rounded-md bg-red-600 py-1.5 font-medium text-white"
            type="submit"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}
