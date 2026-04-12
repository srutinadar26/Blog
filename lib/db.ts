/**
 * Database helper module using Supabase
 * 
 * Provides a unified interface for database operations with:
 * - Connection caching for development (prevents multiple connections)
 * - Proper error handling and logging
 * - Both client-side and server-side usage
 */

import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'

// Type for query results
export interface QueryResult<T = Record<string, unknown>> {
  data: T[] | null
  error: string | null
  count: number
}

/**
 * Execute a query on the server side (Server Components, API Routes)
 * Creates a new Supabase client per request (recommended for server usage)
 */
export async function serverQuery<T = Record<string, unknown>>(
  table: string,
  options?: {
    select?: string
    filter?: Record<string, unknown>
    orderBy?: string
    ascending?: boolean
    limit?: number
  }
): Promise<QueryResult<T>> {
  try {
    const supabase = await createServerClient()
    
    let query = supabase
      .from(table)
      .select(options?.select || '*')

    // Apply filters
    if (options?.filter) {
      for (const [key, value] of Object.entries(options.filter)) {
        query = query.eq(key, value)
      }
    }

    // Apply ordering
    if (options?.orderBy) {
      query = query.order(options.orderBy, { 
        ascending: options?.ascending ?? false 
      })
    }

    // Apply limit
    if (options?.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error(`[DB] Query error on table "${table}":`, error.message)
      return { data: null, error: error.message, count: 0 }
    }

    return { 
      data: data as T[], 
      error: null, 
      count: data?.length || 0 
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown database error'
    console.error(`[DB] Connection error:`, message)
    return { data: null, error: message, count: 0 }
  }
}

/**
 * Test the database connection
 * Returns connection status and metadata
 */
export async function testConnection(): Promise<{
  connected: boolean
  message: string
  tables?: string[]
  timestamp: string
}> {
  try {
    const supabase = await createServerClient()
    
    // Test basic connectivity by querying poems table
    const { data, error } = await supabase
      .from('poems')
      .select('id')
      .limit(1)

    if (error) {
      // Check if it's a "relation does not exist" or "schema cache" error (tables not created)
      if (error.message.includes('does not exist') || error.message.includes('schema cache')) {
        return {
          connected: true,
          message: 'Connected to Supabase ✓ but tables are not set up yet. Run the SQL scripts in /scripts/ folder in your Supabase SQL Editor.',
          tables: [],
          timestamp: new Date().toISOString(),
        }
      }
      
      return {
        connected: false,
        message: `Connection error: ${error.message}`,
        timestamp: new Date().toISOString(),
      }
    }

    // Check which tables exist by trying each one
    const tableNames = ['poems', 'thoughts', 'books', 'messages']
    const existingTables: string[] = []

    for (const table of tableNames) {
      const { error: tableError } = await supabase
        .from(table)
        .select('id')
        .limit(1)
      
      if (!tableError) {
        existingTables.push(table)
      }
    }

    return {
      connected: true,
      message: `Successfully connected to Supabase. Found ${data?.length ?? 0} poem(s).`,
      tables: existingTables,
      timestamp: new Date().toISOString(),
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return {
      connected: false,
      message: `Failed to connect: ${message}. Check your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env vars.`,
      timestamp: new Date().toISOString(),
    }
  }
}

/**
 * Get a browser-side Supabase client (for Client Components)
 * Uses Supabase's built-in connection pooling
 */
export function getClientDb() {
  return createBrowserClient()
}
