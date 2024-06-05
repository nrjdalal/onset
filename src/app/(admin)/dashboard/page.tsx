/* eslint-disable @next/next/no-img-element */
import { auth, signOut } from '@/lib/auth'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await auth()
  if (!session) return redirect('/access')

  return (
    <div className="bg-foreground/5 grid min-h-dvh place-content-center place-items-center gap-y-12 pb-12">
      <Link href={'/'} className="flex items-center gap-2 font-medium">
        <ChevronLeftIcon className="bg-foreground text-background rounded-full" />{' '}
        Back to Home
      </Link>

      <div className="bg-background w-full min-w-80 max-w-sm rounded-md border p-5 text-center">
        <img
          src={
            session.user.image
              ? session.user.image
              : 'https://api.dicebear.com/8.x/thumbs/svg?seed=Aneka'
          }
          className="mx-auto mb-6 h-24 w-24 rounded-full"
          alt=""
        />

        {Object.entries(session.user).map(([key, value]) => {
          if (key === 'image' || key === 'id') return

          return (
            <div className="flex" key={key}>
              <p className="w-1/3 text-left font-bold capitalize">{key}</p>
              <p className="w-2/3 text-right"> {value}</p>
            </div>
          )
        })}

        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button
            className="bg-foreground text-secondary mt-6 w-full rounded-md px-8 py-1.5 font-medium shadow-sm"
            type="submit"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
