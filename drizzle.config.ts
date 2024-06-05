import type { Config } from 'drizzle-kit'

export default {
  schema: './src/lib/database.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
} satisfies Config
