import { createClient } from '@supabase/supabase-js'

// Kein NEXT_PUBLIC_ → nur auf dem Server verfügbar, nie im Browser-Bundle
export function createServerSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
