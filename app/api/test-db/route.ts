import { NextResponse } from 'next/server'
import { testConnection } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const result = await testConnection()

    return NextResponse.json(result, {
      status: result.connected ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[API] test-db error:', message)

    return NextResponse.json(
      {
        connected: false,
        message: `Server error: ${message}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
