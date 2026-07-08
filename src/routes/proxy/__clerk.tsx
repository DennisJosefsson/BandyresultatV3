import { sharedEnv } from '@/lib/env/sharedEnv'
import { createFileRoute } from '@tanstack/react-router'

const CLERK_PROXY_URL = sharedEnv.CLERK_PROXY_URL
const CLERK_FAPI = sharedEnv.CLERK_FAPI
const CLERK_SECRET_KEY = sharedEnv.CLERK_SECRET_KEY

export const Route = createFileRoute('/proxy/__clerk')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = request.url.replace(
          CLERK_PROXY_URL,
          CLERK_FAPI,
        )
        const proxyReq = new Request(request, {
          redirect: 'manual',
        })

        proxyReq.headers.set(
          'Clerk-Proxy-Url',
          CLERK_PROXY_URL,
        )
        proxyReq.headers.set(
          'Clerk-Secret-Key',
          CLERK_SECRET_KEY,
        )
        proxyReq.headers.set(
          'X-Forwarded-For',
          request.headers.get('CF-Connecting-IP') || '',
        )

        return fetch(url, proxyReq)
      },
      POST: async ({ request }) => {
        const url = request.url.replace(
          CLERK_PROXY_URL,
          CLERK_FAPI,
        )
        const proxyReq = new Request(request, {
          redirect: 'manual',
        })

        proxyReq.headers.set(
          'Clerk-Proxy-Url',
          CLERK_PROXY_URL,
        )
        proxyReq.headers.set(
          'Clerk-Secret-Key',
          CLERK_SECRET_KEY,
        )
        proxyReq.headers.set(
          'X-Forwarded-For',
          request.headers.get('CF-Connecting-IP') || '',
        )

        return fetch(url, proxyReq)
      },
      PATCH: async ({ request }) => {
        const url = request.url.replace(
          CLERK_PROXY_URL,
          CLERK_FAPI,
        )
        const proxyReq = new Request(request, {
          redirect: 'manual',
        })

        proxyReq.headers.set(
          'Clerk-Proxy-Url',
          CLERK_PROXY_URL,
        )
        proxyReq.headers.set(
          'Clerk-Secret-Key',
          CLERK_SECRET_KEY,
        )
        proxyReq.headers.set(
          'X-Forwarded-For',
          request.headers.get('CF-Connecting-IP') || '',
        )

        return fetch(url, proxyReq)
      },
      PUT: async ({ request }) => {
        const url = request.url.replace(
          CLERK_PROXY_URL,
          CLERK_FAPI,
        )
        const proxyReq = new Request(request, {
          redirect: 'manual',
        })

        proxyReq.headers.set(
          'Clerk-Proxy-Url',
          CLERK_PROXY_URL,
        )
        proxyReq.headers.set(
          'Clerk-Secret-Key',
          CLERK_SECRET_KEY,
        )
        proxyReq.headers.set(
          'X-Forwarded-For',
          request.headers.get('CF-Connecting-IP') || '',
        )

        return fetch(url, proxyReq)
      },
      DELETE: async ({ request }) => {
        const url = request.url.replace(
          CLERK_PROXY_URL,
          CLERK_FAPI,
        )
        const proxyReq = new Request(request, {
          redirect: 'manual',
        })

        proxyReq.headers.set(
          'Clerk-Proxy-Url',
          CLERK_PROXY_URL,
        )
        proxyReq.headers.set(
          'Clerk-Secret-Key',
          CLERK_SECRET_KEY,
        )
        proxyReq.headers.set(
          'X-Forwarded-For',
          request.headers.get('CF-Connecting-IP') || '',
        )

        return fetch(url, proxyReq)
      },
    },
  },
})
