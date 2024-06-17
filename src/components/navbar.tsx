/* eslint-disable @next/next/no-img-element */

'use client'

import { MobileSidebar } from '@/components/sidebar'
import { SyncUser } from '@/lib/react-query'
import Link from 'next/link'

export default function Navbar() {
  const { data: userData } = SyncUser()
  return (
    <nav className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background">
      <Logo />

      <div className="mr-5 flex items-center gap-4">
        <Link href={'/account'}>
          <img
            className="size-10 rounded-full border"
            src={
              userData?.image
                ? userData.image
                : 'https://api.dicebear.com/8.x/thumbs/svg?seed=Aneka'
            }
            alt="Profile Picture"
          />
        </Link>
        <MobileSidebar />
      </div>
    </nav>
  )
}

export const Logo = ({ ...props }: any) => {
  return (
    <Link
      href={'/dashboard'}
      className="flex h-14 w-72 items-center gap-x-2 px-5 lg:border-r"
      {...props}
    >
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M24 22h-24l12-20z" />
      </svg>
      <p className="text-xl font-bold">ACME</p>
    </Link>
  )
}
