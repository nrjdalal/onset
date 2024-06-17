'use client'

import Darkmode from '@/components/darkmode'
import { Logo } from '@/components/navbar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SyncUser } from '@/lib/react-query'
import { cn } from '@/lib/utils'
import {
  HamburgerMenuIcon,
  PlusIcon,
  StitchesLogoIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const data = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Account',
    href: '/account',
  },
] as {
  title: string
  href: string
  devOnly?: boolean
}[]

export const MobileSidebar = () => {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger asChild>
        <HamburgerMenuIcon className="size-7 cursor-pointer lg:hidden" />
      </SheetTrigger>
      <SheetContent className="max-w-72 p-0 lg:hidden">
        <div className="border-b">
          <Logo
            onClick={() => {
              setOpen(!open)
            }}
          />
        </div>

        <SidebarItems
          pathname={pathname}
          onClick={() => {
            setOpen(!open)
          }}
        />
      </SheetContent>
    </Sheet>
  )
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background lg:block">
      <SidebarItems pathname={pathname} />
    </div>
  )
}

interface SidebarItemsProps {
  pathname: string
  onClick?: () => void
}

const SidebarItems = ({ pathname, ...props }: SidebarItemsProps) => {
  const { data: userData, isLoading: userIsLoading } = SyncUser()

  return (
    <div className="p-5">
      <div className="grid gap-y-2">
        {data.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            href={item.href}
            active={pathname.startsWith(item.href)}
            devOnly={item.devOnly}
            {...props}
          />
        ))}
      </div>

      <div className="my-12" />

      <Darkmode />
    </div>
  )
}

const SidebarItem = ({
  title,
  href,
  active,
  devOnly,
  ...props
}: {
  title: string
  href: string
  active: boolean
  devOnly?: boolean
  props?: any
}) => {
  return (
    <Link
      className={cn(
        'text-primary/70',
        active ? 'font-semibold text-primary' : 'hover:text-primary',
        devOnly && process.env.NODE_ENV === 'development' ? 'block' : 'block',
      )}
      href={href}
      {...props}
    >
      {title}
    </Link>
  )
}
