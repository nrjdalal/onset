import './globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Onset',
  description: 'The only Next.js starter you need',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-dvh font-sans antialiased',
          fontMono.variable,
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}
