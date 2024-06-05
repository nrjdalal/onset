import { db, users } from '@/lib/database'
import { generateId } from '@/lib/utils'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { eq } from 'drizzle-orm'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: {
    ...DrizzleAdapter(db),
    async createUser(user) {
      return await db
        .insert(users)
        .values({
          ...user,
          publicId: generateId(),
        })
        .returning()
        .then((res) => res[0])
    },
  },
  providers: [GitHub],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.publicId = token.publicId as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.image as string
      }

      return session
    },

    async jwt({ token, user }) {
      const [result] = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email as string))
        .limit(1)

      if (!result) {
        if (user) {
          token.id = user.id
        }

        return token
      }

      return {
        id: result.id,
        publicId: result.publicId,
        name: result.name,
        email: result.email,
        image: result.image,
      }
    },
  },
})

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      publicId: string
      name: string
      email: string
      image: string
    }
  }
}
