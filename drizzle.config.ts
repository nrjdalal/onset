import type { Config } from 'drizzle-kit'

export default {
  schema: './src/lib/database.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL as string,
  },
} satisfies Config
