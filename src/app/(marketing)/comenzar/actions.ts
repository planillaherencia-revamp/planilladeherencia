"use server"

import { createServiceClient } from "@/lib/supabase/service"

export type StartCaseState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function startCase(
  _prevState: StartCaseState,
  formData: FormData
): Promise<StartCaseState> {
  const requesterName = String(formData.get("requester_name") ?? "").trim()
  const requesterEmail = String(formData.get("requester_email") ?? "").trim()
  const requesterPhone = String(formData.get("requester_phone") ?? "").trim()
  const decedentName = String(formData.get("decedent_name") ?? "").trim()
  const dateOfDeath = String(formData.get("date_of_death") ?? "").trim()
  const notes = String(formData.get("notes") ?? "").trim()

  if (!requesterName || !requesterEmail || !decedentName) {
    return {
      status: "error",
      message: "Complete su nombre, correo, y el nombre del causante.",
    }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(requesterEmail)) {
    return { status: "error", message: "Escriba un correo electrónico válido." }
  }

  const supabase = createServiceClient()

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .insert({
      full_name: requesterName,
      email: requesterEmail,
      phone: requesterPhone || null,
    })
    .select("id")
    .single()

  if (clientError || !client) {
    return { status: "error", message: "No se pudo crear su caso. Intente de nuevo." }
  }

  const { data: newCase, error: caseError } = await supabase
    .from("cases")
    .insert({
      client_id: client.id,
      filled_by: "client",
      notes: notes || null,
    })
    .select("id")
    .single()

  if (caseError || !newCase) {
    return { status: "error", message: "No se pudo crear su caso. Intente de nuevo." }
  }

  await supabase.from("decedents").insert({
    case_id: newCase.id,
    full_name: decedentName,
    date_of_death: dateOfDeath || null,
  })

  // TODO(Fase 0): notificar a Marisol por correo (Resend) cuando la cuenta exista.
  return {
    status: "success",
    message: "Recibimos los datos de su caso. Le contactaremos dentro de 1 a 2 días laborables.",
  }
}
