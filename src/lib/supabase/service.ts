import "server-only"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Cliente con la service-role key: pasa por alto RLS.
 * Solo para Route Handlers públicos (sin login) que ya validaron el
 * access_token del caso antes de tocar datos. Nunca exponer al navegador.
 */
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
