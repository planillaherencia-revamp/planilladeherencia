"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type NewCaseState = {
  status: "idle" | "error"
  message?: string
}

export async function createCase(
  _prevState: NewCaseState,
  formData: FormData
): Promise<NewCaseState> {
  const fullName = String(formData.get("full_name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const filledBy = String(formData.get("filled_by") ?? "client")

  if (!fullName) {
    return { status: "error", message: "El nombre del cliente es requerido." }
  }

  const supabase = await createClient()

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .insert({ full_name: fullName, email: email || null, phone: phone || null })
    .select("id")
    .single()

  if (clientError || !client) {
    return { status: "error", message: "No se pudo crear el cliente. Intente de nuevo." }
  }

  const { data: newCase, error: caseError } = await supabase
    .from("cases")
    .insert({ client_id: client.id, filled_by: filledBy })
    .select("id")
    .single()

  if (caseError || !newCase) {
    return { status: "error", message: "No se pudo crear el caso. Intente de nuevo." }
  }

  redirect(`/admin/casos/${newCase.id}`)
}
