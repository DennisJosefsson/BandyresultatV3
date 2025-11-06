/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
  //   readonly VITE_API_URL: string
  //   readonly VITE_AUTH0_DOMAIN: string
  //   readonly VITE_AUTH0_CLIENT_ID: string
  //   readonly VITE_SENTRY_DSN?: string
  //   readonly VITE_ENABLE_NEW_DASHBOARD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DB_PRODUCTION_URL: string
      readonly DB_DEVELOPMENT_URL: string
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}
