import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET() {
  const report: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
        ? `SET (${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30)}...)`
        : 'MISSING ❌',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? `SET (${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...)`
        : 'MISSING ❌',
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
        ? `SET (${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.substring(0, 20)}...)`
        : 'MISSING ❌',
    },
    tables: {} as Record<string, unknown>,
  }

  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Test each table individually to find which ones fail
    const tables = ['poems', 'thoughts', 'books', 'messages']

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .limit(1)

      if (error) {
        ;(report.tables as Record<string, unknown>)[table] = {
          status: 'ERROR ❌',
          code: error.code,
          message: error.message,
          hint: error.hint,
          details: error.details,
        }
      } else {
        ;(report.tables as Record<string, unknown>)[table] = {
          status: 'OK ✅',
          rowCount: data?.length ?? 0,
        }
      }
    }

    const allOk = Object.values(report.tables as Record<string, { status: string }>).every(
      (t) => (t as { status: string }).status.includes('OK')
    )

    return NextResponse.json(
      { success: allOk, ...report },
      { status: allOk ? 200 : 503, headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
        ...report,
      },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
