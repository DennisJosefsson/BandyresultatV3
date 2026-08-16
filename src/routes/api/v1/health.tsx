import { db } from '@/db'
import { createFileRoute } from '@tanstack/react-router'

// https://nurbak.com/en/blog/health-check-endpoint/

export const Route = createFileRoute('/api/v1/health')({
  server: {
    handlers: {
      GET: async () => {
        const startTime = Date.now()

        const checks = await Promise.all([
          // Database check
          checkWithTimeout('database', async () => {
            try {
              await db.execute('select 1986')
            } finally {
              console.log('db check done')
            }
          }),

          // Memory check
          checkWithTimeout('memory', async () => {
            const usage = process.memoryUsage()
            const heapUsedMB = usage.heapUsed / 1024 / 1024
            const heapTotalMB =
              usage.heapTotal / 1024 / 1024
            const usagePercent =
              (heapUsedMB / heapTotalMB) * 100

            if (usagePercent > 90) {
              throw new Error(
                `Heap usage at ${usagePercent.toFixed(1)}% (${heapUsedMB.toFixed(0)}MB)`,
              )
            }
          }),
        ])

        const isHealthy = checks.every(
          (c) => c.status === 'healthy',
        )

        const response = {
          status: isHealthy ? 'healthy' : 'unhealthy',
          timestamp: new Date().toISOString(),
          totalLatency: Date.now() - startTime,
          uptime: process.uptime(),
          checks,
        }

        return Response.json(response, {
          status: isHealthy ? 200 : 503,
          headers: {
            'Cache-Control':
              'no-cache, no-store, must-revalidate',
          },
        })
      },
    },
  },
})

interface HealthCheck {
  name: string
  status: 'healthy' | 'unhealthy'
  latency: number
  message?: string
}

async function checkWithTimeout(
  name: string,
  fn: () => Promise<void>,
  timeoutMs = 3000,
): Promise<HealthCheck> {
  const start = Date.now()
  try {
    await Promise.race([
      fn(),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Timeout')),
          timeoutMs,
        ),
      ),
    ])
    return {
      name,
      status: 'healthy',
      latency: Date.now() - start,
    }
  } catch (error) {
    return {
      name,
      status: 'unhealthy',
      latency: Date.now() - start,
      message:
        error instanceof Error
          ? error.message
          : 'Unknown error',
    }
  }
}
