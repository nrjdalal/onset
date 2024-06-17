/* eslint-disable @next/next/no-img-element */

import Provider from '@/app/(admin)/provider'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) return redirect('/access')

  return (
    <Provider>
      <div className="relative min-h-dvh bg-secondary/30">
        <Navbar />

        <div className="relative grid min-h-[calc(100dvh-3.5rem)] lg:grid-cols-[18rem_auto]">
          <Sidebar />

          <main className="p-5">{children}</main>
        </div>
      </div>
    </Provider>
  )
}
